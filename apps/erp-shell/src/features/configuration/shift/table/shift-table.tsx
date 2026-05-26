import { type Shift } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useShiftTable } from './use-shift-column';

interface ShiftProps {
  data: Shift[];
  onEdit?: (shift: Shift) => void;
  onDelete?: (id: string) => void;
}

export const ShiftTable = ({ data, onEdit, onDelete }: ShiftProps) => {
  const { columns, table } = useShiftTable({ data, onEdit, onDelete });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="p-0 rounded-none"
    />
  );
};
