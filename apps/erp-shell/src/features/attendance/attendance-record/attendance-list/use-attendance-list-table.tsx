import { useServerTableState } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { getAttendanceListColumn } from './get-attendance-list-column';

interface AttendanceListTableProps {
  data: AttendanceListRecord[];
}

export function useAttendanceListTable({ data }: AttendanceListTableProps) {
  const columns = getAttendanceListColumn();

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
