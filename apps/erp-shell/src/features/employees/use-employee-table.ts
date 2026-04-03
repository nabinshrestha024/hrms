import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { useDataTable, type RowAction } from '@erp/ui';
import { useEmployees, type Employee } from '@erp/data-access';
import { Eye, Pencil, Trash2, Shield } from 'lucide-react';
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { columns } from './columns';

interface UseEmployeeTableOptions {
  onAssignAccess?: (employeeName: string) => void;
}

/**
 * Custom hook for employee table state.
 *
 * Why `navigate` is a parameter instead of calling `useNavigate()` internally:
 * TanStack Router's `useNavigate` returns a typed function bound to the current route.
 * This hook is used by the route component which has the correct route context.
 * Calling `useNavigate()` inside this hook would lose the type-safe route params.
 */
export function useEmployeeTable(
  navigate: (opts: { to: string; params: Record<string, string> }) => void,
  options?: UseEmployeeTableOptions
) {
  // URL-synced state
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
  const [branch, setBranch] = useQueryState(
    'branch',
    parseAsString.withDefault('')
  );

  // API data
  const { data: result, isLoading } = useEmployees({
    page,
    pageSize,
    sortBy: sortBy || undefined,
    sortOrder: (sortOrder as 'asc' | 'desc') || undefined,
    search: search || undefined,
    branch: branch && branch !== 'all' ? branch : undefined,
  });

  const employees = result?.data ?? [];
  const totalCount = result?.total ?? 0;

  // Row actions
  const rowActions: RowAction<Employee>[] = [
    {
      label: 'View',
      icon: Eye,
      onClick: (row: Employee) =>
        navigate({ to: '/employees/$id', params: { id: row.id } }),
    },
    {
      label: 'Edit',
      icon: Pencil,
      onClick: (row: Employee) =>
        alert(`Edit: ${row.firstName} ${row.lastName}`),
    },
    {
      label: 'Assign Access',
      icon: Shield,
      onClick: (row: Employee) =>
        options?.onAssignAccess?.(`${row.firstName} ${row.lastName}`),
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: (row: Employee) =>
        alert(`Delete: ${row.firstName} ${row.lastName}`),
      variant: 'destructive',
      separator: true,
    },
  ];

  // Table instance
  const { table } = useDataTable({
    data: employees,
    columns,
    pageCount: Math.ceil(totalCount / pageSize) || 1,
    getRowId: (row: Employee) => row.id,
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
    // Data
    employees,
    totalCount,
    isLoading,
    table,
    columns,
    rowActions,

    // URL state
    page,
    pageSize,
    search,
    branch,

    // State setters
    setPage,
    setPageSize,
    setSearch,
    setBranch,
  };
}
