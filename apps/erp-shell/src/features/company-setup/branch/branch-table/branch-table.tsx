import { DataTable } from '@erp/ui';
import { useBranchTable } from './use-branch-table';
import type { Branch } from '@erp/data-access';

interface BranchTableProps {
  data: Branch[];
  onEdit?: (branch: Branch) => void;
  onDelete?: (id: string) => void;
}

export const BranchTable = ({ data, onEdit, onDelete }: BranchTableProps) => {
  const { columns, table } = useBranchTable({
    data,
    onEdit,
    onDelete,
  });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <DataTable table={table} columns={columns} />
      </div>
    </>
  );
};
