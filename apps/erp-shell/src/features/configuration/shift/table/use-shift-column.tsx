import { type Shift } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getShiftColumn } from './get-shift-column';

interface ShiftProps {
  data: Shift[];
}

export function useShiftTable({ data }: ShiftProps) {
  const columns = getShiftColumn();

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
