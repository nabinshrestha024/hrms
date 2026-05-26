import { type Currency } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getCurrencyColumn } from './get-currency';

interface CurrencyTableProps {
  data: Currency[];
  onEdit?: (currency: Currency) => void;
  onDelete?: (id: string) => void;
}

export function useCurrencyTable({
  data,
  onEdit,
  onDelete,
}: CurrencyTableProps) {
  const columns = getCurrencyColumn({ onEdit, onDelete });

  const table = useServerTableState<Currency>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return {
    table,
    columns,
  };
}
