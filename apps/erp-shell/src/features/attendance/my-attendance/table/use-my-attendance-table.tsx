import { useServerTableState } from '@erp/ui';
import { getMyAttendanceColumns } from './get-my-attendance';
import { Attendance } from '../../schema/MyAttendanceData';

interface MyAttendanceTableProps {
  data: Attendance[];
}

export function useMyAttendanceTable({ data }: MyAttendanceTableProps) {
  const columns = getMyAttendanceColumns() as any;

  const table = useServerTableState<Attendance>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.date,
  });

  return {
    table,
    columns,
  };
}
