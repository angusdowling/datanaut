import React from "react";
import { Row } from "@tanstack/react-table";
import { CellType } from "../types";
import styles from "./EditableCell.module.scss";

type Props = {
  value: any;
  row: Row<any>;
  column: any;
  type: CellType;
  updateData: (
    rowIndex: number,
    columnId: string,
    value: any,
    cellId?: string
  ) => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onFinishEdit: () => void;
};

export const EditableCell = ({
  value,
  row,
  column,
  type,
  updateData,
  isEditing,
  onStartEdit,
  onFinishEdit,
}: Props) => {
  const cellValue = typeof value === "object" ? value.value : value;
  const cellId = typeof value === "object" ? value.cellId : undefined;
  const displayValue = type === "percentage" ? `${cellValue}%` : cellValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "text" ? e.target.value : parseInt(e.target.value, 10);
    updateData(row.index, column.id, newValue, cellId);
  };

  if (isEditing) {
    return (
      <input
        type={type === "text" ? "text" : "number"}
        value={cellValue}
        onChange={handleChange}
        onBlur={onFinishEdit}
        autoFocus
        {...(type === "percentage" ? { min: "0", max: "100" } : {})}
      />
    );
  }

  return (
    <div className={styles.wrapper} onDoubleClick={onStartEdit}>
      {displayValue}
    </div>
  );
};
