import { HRCard } from '@erp/ui';
import { educationData } from '../employee/schema/education-data';

export const UserEducation = () => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="text-[18px] font-medium leading-7 text-foreground">
          Education
        </div>
        {educationData.map((val, index) => (
          <HRCard
            cardClassName="p-6 border border-border rounded-xl shadow-sm"
            cardContentClassName="p-0 "
            key={index}
          >
            <div className="flex flex-col gap-2">
              <span className="text-[12px] leading-4 font-semibold text-black">
                {val.qualification}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[12px] leading-4 font-normal text-foreground">
                  {val.university}
                </span>
                <span className="text-[12px] leading-4 font-normal text-secondary-foreground">
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
