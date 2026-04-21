import { HRCard } from '@erp/ui';
import { employees } from '../employee/schema/employee-data';
import { IconButton } from '../../components/icon-button';
import { Edit } from 'lucide-react';
import { ProfileTabs } from './profile-tabs';

export const ProfileHeader = () => {
  const employee = employees.filter((emp) => emp.employeeId === 'EMP001');

  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="w-full p-6 bg-white border-none rounded-xl shadow-none"
        cardContentClassName="p-0 flex flex-col gap-8"
      >
        <HRCard
          cardClassName="w-full p-6 bg-white border border-[#E4E4E7] rounded-xl shadow-sm"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          {employee.map((employee, index) => (
            <div className="flex gap-3" key={index}>
              <div className="relative w-29.5 h-29.5">
                <img
                  src={'/Image.png'}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
                <IconButton className="absolute -bottom-2.5 left-1/3 transform(50%, 0) w-7 h-7 rounded-full">
                  <Edit className="w-4 h-4 text-foreground" />
                </IconButton>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg font-semibold">
                  {employee.firstName} {employee.lastName}
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3">
                    <span className="w-15 text-[12px] font-normal leading-4 text-secondary-foreground">
                      Role
                    </span>
                    <span className="text-[12px] font-medium leading-4 text-foreground">
                      {employee.designation}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-15 text-[12px] font-normal leading-4 text-secondary-foreground">
                      Email
                    </span>
                    <span className="text-[12px] font-medium leading-4 text-foreground">
                      {employee.email}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-15 text-[12px] font-normal leading-4 text-secondary-foreground">
                      Contact
                    </span>
                    <span className="text-[12px] font-medium leading-4 text-foreground">
                      {employee.phone ?? 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </HRCard>
        <ProfileTabs />
      </HRCard>
    </div>
  );
};
