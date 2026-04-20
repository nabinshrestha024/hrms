import { useServerTableState } from '@erp/ui';
import { WorkTypeDataType } from '../../schema/WorkTypeData';
import { getWorkTypeColumn } from './get-work-type';

interface WorkTableProps {
  data: WorkTypeDataType[];
}

export function useWorkTable({ data }: WorkTableProps) {
  const columns = getWorkTypeColumn();

  const table = useServerTableState<WorkTypeDataType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.worktype,
  });

  return {
    table,
    columns,
  };
}
