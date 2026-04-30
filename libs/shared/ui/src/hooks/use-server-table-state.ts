import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useDataTable, type UseDataTableReturn } from './use-data-table';

export interface UseServerTableStateOptions<TData> {
  /** Row data fetched from the server. */
  data: TData[];
  /** Total row count from the server response (for pageCount calculation). */
  totalCount: number;
  /** Column definitions. */
  columns: ColumnDef<TData, unknown>[];
  /** Stable row identity (e.g. `(row) => row.id`). */
  getRowId: (row: TData) => string;
}

export interface UseServerTableStateReturn<TData>
  extends UseDataTableReturn<TData> {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  search: string;
  setPage: (value: number | null) => Promise<URLSearchParams>;
  setPageSize: (value: number | null) => Promise<URLSearchParams>;
  setSortBy: (value: string | null) => Promise<URLSearchParams>;
  setSortOrder: (value: string | null) => Promise<URLSearchParams>;
  setSearch: (value: string | null) => Promise<URLSearchParams>;
}

/**
 * URL-synced server-driven table state.
 *
 * Wraps `useDataTable` with `nuqs`-backed `page`, `pageSize`, `sortBy`,
 * `sortOrder`, and `search` query params. Pass the returned `page`,
 * `pageSize`, `sortBy`, `sortOrder`, `search` into your data-fetching
 * hook (e.g. `useEmployees({ page, pageSize, sortBy, sortOrder, search })`)
 * and feed the response back as `data` + `totalCount`.
 *
 * Replaces ~90 lines of duplicated boilerplate per table.
 */
export function useServerTableState<TData>({
  data,
  totalCount,
  columns,
  getRowId,
}: UseServerTableStateOptions<TData>): UseServerTableStateReturn<TData> {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    parseAsInteger.withDefault(10)
  );
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault('')
  );
  const [sortOrder, setSortOrder] = useQueryState(
    'sortOrder',
    parseAsString.withDefault('')
  );
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  const tableState = useDataTable<TData>({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize) || 1,
    getRowId,
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    initialPagination: { pageIndex: page - 1, pageSize },
    initialSorting: sortBy ? [{ id: sortBy, desc: sortOrder === 'desc' }] : [],
    onPaginationChange: (pagination: PaginationState) => {
      void setPage(pagination.pageIndex + 1);
      void setPageSize(pagination.pageSize);
    },
    onSortingChange: (sorting: SortingState) => {
      if (sorting.length > 0) {
        void setSortBy(sorting[0].id);
        void setSortOrder(sorting[0].desc ? 'desc' : 'asc');
      } else {
        void setSortBy(null);
        void setSortOrder(null);
      }
    },
  });

  return {
    ...tableState,
    page,
    pageSize,
    sortBy,
    sortOrder,
    search,
    setPage,
    setPageSize,
    setSortBy,
    setSortOrder,
    setSearch,
  };
}
