import { DataTable } from '@erp/ui';
import { useBranchTable } from './use-branch-table';
import { BranchData } from './branch-data';
import { Branch } from './branch-data';

interface BranchTableProps {
  data?: Branch[];
}

export const BranchTable = ({ data = BranchData }: BranchTableProps) => {
  const { columns, table } = useBranchTable({
    data,
  });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <DataTable
          table={table}
          columns={columns}
          // rowActions={rowActions}
        />
      </div>
    </>
  );
};
