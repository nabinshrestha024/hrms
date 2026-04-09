import { DataTable } from '@erp/ui';
import { useBranchTable } from '../../../../features/company-setup/branch/table/use-branch-table';
import {
  Branch,
  BranchData,
} from '../../../../features/company-setup/schema/BranchData';

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
