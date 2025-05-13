import { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { DataTable } from "~/components/DataTable";
import { useGetTablesId } from "~/services/api/tables/tables";
import { useGetRows } from "~/services/api/rows/rows";
import { useState, useEffect, useRef } from "react";
import { ColumnDto, RowDto, CellDto } from "~/services/api/model";
import { ColumnDef } from "~/components/types";
import { usePatchRecord } from "~/features/api/hooks/usePatchRecord";
import { usePatchCellsId } from "~/services/api/cells/cells";

export const meta: MetaFunction = () => {
  return [
    { title: "Datanaut - Table View" },
    { name: "description", content: "View and manage your table data" },
  ];
};

export default function TableView() {
  const { tableId } = useParams();
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const isInitialLoad = useRef(true);

  const { data: table } = useGetTablesId(tableId || "");
  const { data: rows } = useGetRows({ tableId });
  const { mutateAsync: patchCell } = usePatchCellsId();

  // Transform the data for the DataTable
  const columns: ColumnDef<Record<string, any>>[] =
    (table?.status === 200 &&
      table?.data?.columns?.map((column: ColumnDto) => ({
        accessor: column.name || "",
        header: column.name || "",
        type: "text",
      }))) ||
    [];
  console.log("columns", columns);

  // Transform rows into the format expected by DataTable
  const transformedData =
    (rows?.status === 200 &&
      rows?.data?.map((row: RowDto) => {
        const rowData: Record<string, any> = {
          id: row.id,
        };
        console.log("row.cells", row);
        row.cells?.forEach((cell: CellDto) => {
          const v = JSON.parse(cell.value || "{}");
          rowData[cell?.column?.name || ""] = {
            value: v?.value,
            cellId: cell.id,
          };
        });
        return rowData;
      })) ||
    [];
  console.log("transformedData", transformedData);

  // Only update from server data on initial load
  useEffect(() => {
    if (isInitialLoad.current && transformedData.length > 0) {
      setTableData(transformedData);
      isInitialLoad.current = false;
    }
  }, [transformedData]);

  // Initialize usePatchRecord with the patchCell mutation
  const handlePatchRecord = usePatchRecord(patchCell, tableData);

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
          data={tableData}
          setData={setTableData}
          columns={columns}
          patchRecord={handlePatchRecord}
        />
      </div>
    </div>
  );
}
