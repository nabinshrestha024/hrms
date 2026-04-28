import { type Currency } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getCurrencyColumn } from './get-currency';

interface CurrencyTableProps {
  data: Currency[];
}

export function useCurrencyTable({ data }: CurrencyTableProps) {
  const columns = getCurrencyColumn();

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
