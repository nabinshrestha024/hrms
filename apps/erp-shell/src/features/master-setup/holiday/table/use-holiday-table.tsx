import { useServerTableState } from '@erp/ui';
import { HolidayDataType } from '../../schema/HolidayData';
import { getHolidayColumn } from './get-holiday';

interface HolidayTableProps {
  data: HolidayDataType[];
}

export function useHolidayTable({ data }: HolidayTableProps) {
  const columns = getHolidayColumn();

  const table = useServerTableState<HolidayDataType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.leaveType,
  });

  return {
    table,
    columns,
  };
}
