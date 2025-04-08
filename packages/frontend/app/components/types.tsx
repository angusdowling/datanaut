export type CellType = "text" | "number" | "percentage";

export type ColumnDef<T> = {
  accessor: keyof T;
  header: string;
  type?: CellType;
  enableGrouping?: boolean;
  aggregationFn?: string;
};
