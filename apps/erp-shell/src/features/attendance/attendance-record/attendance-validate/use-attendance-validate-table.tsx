import { useServerTableState } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { getAttendanceValidateColumn } from './get-attendance-validate';

interface AttendanceValidateTableProps {
  data: AttendanceListRecord[];
}

export function useAttendanceValidateTable({
  data,
}: AttendanceValidateTableProps) {
  const columns = getAttendanceValidateColumn();

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
