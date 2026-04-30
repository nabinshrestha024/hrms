import { DataTable } from '@erp/ui';
import { Allowance } from '../../../../../../mocks/modules/payroll-setup-allowance/seed';
import { useAllowanceTable } from './use-allowance-table';

interface AllowanceTableProps {
  data: Allowance[];
}

export const AllowanceTable = ({ data }: AllowanceTableProps) => {
  const { columns, table } = useAllowanceTable({ data });

  return (
    <>
      <DataTable table={table} columns={columns} className="px-0 py-0" />
    </>
  );
};
