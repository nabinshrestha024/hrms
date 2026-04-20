import { useServerTableState } from '@erp/ui';
import { leaveTypeDataType } from '../../schema/LeaveTypeData';
import { getLeaveTypeColumn } from './get-leave-type-column';

interface LeaveTypeTableProps {
  data: leaveTypeDataType[];
}

export function useLeaveTypeTable({ data }: LeaveTypeTableProps) {
  const columns = getLeaveTypeColumn();

  const table = useServerTableState<leaveTypeDataType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.leavetype,
  });

  return {
    table,
    columns,
  };
}
