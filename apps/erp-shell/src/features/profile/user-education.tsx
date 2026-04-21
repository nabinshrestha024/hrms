import { HRCard } from '@erp/ui';
import { educationData } from '../employee/schema/education-data';

export const UserEducation = () => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="text-[18px] font-medium leading-7 text-[#09090B]">
          Education
        </div>
        {educationData.map((val, index) => (
          <HRCard
            cardClassName="p-6 border border-[#E4E4E7] rounded-xl shadow-sm"
            cardContentClassName="p-0 "
            key={index}
          >
            <div className="flex flex-col gap-2">
              <span className="text-[12px] leading-4 font-semibold text-black">
                {val.qualification}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[12px] leading-4 font-normal text-[#09090B]">
                  {val.university}
                </span>
                <span className="text-[12px] leading-4 font-normal text-[#71717A]">
                  {val.endYear} - Completed
                </span>
              </div>
            </div>
          </HRCard>
        ))}
      </div>
    </>
  );
};
