import { useServerTableState } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { getOverTimeAttendanceColumn } from './get-over-time-attendance-column';

interface OverTimeAttendanceTableProps {
  data: AttendanceListRecord[];
}

export function useOverTimeAttendanceTable({
  data,
}: OverTimeAttendanceTableProps) {
  const columns = getOverTimeAttendanceColumn();

  const table = useServerTableState<AttendanceListRecord>({
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
