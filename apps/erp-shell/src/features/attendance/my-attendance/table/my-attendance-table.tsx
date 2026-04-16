import { DataTable } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { useMyAttendanceTable } from './use-my-attendance-table';

interface MyAttendanceTableProps {
  data: AttendanceListRecord[];
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
        className="p-0 rounded-none"
      />
    </>
  );
};
