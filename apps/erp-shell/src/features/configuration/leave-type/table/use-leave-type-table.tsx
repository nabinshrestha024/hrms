import { type LeaveType } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getConfigurationLeaveTypeColumn } from './get-leave-type-column';

interface LeaveTypeTableProps {
  data: LeaveType[];
}

export function useConfigurationLeaveTypeTable({ data }: LeaveTypeTableProps) {
  const columns = getConfigurationLeaveTypeColumn();

  const table = useServerTableState<LeaveType>({
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
