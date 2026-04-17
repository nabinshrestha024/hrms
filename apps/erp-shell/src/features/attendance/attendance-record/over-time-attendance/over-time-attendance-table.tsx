import { DataTable } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { useOverTimeAttendanceTable } from './use-over-time-attendance-table';

interface OverTimeAttendanceTableProps {
  data: AttendanceListRecord[];
}

export const OverTimeAttendanceTable = ({
  data,
}: OverTimeAttendanceTableProps) => {
  const { columns, table } = useOverTimeAttendanceTable({
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
