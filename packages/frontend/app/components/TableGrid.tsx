import { useState, useEffect, useRef } from "react";
import { DataTable } from "~/components/DataTable";
import { useGetTablesId } from "~/services/api/tables/tables";
import { useGetRows } from "~/services/api/rows/rows";
import { ColumnDto, RowDto, CellDto } from "~/services/api/model";
import { ColumnDef } from "~/components/types";
import { usePatchRecord } from "~/features/api/hooks/usePatchRecord";
import { usePatchCellsId } from "~/services/api/cells/cells";

interface TableGridProps {
  tableId: string;
}

export function TableGrid({ tableId }: TableGridProps) {
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const isInitialLoad = useRef(true);

  const { data: table } = useGetTablesId(tableId);
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

  // Transform rows into the format expected by DataTable
  const transformedData =
    (rows?.status === 200 &&
      rows?.data?.map((row: RowDto) => {
        const rowData: Record<string, any> = {
          id: row.id,
        };
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
