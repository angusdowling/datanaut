import { useState } from "react";
import { DataTable } from "~/components/DataTable";
import { useGetApiTables } from "~/services/api/tables/tables";

const columns = [
  {
    accessor: "id" as "id",
    header: "ID",
    type: "text" as "text",
  },
  {
    accessor: "name" as "name",
    header: "Name",
    type: "text" as "text",
  },
  {
    accessor: "workspace_id" as "workspace_id",
    header: "Workspace ID",
    type: "text" as "text",
  },
  {
    accessor: "created_by" as "created_by",
    header: "Created By",
    type: "text" as "text",
  },
  {
    accessor: "created_at" as "created_at",
    header: "Created At",
    type: "text" as "text",
  },
  {
    accessor: "updated_at" as "updated_at",
    header: "Updated At",
    type: "text" as "text",
  },
];

type Props = {
  workspaceId: string;
};

export const TablesTable = ({ workspaceId }: Props) => {
  const { data: response } = useGetApiTables({ workspaceId });
  const [tableData, setTableData] = useState(() => response?.data || []);

  return (
    <DataTable data={tableData} setData={setTableData} columns={columns} />
  );
};
