import { type Shift as ShiftRecord } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { ShiftCard } from './shift-card';
import { ShiftTable } from './table/shift-table';

interface ShiftProps {
  data: ShiftRecord[];
}

export const Shift = ({ data }: ShiftProps) => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
        cardContentClassName="p-0 flex flex-col gap-8"
      >
        <ShiftCard data={data} />
        <ShiftTable data={data} />
      </HRCard>
    </div>
  );
};
