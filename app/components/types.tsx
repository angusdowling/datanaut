import { CellType } from "./EditableCell";

export type ColumnDef<T> = {
  accessor: keyof T;
  header: string;
  type?: CellType;
};
