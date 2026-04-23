import { useServerTableState } from '@erp/ui';
import { getShiftColumn } from './get-shift-column';
import { ShiftDataType } from '../../schema/ShiftData';

interface ShiftProps {
  data: ShiftDataType[];
}

export function useShiftTable({ data }: ShiftProps) {
  const columns = getShiftColumn();

  const table = useServerTableState<ShiftDataType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.title,
  });

  return {
    table,
    columns,
  };
}
