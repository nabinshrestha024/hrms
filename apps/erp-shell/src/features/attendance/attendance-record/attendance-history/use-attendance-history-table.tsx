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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const columns = useMemo(
    () => getAttendanceHistoryColumn(setShowTable, setSelectedEmployeeId),
    [setShowTable]
  );

  const table = useServerTableState<AttendanceListRecord>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.employeeId,
  });

  const filteredData = selectedEmployeeId
    ? data.filter((item) => item.employeeId === selectedEmployeeId)
    : [];
  return {
    table,
    columns,
    showTable,
    setShowTable,
    filteredData,
    setSelectedEmployeeId,
  };
}
