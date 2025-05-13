import { DataTable } from "~/components/DataTable";
import { UserDto } from "~/services/api/model/userDto";
import { Role } from "~/services/api/model/role";
import { CreateUserDto, UpdateUserDto } from "~/services/api/model";
import {
  useGetUsers,
  usePatchUsersId,
  useDeleteUsersId,
  usePostUsers,
} from "~/services/api/users/users";
import { useGetTenants } from "~/services/api/tenants/tenants";
import { useGetRoles } from "~/services/api/roles/roles";
import { useEntityTable } from "../../../api/hooks/useEntityTable";
import { CreateEntityDialog, DeleteEntityDialog } from "~/features/common";

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

  const {
    tableData,
    setTableData,
    selectedEntity: selectedUser,
    isCreateDialogOpen,
    isDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateEntity,
    handleDeleteEntity,
    confirmDelete,
    handleCreate,
    debouncedPatchRecord,
  } = useEntityTable<UserDto, CreateUserDto, UpdateUserDto>({
    data: users,
    createEntity: createUser,
    updateEntity: patchUser,
    deleteEntity: deleteUser,
  });

  const contextMenuItems = [
    {
      label: "Create User",
      onClick: handleCreateEntity,
    },
    {
      label: "Delete User",
      onClick: handleDeleteEntity,
    },
  ];

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

      <CreateEntityDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        title="Create User"
        onSubmit={handleCreate}
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
              {tenants?.status === 200 &&
                tenants?.data?.map((tenant) => (
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
              {roles?.status === 200 &&
                roles?.data?.map((role: Role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </CreateEntityDialog>

      <DeleteEntityDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete User"
        entityName="user"
        onConfirm={confirmDelete}
      />
    </>
  );
};
