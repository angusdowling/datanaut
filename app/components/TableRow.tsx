import React from "react";
import { Row, Cell } from "@tanstack/react-table";

export interface TableRowProps {
  row: Row<any>;
  renderCell: (cell: Cell<any, unknown>) => React.ReactNode;
  isGrouped?: boolean;
  isExpanded?: boolean;
  toggleExpanded?: () => void;
  groupedCell?: any;
}

export const TableRow = ({
  row,
  renderCell,
  isGrouped,
  isExpanded,
  toggleExpanded,
  groupedCell,
}: TableRowProps) => (
  <tr key={row.id} className={isGrouped ? "bg-gray-50" : ""}>
    {row.getVisibleCells().map((cell) => {
      if (cell.getIsGrouped()) {
        return (
          <td key={cell.id} className="border border-gray-300 p-2 font-bold">
            <button
              onClick={toggleExpanded}
              className="mr-2 inline-flex items-center"
            >
              {isExpanded ? "🔽" : "▶️"}
            </button>
            {`${cell.column.columnDef.header as string}: ${String(
              cell.getValue()
            )}`}
            <span className="ml-2 text-gray-500">
              ({row.subRows.length} items)
            </span>
          </td>
        );
      } else if (cell.getIsAggregated()) {
        // If the cell is aggregated, you can display aggregated values
        return (
          <td
            key={cell.id}
            className="border border-gray-300 p-2 font-semibold"
          >
            {renderCell(cell)} (aggregated)
          </td>
        );
      } else if (cell.getIsPlaceholder()) {
        // For placeholder cells (in grouped rows)
        return <td key={cell.id} className="border border-gray-300 p-2"></td>;
      }

      // Regular cell
      return (
        <td key={cell.id} className="border border-gray-300 p-2">
          {renderCell(cell)}
        </td>
      );
    })}
  </tr>
);
