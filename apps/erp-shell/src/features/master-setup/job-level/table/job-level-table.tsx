import { DataTable } from '@erp/ui';
import { JobLevelDataType } from '../../schema/JobLevelData';
import { useJobLevelTable } from './use-job-level-table';

interface JobLevelTableProps {
  data: JobLevelDataType[];
}

export const JobLevelTable = ({ data }: JobLevelTableProps) => {
  const { columns, table } = useJobLevelTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="p-0 rounded-none"
      />
    </>
  );
};
