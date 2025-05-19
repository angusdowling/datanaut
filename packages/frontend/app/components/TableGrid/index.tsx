import { useState, useEffect, useRef } from "react";
import { ColumnHeaderContextMenuItem, DataTable } from "~/components/DataTable";
import { useGetTablesId } from "~/services/api/tables/tables";
import { useGetRows, usePostRows } from "~/services/api/rows/rows";
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
  const { mutateAsync: createRow } = usePostRows();

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
          position: row.position,
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

  const handleInsertRecordAbove = async (row: Record<string, any>) => {
    // Create a new row with position
    const newRow = await createRow({
      data: {
        tableId,
        position: row.position,
      },
    });

    if (newRow.status === 200 && newRow.data) {
      // Update the positions of all affected rows
      const currentPosition = row.position;
      const newTableData = tableData.map((r) => {
        if (r.position >= currentPosition) {
          return { ...r, position: r.position + 1 };
        }
        return r;
      });

      // Add the new row at the correct position
      newTableData.push({
        id: newRow.data.id,
        position: currentPosition,
        // Initialize with empty values for each column
        ...Object.fromEntries(
          columns.map((col) => [col.accessor, { value: "", cellId: undefined }])
        ),
      });

      // Sort by position
      newTableData.sort((a, b) => a.position - b.position);

      setTableData(newTableData);
    }
  };

  const handleInsertRecordBelow = async (row: Record<string, any>) => {
    // Create a new row with position
    const newRow = await createRow({
      data: {
        tableId,
        position: row.position + 1,
      },
    });

    if (newRow.status === 200 && newRow.data) {
      // Update the positions of all affected rows
      const currentPosition = row.position + 1;
      const newTableData = tableData.map((r) => {
        if (r.position >= currentPosition) {
          return { ...r, position: r.position + 1 };
        }
        return r;
      });

      // Add the new row at the correct position
      newTableData.push({
        id: newRow.data.id,
        position: currentPosition,
        // Initialize with empty values for each column
        ...Object.fromEntries(
          columns.map((col) => [col.accessor, { value: "", cellId: undefined }])
        ),
      });

      // Sort by position
      newTableData.sort((a, b) => a.position - b.position);

      setTableData(newTableData);
    }
  };

  const contextMenuItems = [
    {
      label: "Insert record above",
      onClick: handleInsertRecordAbove,
    },
    {
      label: "Insert record below",
      onClick: handleInsertRecordBelow,
    },
    {
      label: "Duplicate record",
      onClick: () => {},
    },
    {
      label: "Apply template",
      onClick: () => {},
    },
    {
      label: "Expand record",
      onClick: () => {},
    },
    {
      label: "Add comment",
      onClick: () => {},
    },
    {
      label: "Copy cell URL",
      onClick: () => {},
    },
    {
      label: "Send record",
      onClick: () => {},
    },
    {
      label: "Delete record",
      onClick: () => {},
    },
  ];

  const headerContextMenuItems = [
    {
      label: "Edit field",
      onClick: () => {},
    },
    {
      label: "Duplicate field",
      onClick: () => {},
    },
    {
      label: "Insert left",
      onClick: () => {},
    },
    {
      label: "Insert right",
      onClick: () => {},
    },
    {
      label: "Change primary field",
      onClick: () => {},
    },
    {
      label: "Copy field URL",
      onClick: () => {},
    },
    {
      label: "Edit field description",
      onClick: () => {},
    },
    {
      label: "Edit field permissions",
      onClick: () => {},
    },
    {
      label: "Sort A -> Z",
      onClick: () => {},
    },
    {
      label: "Sort Z -> A",
      onClick: () => {},
    },
    {
      label: "Filter by this field",
      onClick: () => {},
    },
    {
      label: "Group by this field",
      onClick: () => {},
    },
    {
      label: "Hide field",
      onClick: () => {},
    },
    {
      label: "Delete field",
      onClick: () => {},
    },
  ] as ColumnHeaderContextMenuItem[];

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
          contextMenuItems={contextMenuItems}
          columnHeaderContextMenuItems={headerContextMenuItems}
        />
      </div>
    </div>
  );
}
