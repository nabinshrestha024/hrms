import { type Currency } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useCurrencyTable } from './use-currency-table';

interface CurrencyTableProps {
  data: Currency[];
  onEdit?: (currency: Currency) => void;
  onDelete?: (id: string) => void;
}

export const CurrencyTable = ({
  data,
  onDelete,
  onEdit,
}: CurrencyTableProps) => {
  const { columns, table } = useCurrencyTable({ data, onDelete, onEdit });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="p-0 rounded-none"
    />
  );
};
