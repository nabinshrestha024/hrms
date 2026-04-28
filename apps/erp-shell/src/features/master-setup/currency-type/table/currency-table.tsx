import { type Currency } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useCurrencyTable } from './use-currency-table';

interface CurrencyTableProps {
  data: Currency[];
}

export const CurrencyTable = ({ data }: CurrencyTableProps) => {
  const { columns, table } = useCurrencyTable({ data });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="p-0 rounded-none"
    />
  );
};
