import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
} from "@tanstack/react-table";
import { EditableCell } from "./EditableCell";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { Pagination } from "./Pagination";
import { ColumnDef } from "./types";

interface DataTableProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  columns: ColumnDef<T>[];
}

export function DataTable<T extends object>({
  data,
  setData,
  columns,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);

  const columnHelper = createColumnHelper<T>();

  // Function to update data when cell value changes
  const updateData = (rowIndex: number, columnId: string, value: any) => {
    const newData = [...data] as any;
    newData[rowIndex][columnId] = value;
    setData(newData);
  };

  const tableColumns = columns.map((col) =>
    columnHelper.accessor(col.accessor as any, {
      header: col.header,
      cell: (info) => {
        const isEditing =
          editingCell?.rowId === info.row.id &&
          editingCell?.columnId === info.column.id;

        return (
          <EditableCell
            value={info.getValue()}
            row={info.row}
            column={info.column}
            type={col.type || "text"}
            updateData={updateData}
            isEditing={isEditing}
            onStartEdit={() =>
              setEditingCell({ rowId: info.row.id, columnId: info.column.id })
            }
            onFinishEdit={() => setEditingCell(null)}
          />
        );
      },
    })
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id} header={header} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              renderCell={(cell) =>
                flexRender(cell.column.columnDef.cell, cell.getContext())
              }
            />
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  );
}
