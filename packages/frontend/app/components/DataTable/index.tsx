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
  ColumnDef,
} from "@tanstack/react-table";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { EditableCell } from "../EditableCell";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";
import { Pagination } from "../Pagination";
import { ColumnDef as CustomColumnDef } from "../types";
import styles from "./DataTable.module.scss";

export type ContextMenuItem<T> = {
  label: string;
  onClick: (row: T) => void;
  disabled?: boolean;
};

interface DataTableProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  patchRecord?: (
    recordIndex: number,
    columnId: string,
    value: any,
    cellId?: string
  ) => void;
  columns: CustomColumnDef<T>[];
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
  const updateData = (
    rowIndex: number,
    columnId: string,
    value: any,
    cellId?: string
  ) => {
    console.log("updateData", rowIndex, columnId, value, cellId);
    const newData = [...data] as any;
    // Preserve the existing cell structure if it exists
    const existingCell = newData[rowIndex][columnId];
    newData[rowIndex][columnId] = {
      value,
      cellId: cellId || existingCell?.cellId,
    };
    setData(newData);
    patchRecord?.(rowIndex, columnId, value, cellId || existingCell?.cellId);
  };

  const tableColumns: ColumnDef<T, any>[] = [
    columnHelper.display({
      id: "index",
      header: "",
      cell: (info) => info.row.index + 1,
      enableGrouping: false,
    }),
    ...columns.map((col) =>
      columnHelper.accessor(
        (row: T) => {
          // Handle nested property paths (e.g., "workspace.name")
          const path = (col.accessor as string).split(".");
          let value: any = row;
          for (const key of path) {
            value = value?.[key];
          }

          // Handle value objects
          return typeof value === "object" && value !== null && "value" in value
            ? (value as { value: any }).value
            : value;
        },
        {
          id: col.accessor as string,
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
                  setEditingCell({
                    rowId: info.row.id,
                    columnId: info.column.id,
                  })
                }
                onFinishEdit={() => setEditingCell(null)}
              />
            );
          },
          enableGrouping: true,
        }
      )
    ),
  ];

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
