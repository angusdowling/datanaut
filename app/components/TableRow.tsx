import React from "react";
import { Row, Cell, flexRender } from "@tanstack/react-table";

export interface TableRowProps {
  row: Row<any>;
  renderCell: (cell: Cell<any, unknown>) => React.ReactNode;
}

export const TableRow = ({ row, renderCell }: TableRowProps) => (
  <tr key={row.id}>
    {row.getVisibleCells().map((cell) => (
      <td key={cell.id} className="border border-gray-300 p-2">
        {renderCell(cell)}
      </td>
    ))}
  </tr>
);
