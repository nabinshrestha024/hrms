import { HRTabs } from '@erp/ui';
import { TaxSlabs } from './payroll-setup-tab/tax-slabs';
import { Deductions } from './payroll-setup-tab/deductions';
import { Allowance } from './payroll-setup-tab/allowances';
import { FestivalBonus } from './payroll-setup-tab/festival-bonus';
import { LeaveEncashment } from './payroll-setup-tab/leave-encashment';

export const PayrollSetupDetail = () => {
  const tabsData = [
    {
      id: 1,
      value: 'Tax Slabs',
      triggerText: 'Tax Slabs',
      content: <TaxSlabs />,
    },
    {
      id: 2,
      value: 'Deductions',
      triggerText: 'Deductions',
      content: <Deductions />,
    },
    {
      id: 3,
      value: 'Allowances',
      triggerText: 'Allowances',
      content: <Allowance />,
    },
    {
      id: 4,
      value: 'Festival Bonus',
      triggerText: 'Festival Bonus',
      content: <FestivalBonus />,
    },
    {
      id: 5,
      value: 'Leave Encashment',
      triggerText: 'Leave Encashment',
      content: <LeaveEncashment />,
    },
  ];
  return (
    <HRTabs
      defaultValue="Tax Slabs"
      tabClassName=" flex flex-col gap-8"
      tabListClassName="flex py-0 px-3 bg-white rounded-[6px] border border-[#E4E4E7]"
      tabList={tabsData}
      tabTriggerClassName="h-9 data-[state=active]:text-[#4F39F6] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none px-4 py-3  text-[14px] font-medium leading-5 text-[#71717A] data-[state=active]:border-b-2 data-[state=active]:border-b-[#4F39F6]"
      tabsContentClassName="p-0 border-none rounded-none bg-white "
    />
  );
};
