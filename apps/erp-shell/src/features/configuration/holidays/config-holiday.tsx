import { type Holiday } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { ConfigHolidayCard } from './holiday-card';
import { ConfigurationHolidayTable } from './table/config-holiday-table';

interface HolidayTableProps {
  data: Holiday[];
  onEdit?: (holiday: Holiday) => void;
  onDelete?: (id: string) => void;
}

export const ConfigHoliday = ({
  data,
  onEdit,
  onDelete,
}: HolidayTableProps) => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
        cardContentClassName="p-0 flex flex-col gap-8"
      >
        <ConfigHolidayCard />
        <ConfigurationHolidayTable
          data={data}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </HRCard>
    </div>
  );
};
