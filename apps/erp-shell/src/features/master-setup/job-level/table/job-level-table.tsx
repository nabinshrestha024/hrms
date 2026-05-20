import { type JobLevel } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useJobLevelTable } from './use-job-level-table';

interface JobLevelTableProps {
  data: JobLevel[];
}

export const JobLevelTable = ({ data }: JobLevelTableProps) => {
  const { columns, table } = useJobLevelTable({ data });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="xl:p-0 p-0 rounded-none"
    />
  );
};
