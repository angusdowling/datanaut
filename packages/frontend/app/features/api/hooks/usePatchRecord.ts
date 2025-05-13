import { useMemo, useRef } from "react";
import { debounce } from "~/utilities/debounce";

// Generic hook for patching records
export const usePatchRecord = <T extends { id?: string }, U>(
  patchFunction: (params: { id: string; data: U }) => Promise<any>,
  tableData: T[] | undefined,
  debounceMs: number = 500
) => {
  // Keep a ref to the latest tableData
  const tableDataRef = useRef(tableData);
  tableDataRef.current = tableData;

  // Create a stable debounced version that uses the ref
  const debouncedPatchRecord = useMemo(
    () =>
      debounce(
        async (
          recordIndex: number,
          columnId: string,
          value: any,
          cellId?: string
        ) => {
          console.log({ recordIndex, columnId, value, cellId });
          const record = tableDataRef.current?.[recordIndex];

          console.log("record", record);
          if (!record?.id) {
            console.error("Missing record ID");
            return;
          }

          // If we have a cellId, use it for the patch request
          if (cellId) {
            await patchFunction({
              id: cellId,
              data: { value: { value } } as U,
            });
          } else {
            // Otherwise, use the record ID and include the column in the update
            const updatedData = {
              [columnId]: value,
            } as U;

            await patchFunction({
              id: record.id,
              data: updatedData,
            });
          }
        },
        debounceMs
      ),
    [patchFunction, debounceMs] // Only recreate when these change
  );

  return debouncedPatchRecord;
};
