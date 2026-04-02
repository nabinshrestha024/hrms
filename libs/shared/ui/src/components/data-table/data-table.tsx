import {
  flexRender,
  type Table as TanstackTable,
  type ColumnDef,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { cn } from '@erp/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../primitives/table';
import { Skeleton } from '../../primitives/skeleton';
import { DataTablePagination } from './data-table-pagination';
import { DataTableRowActions, type RowAction } from './data-table-row-actions';

interface DataTableProps<TData> {
  table: TanstackTable<TData>;
  columns: ColumnDef<TData, unknown>[];

  // Row interaction
  onRowClick?: (row: TData) => void;
  rowActions?: RowAction<TData>[];

  // Loading & empty
  loading?: boolean;
  emptyMessage?: string;

  // Slots
  toolbar?: ReactNode;
  bulkActionBar?: ReactNode;

  // Pagination
  pageSizeOptions?: number[];

  className?: string;
}

function DataTable<TData>({
  table,
  columns,
  onRowClick,
  rowActions,
  loading = false,
  emptyMessage = 'No results.',
  toolbar,
  bulkActionBar,
  pageSizeOptions,
  className,
}: DataTableProps<TData>) {
  const hasSelectedRows = table.getFilteredSelectedRowModel().rows.length > 0;

  return (
    <div data-slot="data-table" className={cn('space-y-4', className)}>
      {toolbar}

      {bulkActionBar && hasSelectedRows && (
        <div data-slot="data-table-bulk-action-bar">{bulkActionBar}</div>
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                {rowActions && rowActions.length > 0 && (
                  <TableHead className="w-[50px]" />
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: table.getState().pagination.pageSize }).map(
                (_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                    {rowActions && rowActions.length > 0 && (
                      <TableCell>
                        <Skeleton className="size-8" />
                      </TableCell>
                    )}
                  </TableRow>
                )
              )
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className={cn(onRowClick && 'cursor-pointer')}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {rowActions && rowActions.length > 0 && (
                    <TableCell>
                      <DataTableRowActions
                        row={row.original}
                        actions={rowActions}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length +
                    (rowActions && rowActions.length > 0 ? 1 : 0)
                  }
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}

export { DataTable };
export type { DataTableProps };
