import { HRCard } from '@erp/ui';
import { CircleCheckBig } from 'lucide-react';

export const OverTimeWorkFlow = () => {
  return (
    <>
      <HRCard
        cardClassName="w-full p-none  border-none  rounded-none shadow-none"
        cardContentClassName="p-0 flex flex-col gap-4 items-center"
      >
        <CircleCheckBig className="text-[20px]" />
        <div className="flex flex-col gap-1 items-center">
          <span className="text-[16px] font-medium text-[#71717A] leading-6">
            No Custom Pipeline Defined
          </span>
          <span className="text-[14px] font-normal text-[#71717A] leading-5">
            Requests will follow the company's global default rules.
          </span>
        </div>
      </HRCard>
    </>
  );
};
