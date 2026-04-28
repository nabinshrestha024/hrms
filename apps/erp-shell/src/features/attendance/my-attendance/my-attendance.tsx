import { useAttendanceRecords } from '@erp/data-access';
import { HRCard, ListPage } from '@erp/ui';
import { cardData } from '../../employee/schema/attendance-card-data';
import { MyAttendanceTable } from './table/my-attendance-table';
import {
  toMyAttendanceRecord,
  type Attendance,
} from '../schema/MyAttendanceData';

export const MyAttendanceDetails = () => {
  // "My Attendance" filtered by current user — for Phase 2 we just take
  // all records; Phase 5 (RBAC) will scope to the authenticated employee.
  const { data: response } = useAttendanceRecords({ pageSize: 100 });
  const data = (response?.data ?? []).map(toMyAttendanceRecord);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-5 gap-4">
        {cardData.map((items) => (
          <HRCard
            key={items.event}
            cardClassName="p-6 border-l-4 border-l-outline border-b-none border-r-none border-t-none rounded-xl shadow-none bg-primary-foreground"
            cardContentClassName="flex flex-col gap-2 p-0"
          >
            <div className="text-[12px] font-medium leading-4">
              {items.event}
            </div>
            <div className="text-[32px] font-normal text-secondary">
              {items.days}
            </div>
          </HRCard>
        ))}
      </div>
      <ListPage<Attendance>
        dateRange
        data={data}
        renderTable={(filtered) => <MyAttendanceTable data={filtered} />}
      />
    </div>
  );
};
