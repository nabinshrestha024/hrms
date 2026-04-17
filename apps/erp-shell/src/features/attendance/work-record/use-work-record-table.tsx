import { useServerTableState } from '@erp/ui';
import { WorkRecord } from '../schema/WorkRecordData';
import { getWorkRecordColumn } from './get-work-record-column';

interface WorkRecordTableProps {
  data: WorkRecord[];
}

export function useWorkRecordTable({ data }: WorkRecordTableProps) {
  const columns = getWorkRecordColumn();

  const table = useServerTableState<WorkRecord>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.employeeName,
  });

  return {
    table,
    columns,
  };
}
