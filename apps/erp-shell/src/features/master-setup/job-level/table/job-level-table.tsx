import { type JobLevel } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useJobLevelTable } from './use-job-level-table';

interface JobLevelTableProps {
  data: JobLevel[];
  onEdit?: (jobLevel: JobLevel) => void;
  onDelete?: (id: string) => void;
}

export const JobLevelTable = ({
  data,
  onEdit,
  onDelete,
}: JobLevelTableProps) => {
  const { columns, table } = useJobLevelTable({ data, onEdit, onDelete });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="p-0 rounded-none"
    />
  );
};
