import { useState, useEffect, type ReactNode } from 'react';
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { DataTable } from './data-table/data-table';
import { DataTableToolbar } from './data-table/data-table-toolbar';
import { useDataTable, type UseDataTableProps } from '../hooks/use-data-table';
import { PageHeader } from './page-header';

// ---- Types ----

export interface FetchParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface FetchResult<T> {
  data: T[];
  total: number;
}

export interface TablePageProps<T> {
  /** Page title shown in header */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** TanStack Table column definitions */
  columns: ColumnDef<T, unknown>[];
  /** Async function that fetches data. Receives pagination/sorting/search params. */
  fetchData: (params: FetchParams) => Promise<FetchResult<T>>;
  /** Unique row ID accessor. Defaults to (row) => (row as any).id */
  getRowId?: (row: T) => string;
  /** Called when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Row action menu items */
  rowActions?: UseDataTableProps<T>['data'] extends (infer _U)[] ? import('./data-table').RowAction<T>[] : never;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Slot for action buttons (e.g. "Add Employee") in the header */
  headerActions?: ReactNode;
  /** Slot for custom filters next to search */
  filterSlot?: ReactNode;
  /** Initial page size. Default: 10 */
  defaultPageSize?: number;
  /** Enable row selection checkboxes */
  enableRowSelection?: boolean;
}

export function TablePage<T>({
  title,
  subtitle,
  columns,
  fetchData,
  getRowId,
  onRowClick,
  rowActions,
  searchPlaceholder = 'Search...',
  headerActions,
  filterSlot,
  defaultPageSize = 10,
  enableRowSelection = false,
}: TablePageProps<T>) {
  // URL-synced state
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(defaultPageSize));
  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault(''));
  const [sortOrder, setSortOrder] = useQueryState('sortOrder', parseAsString.withDefault(''));
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  // Data state
  const [data, setData] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch on param change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchData({
      page,
      pageSize,
      sortBy: sortBy || undefined,
      sortOrder: (sortOrder as 'asc' | 'desc') || undefined,
      search: search || undefined,
    }).then((result) => {
      if (cancelled) return;
      setData(result.data);
      setTotalCount(result.total);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [page, pageSize, sortBy, sortOrder, search, fetchData]);

  // Table instance
  const { table } = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize) || 1,
    getRowId: getRowId ?? ((row) => (row as Record<string, string>).id),
    enableRowSelection,
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

  const computedSubtitle = subtitle ?? `${totalCount} record${totalCount !== 1 ? 's' : ''}`;

  return (
    <div>
      <PageHeader title={title} subtitle={computedSubtitle} actions={headerActions} />

      <div className="px-6">
        <DataTable
          table={table}
          columns={columns}
          loading={loading}
          onRowClick={onRowClick}
          rowActions={rowActions}
          toolbar={
            <DataTableToolbar
              table={table}
              searchPlaceholder={searchPlaceholder}
              searchValue={search}
              onSearchChange={(value) => {
                void setSearch(value || null);
                void setPage(1);
              }}
              filterSlot={filterSlot}
            />
          }
        />
      </div>
    </div>
  );
}
