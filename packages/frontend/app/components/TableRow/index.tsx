import React from "react";
import { Row, Cell } from "@tanstack/react-table";

type Props = {
  row: Row<any>;
  renderCell: (cell: Cell<any, unknown>) => React.ReactNode;
  isGrouped?: boolean;
  isExpanded?: boolean;
  toggleExpanded?: () => void;
  groupedCell?: any;
} & React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = React.forwardRef<HTMLTableRowElement, Props>(
  (
    {
      row,
      renderCell,
      isGrouped,
      isExpanded,
      toggleExpanded,
      groupedCell,
      ...rest
    },
    ref
  ) => (
    <tr key={row.id} ref={ref} {...rest}>
      {row.getVisibleCells().map((cell) => {
        if (cell.getIsGrouped()) {
          const value = cell.getValue();
          const displayValue =
            typeof value === "object" && value !== null && "value" in value
              ? value.value
              : value;

          return (
            <td key={cell.id}>
              <button onClick={toggleExpanded}>
                {isExpanded ? "🔽" : "▶️"}
              </button>
              {`${cell.column.columnDef.header as string}: ${String(displayValue)}`}
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
  )
);

TableRow.displayName = "TableRow";
