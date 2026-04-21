import { HRCard } from '@erp/ui';

export const UserFinancialDetail = () => {
  return (
    <>
      <HRCard
        cardClassName=" border-none p-0 rounded-none shadow-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[16px] font-medium leading-6 text-foreground">
          Financial Details
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Gross Salary
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              600000
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Basic Salary
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              30000
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Bank Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              Citizens Bank
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Bank Account Number
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              01010101010101010
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-[#71717A]">
              Bank Account Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-[#09090B]">
              John Doe
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
