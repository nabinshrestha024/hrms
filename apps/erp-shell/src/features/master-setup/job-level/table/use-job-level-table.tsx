import { type JobLevel } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getJobLevelColumn } from './get-job-level-column';

interface JobLevelTableProps {
  data: JobLevel[];
  onEdit?: (jobLevel: JobLevel) => void;
  onDelete?: (id: string) => void;
}

export function useJobLevelTable({
  data,
  onEdit,
  onDelete,
}: JobLevelTableProps) {
  const columns = getJobLevelColumn({ onEdit, onDelete });

  const table = useServerTableState<JobLevel>({
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
