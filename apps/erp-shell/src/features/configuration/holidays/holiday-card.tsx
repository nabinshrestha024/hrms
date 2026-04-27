import { HRCard } from '@erp/ui';

// Visual summary chrome for the holidays page. Each entry is a category
// + day-count + accent color. The day counts are placeholder values —
// a future task should derive them from `useHolidays()` aggregated by
// `Holiday.type` and pull colors from `useHolidayTypes()`. Inlined here
// so the legacy `schema/HolidayData.ts` could be deleted; the constant
// itself is local-only and not exported.
const configHolidayData = [
  { holidayType: 'National Holiday', days: '08', color: '#51A2FF' },
  { holidayType: 'Regional Holiday', days: '0', color: '#05DF72' },
  { holidayType: 'Company Holiday', days: '01', color: '#C27AFF' },
  { holidayType: 'Optional Holiday', days: '01', color: '#FF8904' },
];

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
