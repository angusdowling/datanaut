import { useState } from "react";
import { DataTable } from "~/components/DataTable";
import { useGetWorkspaces } from "~/services/api/workspaces/workspaces";

const columns = [
  {
    accessor: "id" as "id",
    header: "ID",
    type: "text" as "text",
  },
  {
    accessor: "tenantId" as "tenantId",
    header: "Tenant ID",
    type: "text" as "text",
  },
  {
    accessor: "name" as "name",
    header: "Name",
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

export const WorkspacesTable = () => {
  const { data: response } = useGetWorkspaces();
  const [tableData, setTableData] = useState(() => response?.data || []);

  return (
    <DataTable data={tableData} setData={setTableData} columns={columns} />
  );
};
