import type { Table } from '@tanstack/react-table';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../primitives/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../primitives/pagination';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 15, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  const totalPages = table.getPageCount() || 1;
  const currentPage = table.getState().pagination.pageIndex;
  const maxVisiblePages = 5;

  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, endPage - maxVisiblePages);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i
  );
  return (
    <div
      data-slot="data-table-pagination"
      className="flex flex-col-reverse items-center justify-between px-2 py-4 sm:flex-row"
    >
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="text-[12px] leading-4 font-medium text-foreground">
            Show
          </span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-[12px] leading-4 font-medium text-foreground">
            entries
          </span>
        </div>

        <div className="flex-1 text-[12px] leading-4 font-medium text-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} entries
        </div>
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <Pagination>
          <PaginationContent className="flex gap-2">
            <PaginationPrevious
              onClick={() => table.previousPage()}
              aria-disabled={!table.getCanPreviousPage()}
              className={
                !table.getCanPreviousPage()
                  ? 'pointer-events-none opacity-50 border'
                  : 'cursor-pointer'
              }
            />

            {startPage > 0 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.setPageIndex(0)}
                    isActive={currentPage === 0}
                    className="cursor-pointer hover:bg-muted bg-white"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <span className="px-2 text-muted-foreground">...</span>
              </>
            )}

            {visiblePages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => table.setPageIndex(page)}
                  isActive={currentPage === page}
                  className={`cursor-pointer hover:bg-muted ${
                    currentPage === page ? 'cursor-default bg-muted' : ''
                  }`}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {endPage < totalPages && (
              <>
                <span className="px-2 text-muted-foreground">...</span>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.setPageIndex(totalPages - 1)}
                    isActive={currentPage === totalPages - 1}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationNext
              onClick={() => table.nextPage()}
              aria-disabled={!table.getCanNextPage()}
              className={
                !table.getCanNextPage()
                  ? 'pointer-events-none opacity-50 border'
                  : 'cursor-pointer'
              }
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export { DataTablePagination };
export type { DataTablePaginationProps };
