import { type WorkType } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useWorkTable } from './use-work-type-table';

interface WorkTableProps {
  data: WorkType[];
}

export const WorkTable = ({ data }: WorkTableProps) => {
  const { columns, table } = useWorkTable({ data });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="p-0 rounded-none"
    />
  );
};
