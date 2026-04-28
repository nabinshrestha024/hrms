import { HRCard } from '@erp/ui';

export const UserPersonalDetail = () => {
  return (
    <>
      <HRCard
        cardClassName=" border-none p-0 rounded-none shadow-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[16px] font-medium leading-6 text-foreground">
          Personal Details
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              First Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              John
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Middle Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground"></span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Last Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Doe
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Personal Email
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              john.doe@example.com
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Phone number
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              123-456-7890
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Country
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              United States
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Province
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              California
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              City
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Los Angeles
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Municipality/VDC
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Los Angeles
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Ward Number
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              1
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Date of Bith
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              1989-11-09
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Gender
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Male
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Marital Status
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Single
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
