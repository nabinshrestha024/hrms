import { DataTable } from '@erp/ui';
import { useAllowanceTable } from './use-allowance-table';
import { Allowance } from '@erp/data-access';

interface AllowanceTableProps {
  data: Allowance[];
}

export const AllowanceTable = ({ data }: AllowanceTableProps) => {
  const { columns, table } = useAllowanceTable({ data });

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        className="xl:p-0 p-0 rounded-none"
      />
    </>
  );
};
