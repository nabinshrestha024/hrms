import { HRTabs } from '@erp/ui';
import { UserAttendanceInformation } from './user-attendance';
import { UserDocument } from './user-document';
import { UserEducation } from './user-education';
import { UserPersonalInformation } from './user-personal-infornation';
import { UserWorkInformation } from './user-work-information';

export const ProfileTabs = () => {
  const tabsData = [
    {
      id: 1,
      value: 'Personal Information',
      triggerText: 'Personal Information',
      content: <UserPersonalInformation />,
    },
    {
      id: 2,
      value: 'Work Information',
      triggerText: 'Work Information',
      content: <UserWorkInformation />,
    },
    {
      id: 3,
      value: 'Attendance',
      triggerText: 'Attendance',
      content: <UserAttendanceInformation />,
    },

    {
      id: 4,
      value: 'Payroll',
      triggerText: 'Payroll',
      content: '',
    },
    {
      id: 5,
      value: 'Education',
      triggerText: 'Education',
      content: <UserEducation />,
    },
    {
      id: 6,
      value: 'Document',
      triggerText: 'Document',
      content: <UserDocument />,
    },
  ];
  return (
    <>
      <div>
        <HRTabs
          defaultValue="Personal Information"
          tabClassName="flex flex-col gap-8"
          tabListClassName="flex justify-start items-start py-0 px-3 bg-white rounded-[6px] border border-[#E4E4E7]"
          tabList={tabsData}
          tabTriggerClassName="h-9 data-[state=active]:text-[#4F39F6] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none px-4 py-3  text-[14px] font-medium leading-5 text-[#71717A] data-[state=active]:border-b-2 data-[state=active]:border-b-[#4F39F6] flex-none inline-flex-none "
          tabsContentClassName="py-6 pl-6 pr-3 border border-[#E4E4E7] rounded-[8px] bg-white "
        />
      </div>
    </>
  );
};
