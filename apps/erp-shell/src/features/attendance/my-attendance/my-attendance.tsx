import { HRCard, ListPage } from '@erp/ui';
import { cardData } from '../../employee/schema/attendance-card-data';
import { MyAttendanceTable } from './table/my-attendance-table';
import { attendanceRecord } from '../schema/MyAttendanceData';

export const MyAttendanceDetails = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-5 gap-4">
        {cardData.map((items) => (
          <HRCard
            key={items.event}
            cardClassName="p-6 border-l-4 border-l-[#615FFF] border-b-none border-r-none border-t-none rounded-xl shadow-none bg-[#EEF2FF]"
            cardContentClassName="flex flex-col gap-2 p-0"
          >
            <div className="text-[12px] font-medium leading-4">
              {items.event}
            </div>
            <div className="text-[32px] font-normal text-[#312C85]">
              {items.days}
            </div>
          </HRCard>
        ))}
      </div>
      <ListPage
        dateRange
        data={attendanceRecord}
        renderTable={(filtered) => <MyAttendanceTable data={filtered} />}
      />
    </div>
  );
};
