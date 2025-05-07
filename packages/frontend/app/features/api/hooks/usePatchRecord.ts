import { useMemo } from "react";
import { debounce } from "~/utilities/debounce";

// Generic hook for patching records
export const usePatchRecord = <T extends { id?: string }, U>(
  patchFunction: (params: { id: string; data: U }) => Promise<any>,
  tableData: T[] | undefined,
  debounceMs: number = 500
) => {
  // Raw patch function
  const patchRecord = async (
    recordIndex: number,
    columnId: string,
    value: any
  ) => {
    console.log("patching record:", recordIndex, columnId, value);
    const record = tableData?.[recordIndex];
    if (!record?.id) {
      console.error("Missing record ID");
      return;
    }

    const updatedData = {
      [columnId]: value,
    } as U;

    await patchFunction({
      id: record.id,
      data: updatedData,
    });
  };

  // Debounced version (stable across renders)
  const debouncedPatchRecord = useMemo(() => {
    return debounce((recordIndex: number, columnId: string, value: any) => {
      patchRecord(recordIndex, columnId, value);
    }, debounceMs);
  }, [tableData, patchRecord]);

  return debouncedPatchRecord;
};
