import { HRCard } from '@erp/ui';
import { Edit, Network, Trash2 } from 'lucide-react';
import type { Department as DepartmentType } from '@erp/data-access';

interface DepartmentCardProps {
  data: DepartmentType[];
  onEdit?: (dept: DepartmentType) => void;
  onDelete?: (id: string) => void;
}

export const DepartmentCard = ({
  data,
  onEdit,
  onDelete,
}: DepartmentCardProps) => {
  return (
    <>
      <div className="px-6 pb-19.5 bg-[#F9FAFB]">
        <HRCard
          cardClassName="p-6 border-none rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          cardContentClassName="grid grid-cols-4 gap-4 p-0"
        >
          {data.map((items) => (
            <HRCard
              key={items.id}
              cardClassName="p-4 border border-[#E4E4E7] rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              cardContentClassName="flex flex-col gap-4 p-0"
            >
              <div className="flex justify-between items-center">
                <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-primary p-1">
                  <Network className="w-4 h-4 text-white font-normal" />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Edit department"
                    className="w-6 h-6 flex items-center justify-center rounded-sm bg-muted p-1 cursor-pointer hover:bg-muted/80"
                    onClick={() => onEdit?.(items)}
                  >
                    <Edit className="w-4 h-4 text-black font-bold" />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete department"
                    className="w-6 h-6 flex items-center justify-center rounded-sm bg-chart-3 p-1 cursor-pointer hover:bg-chart-3/80"
                    onClick={() => onDelete?.(items.id)}
                  >
                    <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col text-[16px] leading-6">
                <span className="text-secondary-foreground font-normal">
                  {items.code}
                </span>
                <span className="text-foreground font-medium">
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
