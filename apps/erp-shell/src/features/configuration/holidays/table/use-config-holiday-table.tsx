import { type Holiday } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getConfigurationHolidayColumn } from './get-config-holiday-column';

interface HolidayTableProps {
  data: Holiday[];
}

export function useConfigurationHolidayTable({ data }: HolidayTableProps) {
  const columns = getConfigurationHolidayColumn();

  const table = useServerTableState<Holiday>({
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
