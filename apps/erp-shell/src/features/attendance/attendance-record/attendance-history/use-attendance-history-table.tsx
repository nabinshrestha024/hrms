import { useServerTableState } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { getAttendanceHistoryColumn } from './get-attendance-history';
import { useMemo, useState } from 'react';

interface AttendanceHistoryTableProps {
  data: AttendanceListRecord[];
}

export function useAttendanceHistoryTable({
  data,
}: AttendanceHistoryTableProps) {
  const [showTable, setShowTable] = useState(false);

  const columns = useMemo(
    () => getAttendanceHistoryColumn(setShowTable),
    [setShowTable]
  );

  const table = useServerTableState<AttendanceListRecord>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.employeeId,
  });

  return {
    table,
    columns,
    showTable,
    setShowTable,
  };
}
