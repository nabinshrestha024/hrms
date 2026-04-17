import { useServerTableState } from '@erp/ui';
import { LeaveRequest } from '../../schema/LeaveRequestData';
import { getMyRequestColumn } from './get-my-request-column';
interface MyRequestTableProps {
  data: LeaveRequest[];
}

export function useMyRequestTable({ data }: MyRequestTableProps) {
  const columns = getMyRequestColumn();

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
