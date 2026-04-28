import { type WorkType } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getWorkTypeColumn } from './get-work-type';

interface WorkTableProps {
  data: WorkType[];
}

export function useWorkTable({ data }: WorkTableProps) {
  const columns = getWorkTypeColumn();

  const table = useServerTableState<WorkType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return {
    table,
    columns,
  };
}
