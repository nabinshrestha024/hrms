import { type EmployeeDocument } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useVisibilityTable } from './use-visibility-table';

interface VisbilityTableProps {
  data: EmployeeDocument[];
}

export const VisbilityTable = ({ data }: VisbilityTableProps) => {
  const { columns, table } = useVisibilityTable({ data });

  return (
    <div className="px-6 pb-19.5 bg-background">
      <DataTable table={table} columns={columns} />
    </div>
  );
};
