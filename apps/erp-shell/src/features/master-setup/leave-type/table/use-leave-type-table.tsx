import { type LeavePayType } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getLeaveTypeColumn } from './get-leave-type-column';

interface LeaveTypeTableProps {
  data: LeavePayType[];
}

export function useLeaveTypeTable({ data }: LeaveTypeTableProps) {
  const columns = getLeaveTypeColumn();

  const table = useServerTableState<LeavePayType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return {
    table,
    columns,
  };
}
