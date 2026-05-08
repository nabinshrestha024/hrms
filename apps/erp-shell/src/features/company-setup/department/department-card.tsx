import { Can, PERM_SUBJECTS } from '@erp/auth';
import { HRCard } from '@erp/ui';
import { Edit, Network, Trash2 } from 'lucide-react';
import type { Department as DepartmentType } from '@erp/data-access';
import { IconButton } from '../../../components/icon-button';

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
      <div className="px-3 lg:px-6 pb-19.5 bg-background">
        <HRCard
          cardClassName="p-3 lg:p-6 border-none rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          cardContentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-0"
        >
          {data.length > 0 ? (
            <>
              {data.map((items) => (
                <HRCard
                  key={items.id}
                  cardClassName="p-4 border border-border rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] cursor-pointer"
                  cardContentClassName="flex flex-col gap-4 p-0"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-primary p-1">
                      <Network className="w-4 h-4 text-white font-normal" />
                    </div>
                    <div className="flex gap-2">
                      <Can
                        action="update"
                        subject={PERM_SUBJECTS.HR_DEPARTMENTS}
                      >
                        <IconButton
                          type="button"
                          variant="default"
                          tooltip="Edit"
                          aria-label="Edit department"
                          className="w-6 h-6 flex items-center justify-center rounded-sm bg-muted p-1 cursor-pointer hover:bg-muted/80"
                          onClick={() => onEdit?.(items)}
                        >
                          <Edit className="w-4 h-4 text-black font-bold" />
                        </IconButton>
                      </Can>
                      <Can
                        action="delete"
                        subject={PERM_SUBJECTS.HR_DEPARTMENTS}
                      >
                        <IconButton
                          type="button"
                          variant="destructive"
                          tooltip="Delete"
                          aria-label="Delete department"
                          className="w-6 h-6 flex items-center justify-center rounded-sm bg-chart-3 p-1 cursor-pointer hover:bg-chart-3/80"
                          onClick={() => onDelete?.(items.id)}
                        >
                          <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
                        </IconButton>
                      </Can>
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
            </>
          ) : (
            <div className="text-center text-foreground text-[20px] font-medium">
              Data Not Found
            </div>
          )}
        </HRCard>
      </div>
    </>
  );
};
