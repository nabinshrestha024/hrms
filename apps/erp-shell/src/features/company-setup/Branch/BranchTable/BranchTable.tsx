import { DataTable } from '@erp/ui';
import { useBranchTable } from '../../../../features/company-setup/Branch/BranchTable/use-branch-table';
import { BranchData } from '../../../../features/company-setup/Branch/BranchTable/BranchData';
import { Branch } from '../../../../features/company-setup/Branch/BranchTable/BranchData';

interface BranchTableProps {
  data?: Branch[];
}

export const BranchTable = ({ data = BranchData }: BranchTableProps) => {
  const { columns, table } = useBranchTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        // rowActions={rowActions}
      />
    </>
  );
};
