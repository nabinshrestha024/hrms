import { DataTable } from '@erp/ui';
import {
  Attendance,
  attendanceRecord,
} from '../../employee/schema/attendance-table-data';
import { useUserAttendanceTable } from './use-user-attendance-table';

interface AttendanceTableProps {
  data?: Attendance[];
}

export const UserAttendanceTable = ({
  data = attendanceRecord,
}: AttendanceTableProps) => {
  const { columns, table } = useUserAttendanceTable({
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
