import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { useDataTable } from '@erp/ui';
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { getLeaveLogColumn } from './getLeaveLog';
import { LeaveLog } from '../../../schema/leave-log-data';

interface BranchTableProps {
  data: LeaveLog[];
}

export function useLeaveLogTable({ data }: BranchTableProps) {
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

  // Row actions
  //   const rowActions: RowAction<Branch>[] = [

  //     {
  //       label: 'Edit',
  //       icon: Edit,
  //     //   onClick: ()=>{},
  //     },
  //     {
  //       label: 'Delete',
  //       icon: Trash2,
  //     //   onClick: () =>{},
  //       variant: 'destructive',
  //     },
  //   ];

  const totalCount = data.length ?? 0;
  const columns = getLeaveLogColumn();
  // Table instance
  const { table } = useDataTable({
    data: data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize) || 1,
    getRowId: (row: LeaveLog) => row.eventDate,
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
    // rowActions,

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
