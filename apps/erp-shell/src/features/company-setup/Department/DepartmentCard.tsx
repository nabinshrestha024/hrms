import { HRCard } from '@erp/ui';
import { EllipsisVertical, Network } from 'lucide-react';
import { DepartmentType } from '../../../features/company-setup/Branch/DepartmentData';
interface DepartmentCardProps {
  data: DepartmentType[];
}
export const DepartmentCard = ({ data }: DepartmentCardProps) => {
  return (
    <>
      <div className="px-6 pb-19.5 bg-[#F9FAFB]">
        <HRCard
          cardClassName="p-6 border-none rounded-xl bg-white shadow-[0_1px_2px_0_rgba(255,0,0,0.05)]"
          cardContentClassName="grid grid-cols-4 gap-4 p-0"
        >
          {data.map((items, index) => (
            <HRCard
              key={index}
              cardClassName="p-4 border border-[#E4E4E7] rounded-xl bg-white shadow-[0_1px_2px_0_rgba(255,0,0,0.05)]"
              cardContentClassName="flex flex-col gap-4 p-0"
            >
              <div className="flex justify-between items-center">
                <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-primary p-1">
                  <Network className="w-4 h-4 text-white font-normal" />
                </div>
                <EllipsisVertical className="text-secondary-foreground w-4 h-4 " />
              </div>
              <div className="flex flex-col text-[16px] leading-6">
                <span className="text-secondary-foreground  font-normal">
                  {items.code}
                </span>
                <span className="text-foreground  font-medium">
                  {items.department}
                </span>
              </div>
            </HRCard>
          ))}
        </HRCard>
      </div>
    </>
  );
};
