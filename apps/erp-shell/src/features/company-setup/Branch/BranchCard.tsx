import { HRCard } from '@erp/ui';
import { Edit, Network, Trash2 } from 'lucide-react';
import { Branch } from '../schema/BranchData';
interface BranchCardProps {
  data: Branch[];
}
export const BranchCard = ({ data }: BranchCardProps) => {
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
              <div className="flex justify-between">
                <Network className="w-8 h-8 text-black font-normal" />
                <div className="flex gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-muted p-1">
                    <Edit className="w-4 h-4 text-black font-bold" />
                  </div>

                  <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-chart-3 p-1">
                    <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-[16px] leading-6">
                <span className="text-foreground  font-medium">
                  {items.branch}
                </span>
                <span className="text-card-text  font-normal">
                  {items.location}
                </span>
                <span className="text-secondary-foreground  font-normal">
                  {items.branchId}
                </span>
              </div>
            </HRCard>
          ))}
        </HRCard>
      </div>
    </>
  );
};
