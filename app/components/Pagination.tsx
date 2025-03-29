import React from "react";

export interface PaginationProps {
  table: any;
}

export const Pagination = ({ table }: PaginationProps) => (
  <div className="mt-4 flex items-center gap-2">
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={() => table.setPageIndex(0)}
      disabled={!table.getCanPreviousPage()}
    >
      First
    </button>
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </button>
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </button>
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      disabled={!table.getCanNextPage()}
    >
      Last
    </button>
  </div>
);
