import { Shift, type Shift as ShiftRecord } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { ShiftCard } from './shift-card';
import { ShiftTable } from './table/shift-table';

interface ShiftProps {
  data: ShiftRecord[];
  onEdit?: (shift: Shift) => void;
  onDelete?: (id: string) => void;
}

export const Shifts = ({ data, onEdit, onDelete }: ShiftProps) => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
        cardContentClassName="p-0 flex flex-col gap-8"
      >
        <ShiftCard data={data} />
        <ShiftTable data={data} onDelete={onDelete} onEdit={onEdit} />
      </HRCard>
    </div>
  );
};
