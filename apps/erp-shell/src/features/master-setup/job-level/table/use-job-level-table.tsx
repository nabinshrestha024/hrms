import { type JobLevel } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getJobLevelColumn } from './get-job-level-column';

interface JobLevelTableProps {
  data: JobLevel[];
}

export function useJobLevelTable({ data }: JobLevelTableProps) {
  const columns = getJobLevelColumn();

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
