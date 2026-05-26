import { type Shift } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getShiftColumn } from './get-shift-column';

interface ShiftProps {
  data: Shift[];
  onEdit?: (shift: Shift) => void;
  onDelete?: (id: string) => void;
}

export function useShiftTable({ data, onDelete, onEdit }: ShiftProps) {
  const columns = getShiftColumn({ onDelete, onEdit });

  const table = useServerTableState<Shift>({
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
