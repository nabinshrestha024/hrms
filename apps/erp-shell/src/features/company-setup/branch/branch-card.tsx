import { Can, PERM_SUBJECTS } from '@erp/auth';
import type { Branch } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { Edit, Network, Trash2 } from 'lucide-react';

interface BranchCardProps {
  data: Branch[];
  onEdit?: (branch: Branch) => void;
  onDelete?: (id: string) => void;
}

export const BranchCard = ({ data, onEdit, onDelete }: BranchCardProps) => {
  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <HRCard
          cardClassName="p-6 border-none rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          cardContentClassName="grid grid-cols-4 gap-4 p-0"
        >
          {data.map((items) => (
            <HRCard
              key={items.id}
              cardClassName="p-4 border border-border rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              cardContentClassName="flex flex-col gap-4 p-0"
            >
              <div className="flex justify-between">
                <Network className="w-8 h-8 text-black font-normal" />
                <div className="flex gap-3">
                  <Can action="update" subject={PERM_SUBJECTS.HR_BRANCHES}>
                    <button
                      type="button"
                      aria-label="Edit branch"
                      className="w-6 h-6 flex items-center justify-center rounded-sm bg-muted p-1 cursor-pointer hover:bg-muted/80"
                      onClick={() => onEdit?.(items)}
                    >
                      <Edit className="w-4 h-4 text-black font-bold" />
                    </button>
                  </Can>
                  <Can action="delete" subject={PERM_SUBJECTS.HR_BRANCHES}>
                    <button
                      type="button"
                      aria-label="Delete branch"
                      className="w-6 h-6 flex items-center justify-center rounded-sm bg-chart-3 p-1 cursor-pointer hover:bg-chart-3/80"
                      onClick={() => onDelete?.(items.id)}
                    >
                      <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
                    </button>
                  </Can>
                </div>
              </div>
              <div className="flex flex-col text-[16px] leading-6">
                <span className="text-foreground font-medium">
                  {items.branch}
                </span>
                <span className="text-card-text font-normal">
                  {items.location}
                </span>
                <span className="text-secondary-foreground font-normal">
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
