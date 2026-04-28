import { HRCard } from '@erp/ui';

export const UserEmployeeDetail = () => {
  return (
    <>
      <HRCard
        cardClassName=" border-none p-0 rounded-none shadow-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[16px] font-medium leading-6 text-foreground">
          Employee Details
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Employee ID
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              EMP-001
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Branch
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Kathmandu
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Department
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Management
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Job Level
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Senior
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Designation
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Product Manager
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Manager
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Nepal
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Shift
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Normal
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Work Type
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Onsite
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Employee type
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Full Time
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Work Email
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              johndoe@ffice.com
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Work Phone
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              9841000000
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Joining Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              2079/12/14
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Contract Start Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              2079/12/23
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Contract End Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              2081/12/14
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
