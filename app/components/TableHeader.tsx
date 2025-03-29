import { Header, flexRender } from "@tanstack/react-table";

export interface TableHeaderProps {
  header: Header<any, unknown>;
}

export const TableHeader = ({ header }: TableHeaderProps) => (
  <th
    key={header.id}
    className="border border-gray-300 bg-gray-100 p-2 text-left"
    onClick={header.column.getToggleSortingHandler()}
  >
    {flexRender(header.column.columnDef.header, header.getContext())}
  </th>
);
