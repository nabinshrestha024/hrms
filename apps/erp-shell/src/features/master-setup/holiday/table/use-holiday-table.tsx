import { type HolidayType } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getHolidayColumn } from './get-holiday';

interface HolidayTableProps {
  data: HolidayType[];
}

export function useHolidayTable({ data }: HolidayTableProps) {
  const columns = getHolidayColumn();

  const table = useServerTableState<HolidayType>({
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
