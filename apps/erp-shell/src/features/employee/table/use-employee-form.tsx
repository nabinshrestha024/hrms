import type { Employee } from '@erp/data-access';
import { useDataTable, useDialogFormStore } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { getEmployeeColumns } from './getEmployeeColumn';

interface EmployeeTableProps {
  data: Employee[];
}

export function useEmployeeTable({ data }: EmployeeTableProps) {
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

  const totalCount = data.length ?? 0;

  const { onOpen } = useDialogFormStore();
  const navigate = useNavigate();
  const columns = useMemo(
    () => getEmployeeColumns({ onOpen, navigate }),
    [onOpen, navigate]
  );

  const { table } = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize) || 1,
    getRowId: (row: Employee) => row.id,
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
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
    totalCount,
    table,
    columns,
    page,
    pageSize,
    search,
    branch,
    setPage,
    setPageSize,
    setSearch,
    setBranch,
  };
}
