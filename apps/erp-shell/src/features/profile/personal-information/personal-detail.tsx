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
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              First Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              John
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Middle Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]"></span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Last Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Doe
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Personal Email
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              john.doe@example.com
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Phone number
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              123-456-7890
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Country
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              United States
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Province
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              California
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              City
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Los Angeles
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Municipality/VDC
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Los Angeles
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Ward Number
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              1
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Date of Bith
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              1989-11-09
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Gender
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Male
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Marital Status
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Single
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
