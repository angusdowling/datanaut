import { DataTable } from "~/components/DataTable";
import {
  useGetTenants,
  usePostTenants,
  usePatchTenantsId,
  useDeleteTenantsId,
} from "~/services/api/tenants/tenants";
import { TenantDto, CreateTenantDto } from "~/services/api/model";
import { useEntityTable } from "../../../api/hooks/useEntityTable";
import { Button } from "@radix-ui/themes";
import { CreateEntityDialog, DeleteEntityDialog } from "~/features/common";

const columns = [
  {
    accessor: "id" as const,
    header: "ID",
    type: "text" as "text",
  },
  {
    accessor: "name" as const,
    header: "Name",
    type: "text" as "text",
  },
  {
    accessor: "createdAt" as const,
    header: "Created At",
    type: "text" as "text",
  },
  {
    accessor: "updatedAt" as const,
    header: "Updated At",
    type: "text" as "text",
  },
];

export const TenantsTable = () => {
  const { data: tenants } = useGetTenants();
  const { mutateAsync: patchTenant } = usePatchTenantsId();
  const { mutateAsync: deleteTenant } = useDeleteTenantsId();
  const { mutateAsync: createTenant } = usePostTenants();

  const {
    tableData,
    setTableData,
    selectedEntity: selectedTenant,
    isCreateDialogOpen,
    isDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateEntity,
    handleDeleteEntity,
    confirmDelete,
    handleCreate,
    debouncedPatchRecord,
  } = useEntityTable<TenantDto, CreateTenantDto, CreateTenantDto>({
    data: tenants,
    createEntity: createTenant,
    updateEntity: patchTenant,
    deleteEntity: deleteTenant,
  });

  const contextMenuItems = [
    {
      label: "Create Tenant",
      onClick: handleCreateEntity,
    },
    {
      label: "Delete Tenant",
      onClick: handleDeleteEntity,
    },
  ];

  return (
    <>
      <div>
        <Button onClick={handleCreateEntity}>Create Tenant</Button>
      </div>

      <DataTable
        data={tableData}
        setData={setTableData}
        columns={columns}
        patchRecord={debouncedPatchRecord}
        contextMenuItems={contextMenuItems}
      />

      <CreateEntityDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        title="Create Tenant"
        onSubmit={handleCreate}
      >
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
        </div>
      </CreateEntityDialog>

      <DeleteEntityDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Tenant"
        entityName="tenant"
        onConfirm={confirmDelete}
      />
    </>
  );
};
