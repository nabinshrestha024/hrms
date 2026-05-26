import { type Holiday } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getConfigurationHolidayColumn } from './get-config-holiday-column';

interface HolidayTableProps {
  data: Holiday[];
  onEdit?: (holiday: Holiday) => void;
  onDelete?: (id: string) => void;
}

export function useConfigurationHolidayTable({
  data,
  onDelete,
  onEdit,
}: HolidayTableProps) {
  const columns = getConfigurationHolidayColumn({ onDelete, onEdit });

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
