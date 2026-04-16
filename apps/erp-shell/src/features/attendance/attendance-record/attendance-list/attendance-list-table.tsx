import { DataTable } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { useAttendanceListTable } from './use-attendance-list-table';

interface AttendanceListTableProps {
  data: AttendanceListRecord[];
}

export const AttendanceListTable = ({ data }: AttendanceListTableProps) => {
  const { columns, table } = useAttendanceListTable({
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
