import type { Employee } from '@erp/data-access';
import { HRCard } from '@erp/ui';

export const EmployeeDetailDisplay = ({ employee }: { employee: Employee }) => {
  return (
    <>
      <HRCard
        cardClassName="border-none p-0 rounded-none shadow-none bg-white"
        cardContentClassName="p-0"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Employee ID
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.employeeId}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Branch
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.branch}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Department
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.department}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Job Level
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.jobLevel}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Designation
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.designation}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Manager
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.managerId}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Shift
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.shift}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Work Type
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.workType}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Employee type
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.employeeType}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Work Email
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.workEmail}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Work Phone{' '}
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.workPhone}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Joining Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.startDate}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Contract Start Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.contractStartDate}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Contract End Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.contractEndDate}
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
