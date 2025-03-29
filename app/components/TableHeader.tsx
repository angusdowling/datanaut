import { Header, flexRender } from "@tanstack/react-table";

export interface TableHeaderProps {
  header: Header<any, unknown>;
}

export const TableHeader = ({ header }: TableHeaderProps) => {
  const isGrouped = header.column.getIsGrouped();

  return (
    <th
      key={header.id}
      className="border border-gray-300 bg-gray-100 p-2 text-left"
    >
      <div className="flex items-center gap-2">
        {/* Grouping control */}
        {header.column.getCanGroup() && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              header.column.toggleGrouping();
            }}
            className={`mr-2 ${
              isGrouped ? "text-blue-600 font-bold" : "text-gray-400"
            }`}
            title={
              isGrouped ? "Ungroup by this column" : "Group by this column"
            }
          >
            {isGrouped ? "🔍" : "⊕"}
          </button>
        )}

        {/* Column header with sort control */}
        <div
          onClick={header.column.getToggleSortingHandler()}
          className="cursor-pointer flex items-center"
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      </div>
    </th>
  );
};
