import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  getGroupedRowModel,
  getExpandedRowModel,
  ExpandedState,
  GroupingState,
} from "@tanstack/react-table";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { EditableCell } from "../EditableCell";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";
import { Pagination } from "../Pagination";
import { ColumnDef } from "../types";
import styles from "./DataTable.module.scss";

export type ContextMenuItem<T> = {
  label: string;
  onClick: (row: T) => void;
  disabled?: boolean;
};

interface DataTableProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  patchRecord?: (recordIndex: number, columnId: string, value: any) => void;
  columns: ColumnDef<T>[];
  defaultGrouping?: string[];
  contextMenuItems?: ContextMenuItem<T>[];
}

export function DataTable<T extends object>({
  data,
  setData,
  patchRecord,
  columns,
  defaultGrouping = [],
  contextMenuItems = [],
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>(defaultGrouping);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);

  const columnHelper = createColumnHelper<T>();

  // Function to update data when cell value changes
  const updateData = (rowIndex: number, columnId: string, value: any) => {
    console.log("updateData", rowIndex, columnId, value);
    const newData = [...data] as any;
    newData[rowIndex][columnId] = value;
    setData(newData);
    patchRecord?.(rowIndex, columnId, value);
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
      enableGrouping: true,
    })
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      grouping,
      expanded,
    },
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    enableGrouping: true,
  });

  const rowModel = table.getRowModel();

  const handleContextMenuAction = (row: T, action: (row: T) => void) => {
    // Use requestAnimationFrame to ensure the context menu is fully closed
    requestAnimationFrame(() => {
      action(row);
    });
  };

  return (
    <div className={styles.wrapper}>
      <table>
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
          {rowModel.rows.map((row) => (
            <ContextMenu.Root key={row.id}>
              <ContextMenu.Trigger asChild>
                <TableRow
                  row={row}
                  renderCell={(cell) =>
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  }
                  isGrouped={row.getIsGrouped()}
                  isExpanded={row.getIsExpanded()}
                  toggleExpanded={() => row.toggleExpanded()}
                  groupedCell={
                    grouping[0] ? row.getGroupingValue(grouping[0]) : undefined
                  }
                />
              </ContextMenu.Trigger>
              <ContextMenu.Portal>
                <ContextMenu.Content className={styles.contextMenu}>
                  {contextMenuItems.map((item, index) => (
                    <ContextMenu.Item
                      key={index}
                      className={styles.contextMenuItem}
                      disabled={item.disabled}
                      onSelect={() =>
                        handleContextMenuAction(row.original, item.onClick)
                      }
                    >
                      {item.label}
                    </ContextMenu.Item>
                  ))}
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </ContextMenu.Root>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  );
}
