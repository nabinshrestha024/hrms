import { type Shift } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useShiftTable } from './use-shift-column';

interface ShiftProps {
  data: Shift[];
}

export const ShiftTable = ({ data }: ShiftProps) => {
  const { columns, table } = useShiftTable({ data });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="p-0 rounded-none"
    />
  );
};
