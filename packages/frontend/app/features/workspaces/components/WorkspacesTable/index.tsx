import { DataTable } from "~/components/DataTable";
import {
  useGetWorkspaces,
  usePatchWorkspacesId,
  useDeleteWorkspacesId,
  usePostWorkspaces,
} from "~/services/api/workspaces/workspaces";
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceDto,
} from "~/services/api/model";
import { useEntityTable } from "../../../api/hooks/useEntityTable";
import { Button } from "@radix-ui/themes";
import { useGetTenants } from "~/services/api/tenants/tenants";
import { useNavigate } from "@remix-run/react";
import { CreateEntityDialog, DeleteEntityDialog } from "~/features/common";

const columns = [
  {
    accessor: "tenant.name" as const,
    header: "Tenant",
    type: "text" as "text",
  },
  {
    accessor: "name" as const,
    header: "Name",
    type: "text" as "text",
  },
];

export const WorkspacesTable = () => {
  const { data: workspaces } = useGetWorkspaces();
  const { data: tenants } = useGetTenants();
  const { mutateAsync: patchWorkspace } = usePatchWorkspacesId();
  const { mutateAsync: deleteWorkspace } = useDeleteWorkspacesId();
  const { mutateAsync: createWorkspace } = usePostWorkspaces();
  const navigate = useNavigate();

  const {
    tableData,
    setTableData,
    selectedEntity: selectedWorkspace,
    isCreateDialogOpen,
    isDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateEntity,
    handleDeleteEntity,
    confirmDelete,
    handleCreate,
    debouncedPatchRecord,
  } = useEntityTable<WorkspaceDto, CreateWorkspaceDto, UpdateWorkspaceDto>({
    data: workspaces,
    createEntity: createWorkspace,
    updateEntity: patchWorkspace,
    deleteEntity: deleteWorkspace,
  });

  const contextMenuItems = [
    {
      label: "Create Workspace",
      onClick: handleCreateEntity,
    },
    {
      label: "Delete Workspace",
      onClick: handleDeleteEntity,
    },
    {
      label: "View Workspace",
      onClick: (row: WorkspaceDto) => {
        navigate(`/admin/workspaces/${row?.id}`);
      },
    },
  ];

  return (
    <>
      <div>
        <Button onClick={handleCreateEntity}>Create Workspace</Button>
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
        title="Create Workspace"
        onSubmit={handleCreate}
      >
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="tenantId">Tenant</label>
            <select id="tenantId" name="tenantId" required>
              <option value="">Select a tenant</option>
              {tenants?.data?.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CreateEntityDialog>

      <DeleteEntityDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Workspace"
        entityName="workspace"
        onConfirm={confirmDelete}
      />
    </>
  );
};
