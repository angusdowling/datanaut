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
  <tr key={row.id}>
    {row.getVisibleCells().map((cell) => {
      if (cell.getIsGrouped()) {
        return (
          <td key={cell.id}>
            <button onClick={toggleExpanded}>{isExpanded ? "🔽" : "▶️"}</button>
            {`${cell.column.columnDef.header as string}: ${String(
              cell.getValue()
            )}`}
            <span>({row.subRows.length} items)</span>
          </td>
        );
      } else if (cell.getIsAggregated()) {
        // If the cell is aggregated, you can display aggregated values
        return <td key={cell.id}>{renderCell(cell)}</td>;
      } else if (cell.getIsPlaceholder()) {
        // For placeholder cells (in grouped rows)
        return <td key={cell.id}></td>;
      }

      // Regular cell
      return <td key={cell.id}>{renderCell(cell)}</td>;
    })}
  </tr>
);
