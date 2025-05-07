import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";

interface DeleteEntityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  entityName: string;
  onConfirm: () => Promise<void>;
}

export function DeleteEntityDialog({
  isOpen,
  onOpenChange,
  title,
  entityName,
  onConfirm,
}: DeleteEntityDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{title}</Dialog.Title>
          <p>
            Are you sure you want to delete this {entityName}? This action
            cannot be undone.
          </p>
          <div>
            <Button variant="soft" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="red" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
