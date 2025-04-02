import { useState } from "react";
import { DataTable } from "~/components/DataTable";
import { useGetApiTenants } from "~/services/api/tenants/tenants";

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

export default function TenantsTable() {
  const { data: response } = useGetApiTenants();
  const [tableData, setTableData] = useState(() => response?.data || []);

  return (
    <DataTable data={tableData} setData={setTableData} columns={columns} />
  );
}
