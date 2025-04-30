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
    accessor: "workspaceId" as "workspaceId",
    header: "Workspace ID",
    type: "text" as "text",
  },
  {
    accessor: "createdBy" as "createdBy",
    header: "Created By",
    type: "text" as "text",
  },
  {
    accessor: "createdAt" as "createdAt",
    header: "Created At",
    type: "text" as "text",
  },
  {
    accessor: "updatedAt" as "updatedAt",
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
