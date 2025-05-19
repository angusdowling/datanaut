import { Header, flexRender } from "@tanstack/react-table";
import * as ContextMenu from "@radix-ui/react-context-menu";
import styles from "../DataTable/DataTable.module.scss";

type Props = {
  header: Header<any, unknown>;
  contextMenuItems?: {
    label: string;
    onClick: (columnId: string) => void;
    disabled?: boolean;
  }[];
};

export const TableHeader = ({ header, contextMenuItems = [] }: Props) => {
  const isGrouped = header.column.getIsGrouped();

  const handleContextMenuAction = (action: (columnId: string) => void) => {
    // Use requestAnimationFrame to ensure the context menu is fully closed
    requestAnimationFrame(() => {
      action(header.column.id);
    });
  };

  return (
    <th key={header.id}>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
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
        </ContextMenu.Trigger>
        {contextMenuItems.length > 0 && (
          <ContextMenu.Portal>
            <ContextMenu.Content className={styles.contextMenu}>
              {contextMenuItems.map((item, index) => (
                <ContextMenu.Item
                  key={index}
                  className={styles.contextMenuItem}
                  disabled={item.disabled}
                  onSelect={() => handleContextMenuAction(item.onClick)}
                >
                  {item.label}
                </ContextMenu.Item>
              ))}
            </ContextMenu.Content>
          </ContextMenu.Portal>
        )}
      </ContextMenu.Root>
    </th>
  );
};
