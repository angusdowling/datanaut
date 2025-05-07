import { useMemo, useState, useEffect } from "react";
import { DataTable } from "~/components/DataTable";
import { User, Role } from "~/services/api/model";
import {
  useGetUsers,
  usePatchUsersId,
  useDeleteUsersId,
  usePostUsers,
} from "~/services/api/users/users";
import { debounce } from "~/utilities/debounce";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import { useGetTenants } from "~/services/api/tenants/tenants";
import { useGetRoles } from "~/services/api/roles/roles";

const columns = [
  {
    accessor: "name" as const,
    header: "Name",
    type: "text" as "text",
  },
  {
    accessor: "tenant.name" as const,
    header: "Tenant",
    type: "text" as "text",
  },
  {
    accessor: "role.name" as const,
    header: "Role",
    type: "text" as "text",
  },
  {
    accessor: "email" as const,
    header: "Email",
    type: "text" as "text",
  },
];

export const UsersTable = () => {
  const { data: users } = useGetUsers();
  const { data: tenants } = useGetTenants();
  const { data: roles } = useGetRoles();
  const { mutateAsync: patchUser } = usePatchUsersId();
  const { mutateAsync: deleteUser } = useDeleteUsersId();
  const { mutateAsync: createUser } = usePostUsers();
  const [tableData, setTableData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (users?.data) {
      setTableData(users.data);
    }
  }, [users?.data]);

  const handleCreateUser = () => {
    setIsCreateDialogOpen(true);
  };

  const handleDeleteUser = async (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser?.id) {
      await deleteUser({ id: selectedUser.id });
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const contextMenuItems = [
    {
      label: "Create User",
      onClick: handleCreateUser,
    },
    {
      label: "Delete User",
      onClick: handleDeleteUser,
    },
  ];

  // Raw patch function
  const patchRecord = async (
    recordIndex: number,
    columnId: string,
    value: any
  ) => {
    console.log("patching record:", recordIndex, columnId, value);
    const record = tableData?.[recordIndex];
    if (!record?.id) {
      console.error("Missing record ID");
      return;
    }

    const updatedData = {
      [columnId]: value,
    };

    await patchUser({
      id: record.id,
      data: updatedData,
    });
  };

  // Debounced version (stable across renders)
  const debouncedPatchRecord = useMemo(() => {
    console.log("patch record");
    return debounce((recordIndex: number, columnId: string, value: any) => {
      patchRecord(recordIndex, columnId, value);
    }, 500);
  }, [tableData, patchRecord]);

  return (
    <>
      {users?.data && (
        <DataTable
          patchRecord={debouncedPatchRecord}
          data={tableData}
          setData={setTableData}
          columns={columns}
          contextMenuItems={contextMenuItems}
        />
      )}

      {/* Create Dialog */}
      <Dialog.Root
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Create User</Dialog.Title>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  tenantId: formData.get("tenantId") as string,
                  roleId: formData.get("roleId") as string,
                };
                await createUser({ data });
                setIsCreateDialogOpen(false);
              }}
            >
              <div>
                <div>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="tenantId">Tenant</label>
                  <select id="tenantId" name="tenantId" required>
                    <option value="">Select a tenant</option>
                    {tenants?.data.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="roleId">Role</label>
                  <select id="roleId" name="roleId" required>
                    <option value="">Select a role</option>
                    {roles?.data.map((role: Role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Button
                  type="button"
                  variant="soft"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Delete User</Dialog.Title>
            <p>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div>
              <Button
                variant="soft"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="solid" color="red" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
