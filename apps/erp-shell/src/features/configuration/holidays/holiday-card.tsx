import { HRCard } from '@erp/ui';
import { configHolidayData } from '../schema/HolidayData';

export const ConfigHolidayCard = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {configHolidayData.map((items, index) => (
        <HRCard
          key={index}
          cardClassName="p-4 border-l-4 border-r border-b border-t border-[#615FFF] rounded-xl shadow-sm bg-[#FFF]"
          cardContentClassName=" p-0"
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="text-[12px] font-medium leading-4 text-[#3F3F46]">
                {items.holidayType}
              </div>

              <div
                className="rounded-full w-4 h-4 "
                style={{ backgroundColor: items.color }}
              ></div>
            </div>

            <div className="text-[32px] text-[#010178] font-normal">
              {items.days}
            </div>
          </div>
        </HRCard>
      ))}
    </div>
  );
};
