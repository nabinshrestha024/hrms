import { DataTable } from '@erp/ui';
import { CurrencyDataType } from '../../schema/CurrencyData';
import { useCurrencyTable } from './use-currency-table';

interface CurrencyTableProps {
  data: CurrencyDataType[];
}

export const CurrencyTable = ({ data }: CurrencyTableProps) => {
  const { columns, table } = useCurrencyTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="p-0 rounded-none"
      />
    </>
  );
};
