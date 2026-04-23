import { DataTable } from '@erp/ui';
import { ShiftDataType } from '../../schema/ShiftData';
import { useShiftTable } from './use-shift-column';

interface ShiftProps {
  data: ShiftDataType[];
}

export const ShiftTable = ({ data }: ShiftProps) => {
  const { columns, table } = useShiftTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="p-0 rounded-none"
      />
    </>
  );
};
