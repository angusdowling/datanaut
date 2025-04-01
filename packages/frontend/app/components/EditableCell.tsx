import React from "react";
import { Row } from "@tanstack/react-table";

export type CellType = "text" | "number" | "percentage";

export interface EditableCellProps {
  value: any;
  row: Row<any>;
  column: any;
  type: CellType;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onFinishEdit: () => void;
}

export const EditableCell = ({
  value,
  row,
  column,
  type,
  updateData,
  isEditing,
  onStartEdit,
  onFinishEdit,
}: EditableCellProps) => {
  const displayValue = type === "percentage" ? `${value}%` : value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "text" ? e.target.value : parseInt(e.target.value, 10);
    updateData(row.index, column.id, newValue);
  };

  if (isEditing) {
    return (
      <input
        type={type === "text" ? "text" : "number"}
        value={value}
        onChange={handleChange}
        onBlur={onFinishEdit}
        autoFocus
        {...(type === "percentage" ? { min: "0", max: "100" } : {})}
      />
    );
  }

  return <div onDoubleClick={onStartEdit}>{displayValue}</div>;
};
