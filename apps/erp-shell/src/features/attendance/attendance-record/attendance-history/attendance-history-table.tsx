import { DataTable } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { useAttendanceHistoryTable } from './use-attendance-history-table';
import { AttendanceListTable } from '../attendance-list/attendance-list-table';

interface AttendanceHistoryTableProps {
  data: AttendanceListRecord[];
}

export const AttendanceHistoryTable = ({
  data,
}: AttendanceHistoryTableProps) => {
  const { columns, table, showTable, filteredData } = useAttendanceHistoryTable(
    {
      data,
    }
  );

  return (
    <>
      {showTable ? (
        <AttendanceListTable data={filteredData} />
      ) : (
        <DataTable
          table={table.table}
          columns={columns}
          className="xl:p-0 p-0 rounded-none"
        />
      )}
    </>
  );
};
