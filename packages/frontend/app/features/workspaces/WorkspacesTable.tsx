import { DataTable } from "~/components/DataTable";
import {
  useGetWorkspaces,
  usePatchWorkspacesId,
  useDeleteWorkspacesId,
  usePostWorkspaces,
} from "~/services/api/workspaces/workspaces";
import { UpdateWorkspaceDto, WorkspaceDto } from "~/services/api/model";
import { useEntityTable } from "../api/hooks/useEntityTable";
import { CreateEntityDialog } from "../common/dialogs/CreateEntityDialog";
import { DeleteEntityDialog } from "../common/dialogs/DeleteEntityDialog";

const columns = [
  {
    accessor: "id" as const,
    header: "ID",
    type: "text" as "text",
  },
  {
    accessor: "tenantId" as const,
    header: "Tenant ID",
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
  const { mutateAsync: patchWorkspace } = usePatchWorkspacesId();
  const { mutateAsync: deleteWorkspace } = useDeleteWorkspacesId();
  const { mutateAsync: createWorkspace } = usePostWorkspaces();

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
  } = useEntityTable<WorkspaceDto, any, UpdateWorkspaceDto>({
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
  ];

  return (
    <>
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
            <label htmlFor="tenantId">Tenant ID</label>
            <input type="text" id="tenantId" name="tenantId" required />
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
