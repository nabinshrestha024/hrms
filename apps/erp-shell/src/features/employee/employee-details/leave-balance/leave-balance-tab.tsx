import { leaveLogData } from '../../schema/leave-log-data';
import { LeaveLogTable } from './leave-log/leave-log-table';
import { YearSummary } from './year-summary';
import { HRTabs } from '@erp/ui';

interface LeaveBalanceTabsProps {
  leaveId: number;
}
export const LeaveBalanceTabs = ({ leaveId }: LeaveBalanceTabsProps) => {
  const tabsData = [
    {
      id: 1,
      value: 'Year Summary',
      triggerText: 'Year Summary',
      content: <YearSummary leaveId={leaveId} />,
    },
    {
      id: 2,
      value: 'Leave Log',
      triggerText: 'Leave Log',
      content: <LeaveLogTable data={leaveLogData} />,
    },
  ];

  return (
    <>
      <div>
        <HRTabs
          defaultValue="Year Summary"
          tabClassName=" flex flex-col gap-8"
          tabListClassName="flex py-0 px-0 bg-white rounded-none border-b border-b-[#E4E4E7]"
          tabList={tabsData}
          tabTriggerClassName="flex-1 h-9 data-[state=active]:text-[#4F39F6] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none px-4 py-3  text-[14px] font-medium leading-5 text-[#71717A] data-[state=active]:border-b-2 data-[state=active]:border-b-[#4F39F6]"
          tabsContentClassName="p-0 border-none  rounded-none bg-white "
        />
      </div>
    </>
  );
};
