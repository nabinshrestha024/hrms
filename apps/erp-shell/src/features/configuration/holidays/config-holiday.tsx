import { HRCard } from '@erp/ui';
import { ConfigHolidayCard } from './holiday-card';
import { ConfigurationHolidayTable } from './table/config-holiday-table';
import { HolidayTableType } from '../schema/HolidayData';
interface HolidayTableProps {
  data: HolidayTableType[];
}
export const ConfigHoliday = ({ data }: HolidayTableProps) => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
        cardContentClassName="p-0 flex flex-col gap-8"
      >
        <ConfigHolidayCard />
        <ConfigurationHolidayTable data={data} />
      </HRCard>
    </div>
  );
};
