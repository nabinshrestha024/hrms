import { useServerTableState } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { getMyAttendanceColumns } from './get-my-attendance';

interface MyAttendanceTableProps {
  data: AttendanceListRecord[];
}

export function useMyAttendanceTable({ data }: MyAttendanceTableProps) {
  const columns = getMyAttendanceColumns();

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
