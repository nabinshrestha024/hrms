import { HRCard } from '@erp/ui';
import { shiftData } from '../schema/ShiftData';
import { IconButton } from '../../../components/icon-button';

export const ShiftCard = () => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {shiftData.map((items, index) => {
        const Icon = items.icon;
        return (
          <HRCard
            key={index}
            cardClassName="p-4 border-l-4 border-r border-b border-t border-[#615FFF] rounded-xl shadow-sm bg-[#FFF]"
            cardContentClassName=" p-0"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="text-[12px] font-medium leading-4 text-[#3F3F46]">
                  {items.title}
                </div>

                <IconButton variant="shift">
                  <Icon className="w-4 h-4" />
                </IconButton>
              </div>

              <div className="text-[32px] text-[#010178] font-normal">
                {items.numberOfEmployees}
              </div>
            </div>
          </HRCard>
        );
      })}
    </div>
  );
};
