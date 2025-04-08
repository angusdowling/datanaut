import { Header, flexRender } from "@tanstack/react-table";

type Props = {
  header: Header<any, unknown>;
};

export const TableHeader = ({ header }: Props) => {
  const isGrouped = header.column.getIsGrouped();

  return (
    <th key={header.id}>
      <div>
        {/* Grouping control */}
        {header.column.getCanGroup() && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              header.column.toggleGrouping();
            }}
            title={
              isGrouped ? "Ungroup by this column" : "Group by this column"
            }
          >
            {isGrouped ? "🔍" : "⊕"}
          </button>
        )}

        {/* Column header with sort control */}
        <div onClick={header.column.getToggleSortingHandler()}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      </div>
    </th>
  );
};
