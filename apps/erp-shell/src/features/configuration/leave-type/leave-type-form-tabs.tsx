import { HRTabs } from '@erp/ui';
import { CommonOptionForm } from './common-option/common-option-form';
import { AdvanceOption } from './advance-option/advance-option';

// interface ConfigurationLeaveTypeTabsProps {
//     setOpen: (open: boolean) => void;

// }
export const ConfigurationLeaveTypeTabs = () => {
  const tabsData = [
    {
      id: 1,
      value: 'Common Options',
      triggerText: 'Common Options',
      content: <CommonOptionForm />,
    },
    {
      id: 2,
      value: 'Advanced Options',
      triggerText: 'Advanced Options',
      content: <AdvanceOption />,
    },
    {
      id: 3,
      value: 'Leave Policy',
      triggerText: 'Leave Policy',
      content: <></>,
    },
  ];

  return (
    <>
      <div>
        <HRTabs
          defaultValue="Common Options"
          tabClassName=" flex flex-col gap-4"
          tabListClassName="flex py-0 px-0 bg-white rounded-none border-b border-b-border"
          tabList={tabsData}
          tabTriggerClassName="flex-1 h-9 data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none px-4 py-3  text-[14px] font-medium leading-5 text-secondary-foreground data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
          tabsContentClassName="p-0 border-none  rounded-none bg-white "
        />
      </div>
    </>
  );
};
