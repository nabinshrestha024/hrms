import { useServerTableState } from '@erp/ui';
import { LeaveRequest } from '../../schema/LeaveRequestData';
import { getLeaveRequestColumn } from './get-leave-request-column';
interface LeaveRequestTableProps {
  data: LeaveRequest[];
}

export function useLeaveRequestTable({ data }: LeaveRequestTableProps) {
  const columns = getLeaveRequestColumn();

  const table = useServerTableState<LeaveRequest>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.employeeId,
  });

  return {
    table,
    columns,
  };
}
