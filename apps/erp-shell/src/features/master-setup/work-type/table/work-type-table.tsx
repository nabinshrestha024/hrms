import { type WorkType } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useWorkTable } from './use-work-type-table';

interface WorkTableProps {
  data: WorkType[];
  onEdit?: (workType: WorkType) => void;
  onDelete?: (id: string) => void;
}

export const WorkTable = ({ data, onEdit, onDelete }: WorkTableProps) => {
  const { columns, table } = useWorkTable({ data, onEdit, onDelete });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="xl:p-0 p-0 rounded-none"
    />
  );
};
