import { type Shift as ShiftRecord } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { IconButton } from '../../../components/icon-button';
import { getShiftIcon } from './shift-icon';

interface ShiftCardProps {
  data: ShiftRecord[];
}

export const ShiftCard = ({ data }: ShiftCardProps) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {data.map((shift) => {
        const Icon = getShiftIcon(shift.shiftType);
        // Per-shift employee count is a derived aggregate; a follow-up
        // task should compute it from the employee list. Using "—" as
        // a placeholder so the card layout stays stable until then.
        const employeeCount = '—';
        return (
          <HRCard
            key={shift.id}
            cardClassName="p-4 border-l-4 border-r border-b border-t border-[#615FFF] rounded-xl shadow-sm bg-[#FFF]"
            cardContentClassName="p-0"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-[12px] font-medium leading-4 text-[#3F3F46]">
                  {shift.name}
                </div>

                <IconButton variant="shift">
                  <Icon className="w-4 h-4" />
                </IconButton>
              </div>

              <div className="text-[32px] text-[#010178] font-normal">
                {employeeCount}
              </div>
            </div>
          </HRCard>
        );
      })}
    </div>
  );
};
