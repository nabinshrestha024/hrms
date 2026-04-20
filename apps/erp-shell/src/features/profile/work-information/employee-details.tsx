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
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Employee ID
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              EMP-001
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Branch
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Kathmandu
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Department
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Management
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Job Level
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Senior
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Designation
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Product Manager
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Manager
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Nepal
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Shift
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Normal
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Work Type
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Onsite
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Employee type
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Full Time
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Work Email
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              johndoe@ffice.com
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Work Phone
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              9841000000
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Joining Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              2079/12/14
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Contract Start Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              2079/12/23
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Contract End Date
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              2081/12/14
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
