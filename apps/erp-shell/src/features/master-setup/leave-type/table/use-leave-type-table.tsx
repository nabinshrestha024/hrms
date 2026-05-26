import { type LeavePayType } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getLeaveTypeColumn } from './get-leave-type-column';

interface LeaveTypeTableProps {
  data: LeavePayType[];
  onEdit?: (leaveType: LeavePayType) => void;
  onDelete?: (id: string) => void;
}

export function useLeaveTypeTable({
  data,
  onDelete,
  onEdit,
}: LeaveTypeTableProps) {
  const columns = getLeaveTypeColumn({ onEdit, onDelete });

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
