import { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { DataTable } from "~/components/DataTable";
import { useGetTablesId } from "~/services/api/tables/tables";
import { useGetRows } from "~/services/api/rows/rows";
import { useState } from "react";
import { ColumnDto, AppRow, AppCell } from "~/services/api/model";
import { ColumnDef } from "~/components/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut - Table View" },
    { name: "description", content: "View and manage your table data" },
  ];
};

export default function TableView() {
  const { tableId } = useParams();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);

  const { data: table } = useGetTablesId(tableId || "");
  const { data: rows } = useGetRows({ tableId });

  // Transform the data for the DataTable
  const columns: ColumnDef<Record<string, any>>[] =
    table?.data?.columns?.map((column: ColumnDto) => ({
      accessor: column.name || "",
      header: column.name || "",
      type: "text",
    })) || [];

  // Transform rows into the format expected by DataTable
  const transformedData =
    rows?.data?.map((row: AppRow) => {
      const rowData: Record<string, any> = {};
      row.appCells?.forEach((cell: AppCell) => {
        if (cell.column?.name) {
          rowData[cell.column.name] = cell.value;
        }
      });
      return rowData;
    }) || [];

  if (!tableId) {
    return <div>Table not found</div>;
  }

  return (
    <div>
      <header>
        <h2>{table?.data?.name}</h2>
        <p>View and manage your table data</p>
      </header>
      <div>
        <DataTable
          data={transformedData}
          setData={setTableData}
          columns={columns}
        />
      </div>
    </div>
  );
}
