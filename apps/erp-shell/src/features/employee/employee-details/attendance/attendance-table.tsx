import { DataTable } from '@erp/ui';
import {
  Attendance,
  attendanceRecord,
} from '../../schema/attendance-table-data';
import { useAttendanceTable } from './use-attendance-table';

interface AttendanceTableProps {
  data?: Attendance[];
}

export const AttendanceTable = ({
  data = attendanceRecord,
}: AttendanceTableProps) => {
  const { columns, table } = useAttendanceTable({
    data,
  });

  return (
    <>
      <DataTable
        className="p-0"
        table={table}
        columns={columns}
        // rowActions={rowActions}
      />
    </>
  );
};
