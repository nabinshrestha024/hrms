import { type HolidayType } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getHolidayColumn } from './get-holiday';

interface HolidayTableProps {
  data: HolidayType[];
  onEdit?: (holiday: HolidayType) => void;
  onDelete?: (id: string) => void;
}

export function useHolidayTable({ data, onEdit, onDelete }: HolidayTableProps) {
  const columns = getHolidayColumn({ onEdit, onDelete });

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
