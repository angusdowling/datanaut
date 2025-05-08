import { DataTable } from "~/components/DataTable";
import {
  useGetTables,
  usePostTables,
  usePatchTablesId,
  useDeleteTablesId,
} from "~/services/api/tables/tables";
import { TableDto, CreateTableDto, UpdateTableDto } from "~/services/api/model";
import { useEntityTable } from "../../../api/hooks/useEntityTable";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "@remix-run/react";
import { CreateEntityDialog, DeleteEntityDialog } from "~/features/common";

const columns = [
  {
    accessor: "name" as const,
    header: "Name",
    type: "text" as "text",
  },
  {
    accessor: "workspace.name" as const,
    header: "Workspace",
    type: "text" as "text",
  },
];

type Props = {
  workspaceId: string;
};

export const TablesTable = ({ workspaceId }: Props) => {
  const { data: tables } = useGetTables({ workspaceId });
  const { mutateAsync: patchTable } = usePatchTablesId();
  const { mutateAsync: deleteTable } = useDeleteTablesId();
  const { mutateAsync: createTable } = usePostTables();
  const navigate = useNavigate();

  const {
    tableData,
    setTableData,
    selectedEntity: selectedTable,
    isCreateDialogOpen,
    isDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateEntity,
    handleDeleteEntity,
    confirmDelete,
    handleCreate,
    debouncedPatchRecord,
  } = useEntityTable<TableDto, CreateTableDto, UpdateTableDto>({
    data: tables,
    createEntity: createTable,
    updateEntity: patchTable,
    deleteEntity: deleteTable,
  });

  const contextMenuItems = [
    {
      label: "Create Table",
      onClick: handleCreateEntity,
    },
    {
      label: "Delete Table",
      onClick: handleDeleteEntity,
    },
    {
      label: "View Table",
      onClick: (row: TableDto) => {
        navigate(`/admin/workspaces/${row?.workspace?.id}/${row?.id}`);
      },
    },
  ];

  return (
    <>
      <div>
        <Button onClick={handleCreateEntity}>Create Table</Button>
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
        title="Create Table"
        onSubmit={handleCreate}
      >
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <input type="hidden" name="workspaceId" value={workspaceId} />
        </div>
      </CreateEntityDialog>

      <DeleteEntityDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Table"
        entityName="table"
        onConfirm={confirmDelete}
      />
    </>
  );
};
