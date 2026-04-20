import { useServerTableState } from '@erp/ui';
import { CurrencyDataType } from '../../schema/CurrencyData';
import { getCurrencyColumn } from './get-currency';

interface CurrencyTableProps {
  data: CurrencyDataType[];
}

export function useCurrencyTable({ data }: CurrencyTableProps) {
  const columns = getCurrencyColumn();

  const table = useServerTableState<CurrencyDataType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.currencyName,
  });

  return {
    table,
    columns,
  };
}
