import type { Employee } from '@erp/data-access';
import { HRTabs } from '@erp/ui';
import { AttendanceInformation } from './employee-details/attendance';
import { Document } from './employee-details/document';
import { Education } from './employee-details/education';
import { LeaveBalance } from './employee-details/leave-balance';
import { PersonalInformation } from './employee-details/personal-information';
import { WorkInformation } from './employee-details/work-information';

export const EmployeeDetail = ({ employee }: { employee: Employee }) => {
  const tabsData = [
    {
      id: 1,
      value: 'Personal Information',
      triggerText: 'Personal Information',
      content: <PersonalInformation employee={employee} />,
    },
    {
      id: 2,
      value: 'Work Information',
      triggerText: 'Work Information',
      content: <WorkInformation employee={employee} />,
    },
    {
      id: 3,
      value: 'Attendance',
      triggerText: 'Attendance',
      content: <AttendanceInformation />,
    },
    {
      id: 4,
      value: 'Leave Balance',
      triggerText: 'Leave Balance',
      content: <LeaveBalance />,
    },
    {
      id: 5,
      value: 'Payroll',
      triggerText: 'Payroll',
      content: '',
    },
    {
      id: 6,
      value: 'Education',
      triggerText: 'Education',
      content: <Education />,
    },
    {
      id: 7,
      value: 'Document',
      triggerText: 'Document',
      content: <Document />,
    },
  ];
  return (
    <div>
      <HRTabs
        defaultValue="Personal Information"
        tabClassName=" flex flex-col gap-8"
        tabListClassName="flex py-0 px-3 bg-white rounded-[6px] border border-[#E4E4E7]"
        tabList={tabsData}
        tabTriggerClassName="h-9 data-[state=active]:text-[#4F39F6] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none px-4 py-3  text-[14px] font-medium leading-5 text-[#71717A] data-[state=active]:border-b-2 data-[state=active]:border-b-[#4F39F6]"
        tabsContentClassName="py-6 pl-6 pr-3 border border-[#E4E4E7] rounded-[8px] bg-white "
      />
    </div>
  );
};
