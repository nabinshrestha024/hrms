import { type WorkType } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getWorkTypeColumn } from './get-work-type';

interface WorkTableProps {
  data: WorkType[];
  onEdit?: (workType: WorkType) => void;
  onDelete?: (id: string) => void;
}

export function useWorkTable({ data, onDelete, onEdit }: WorkTableProps) {
  const columns = getWorkTypeColumn({ onEdit, onDelete });

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
