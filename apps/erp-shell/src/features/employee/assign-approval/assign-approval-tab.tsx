import { HRTabs } from '@erp/ui';
import { LeaveTimeOff } from './leave-time-off';
import { OverTimeRequest } from './over-time-request';

export const AssignApproval = ({ employeeId: _id }: { employeeId: string }) => {
  const tabsData = [
    {
      id: 1,
      value: 'Leave/ Time Off',
      triggerText: 'Leave/ Time Off',
      content: <LeaveTimeOff />,
    },
    {
      id: 2,
      value: 'Overtime Request',
      triggerText: 'Overtime Request',
      content: <OverTimeRequest />,
    },
    {
      id: 3,
      value: 'Asset Requisition',
      triggerText: 'Asset Requisition',
      content: <OverTimeRequest />,
    },
  ];
  return (
    <div>
      <HRTabs
        defaultValue="Leave/ Time Off"
        tabClassName=" flex flex-col gap-8"
        tabListClassName="flex py-0 px-3 bg-white rounded-[6px] border border-border"
        tabList={tabsData}
        tabTriggerClassName="h-9 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none px-4 py-3  text-[14px] font-medium leading-5 text-secondary-foreground data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
        tabsContentClassName="py-6 pl-6 pr-3 border border-border rounded-[8px] bg-white "
      />
    </div>
  );
};
