type Props = {
  table: any;
};

export const Pagination = ({ table }: Props) => {
  return (
    <div>
      <button
        onClick={() => table.setPageIndex(0)}
        // disabled={!table.getCanPreviousPage()}
      >
        First
      </button>
      <button
        onClick={() => table.previousPage()}
        // disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <button
        onClick={() => table.nextPage()}
        // disabled={!table.getCanNextPage()}
      >
        Next
      </button>
      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        // disabled={!table.getCanNextPage()}
      >
        Last
      </button>
    </div>
  );
};
