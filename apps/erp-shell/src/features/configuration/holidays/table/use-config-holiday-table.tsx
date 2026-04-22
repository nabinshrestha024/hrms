import { useServerTableState } from '@erp/ui';
import { getConfigurationHolidayColumn } from './get-config-holiday-column';
import { HolidayTableType } from '../../schema/HolidayData';

interface HolidayTableProps {
  data: HolidayTableType[];
}

export function useConfigurationHolidayTable({ data }: HolidayTableProps) {
  const columns = getConfigurationHolidayColumn();

  const table = useServerTableState<HolidayTableType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.name,
  });

  return {
    table,
    columns,
  };
}
