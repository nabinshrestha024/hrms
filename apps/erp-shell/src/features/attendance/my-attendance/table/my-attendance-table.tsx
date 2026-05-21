import { DataTable } from '@erp/ui';
import { useMyAttendanceTable } from './use-my-attendance-table';
import { Attendance } from '../../schema/MyAttendanceData';

interface MyAttendanceTableProps {
  data: Attendance[];
}

export const MyAttendanceTable = ({ data }: MyAttendanceTableProps) => {
  const { columns, table } = useMyAttendanceTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="xl:p-0 p-0 rounded-none"
      />
    </>
  );
};
