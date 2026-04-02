import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Table,
  type TableOptions,
  type VisibilityState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

export interface UseDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  pageCount?: number;

  // Server-side mode
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;

  // State callbacks for external sync (URL, parent component)
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;

  // Initial state
  initialPagination?: PaginationState;
  initialSorting?: SortingState;
  initialColumnFilters?: ColumnFiltersState;
  initialColumnVisibility?: VisibilityState;

  // Row identity
  getRowId?: TableOptions<TData>['getRowId'];

  // Features
  enableRowSelection?: boolean;
}

export interface UseDataTableReturn<TData> {
  table: Table<TData>;
  // Expose state for external use
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  rowSelection: RowSelectionState;
  columnVisibility: VisibilityState;
  // Selected data
  selectedRows: TData[];
}

const DEFAULT_PAGINATION: PaginationState = { pageIndex: 0, pageSize: 10 };
const DEFAULT_SORTING: SortingState = [];
const DEFAULT_COLUMN_FILTERS: ColumnFiltersState = [];
const DEFAULT_VISIBILITY: VisibilityState = {};

export function useDataTable<TData>({
  data,
  columns,
  pageCount,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  onPaginationChange: onPaginationChangeExternal,
  onSortingChange: onSortingChangeExternal,
  onColumnFiltersChange: onColumnFiltersChangeExternal,
  initialPagination = DEFAULT_PAGINATION,
  initialSorting = DEFAULT_SORTING,
  initialColumnFilters = DEFAULT_COLUMN_FILTERS,
  initialColumnVisibility = DEFAULT_VISIBILITY,
  getRowId,
  enableRowSelection = false,
}: UseDataTableProps<TData>): UseDataTableReturn<TData> {
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );

  const handlePaginationChange = useCallback(
    (
      updaterOrValue:
        | PaginationState
        | ((old: PaginationState) => PaginationState)
    ) => {
      setPagination((prev) => {
        const next =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(prev)
            : updaterOrValue;
        onPaginationChangeExternal?.(next);
        return next;
      });
    },
    [onPaginationChangeExternal]
  );

  const handleSortingChange = useCallback(
    (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
      setSorting((prev) => {
        const next =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(prev)
            : updaterOrValue;
        onSortingChangeExternal?.(next);
        return next;
      });
    },
    [onSortingChangeExternal]
  );

  const handleColumnFiltersChange = useCallback(
    (
      updaterOrValue:
        | ColumnFiltersState
        | ((old: ColumnFiltersState) => ColumnFiltersState)
    ) => {
      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(prev)
            : updaterOrValue;
        onColumnFiltersChangeExternal?.(next);
        return next;
      });
    },
    [onColumnFiltersChangeExternal]
  );

  const isServerSide = manualPagination || manualSorting || manualFiltering;

  const tableOptions: TableOptions<TData> = {
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
    getRowId,
    enableRowSelection,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination,
    manualSorting,
    manualFiltering,
    ...(pageCount !== undefined && { pageCount }),
    getCoreRowModel: getCoreRowModel(),
  };

  if (!isServerSide) {
    tableOptions.getFilteredRowModel = getFilteredRowModel();
    tableOptions.getPaginationRowModel = getPaginationRowModel();
    tableOptions.getSortedRowModel = getSortedRowModel();
    tableOptions.getFacetedRowModel = getFacetedRowModel();
    tableOptions.getFacetedUniqueValues = getFacetedUniqueValues();
    tableOptions.getFacetedMinMaxValues = getFacetedMinMaxValues();
  }

  const table = useReactTable(tableOptions);

  const selectedRows = useMemo(
    () => table.getFilteredSelectedRowModel().rows.map((row) => row.original),
    [table, rowSelection]
  );

  return {
    table,
    pagination,
    sorting,
    columnFilters,
    rowSelection,
    columnVisibility,
    selectedRows,
  };
}
