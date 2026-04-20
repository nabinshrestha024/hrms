import { useServerTableState } from '@erp/ui';
import { JobLevelDataType } from '../../schema/JobLevelData';
import { getJobLevelColumn } from './get-job-level-column';

interface JobLevelTableProps {
  data: JobLevelDataType[];
}

export function useJobLevelTable({ data }: JobLevelTableProps) {
  const columns = getJobLevelColumn();

  const table = useServerTableState<JobLevelDataType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.name,
  });

  return {
    table,
    columns,
  };
}
