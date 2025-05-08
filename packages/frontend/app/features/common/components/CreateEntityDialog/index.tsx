import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import { ReactNode } from "react";

interface CreateEntityDialogProps<T> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSubmit: (formData: T) => Promise<void>;
  children: ReactNode;
}

export function CreateEntityDialog<T>({
  isOpen,
  onOpenChange,
  title,
  onSubmit,
  children,
}: CreateEntityDialogProps<T>) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{title}</Dialog.Title>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries()) as T;
              await onSubmit(data);
            }}
          >
            <div>{children}</div>
            <div>
              <Button
                type="button"
                variant="soft"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
