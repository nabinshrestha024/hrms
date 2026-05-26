import { AttendanceList } from './attendance-list';
import { AttendanceHistory } from './attendance-history';
import { AttendanceValidate } from './attendance-validate';
import { OverTimeAttendance } from './over-time-attendance';
import { HRTabs } from '@erp/ui';

export const AttendanceDetail = () => {
  const tabsData = [
    {
      id: 1,
      value: 'Attendance List (Today)',
      triggerText: 'Attendance List (Today)',
      content: <AttendanceList />,
    },
    {
      id: 2,
      value: 'Attendance History',
      triggerText: 'Attendance History',
      content: <AttendanceHistory />,
    },
    {
      id: 3,
      value: 'Attendance To Validate',
      triggerText: 'Attendance To Validate',
      content: <AttendanceValidate />,
    },

    {
      id: 4,
      value: 'Overtime Attendance',
      triggerText: 'Overtime Attendance',
      content: <OverTimeAttendance />,
    },
  ];
  return (
    <>
      <div>
        <HRTabs
          defaultValue="Attendance List (Today)"
          tabClassName=" flex flex-col gap-8"
          tabListClassName="md:max-w-[804px] overflow-auto lg:max-w-full flex py-0 px-3 bg-white rounded-[6px] border border-border"
          tabList={tabsData}
          tabTriggerClassName="h-9 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none px-4 py-3  text-[14px] font-medium leading-5 text-secondary-foreground data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
          tabsContentClassName=""
        />
      </div>
    </>
  );
};
