import type { Employee } from '@erp/data-access';
import { Button, DropDown, HRCard } from '@erp/ui';
import { Dot, EllipsisVertical } from 'lucide-react';
import { InitialsCard } from '../../components/initial-avatar';

interface EmployeeCardProps {
  data: Employee[];
}

export const EmployeeCard = ({ data }: EmployeeCardProps) => {
  return (
    <>
      <div>
        <div className="px-6 pb-19.5 bg-background">
          <HRCard
            cardClassName="border-none p-6 rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
            cardContentClassName="grid grid-cols-3 gap-4 p-0"
          >
            {data.map((items) => {
              const fullName = `${items.firstName} ${items.lastName}`;
              const isActive = items.status === 'active';
              return (
                <HRCard
                  key={items.id}
                  cardClassName="relative p-4 border border-[#E4E4E7] rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                  cardContentClassName="flex flex-col gap-4 p-0"
                >
                  <div className="flex gap-2 items-center">
                    <InitialsCard name={fullName} className="w-12 h-12" />
                    <div className="flex-1 flex-col gap-2 text-[16px] leading-6 font-medium">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">{fullName}</span>
                        <DropDown
                          trigger={
                            <button>
                              <EllipsisVertical className="text-secondary-foreground" />
                            </button>
                          }
                          align="end"
                          className="pt-1 pb-0 px-0"
                        >
                          <div
                            className="w-full flex flex-col transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              type="button"
                              variant="default"
                              className="bg-white rounded-none text-foreground cursor-pointer text-[14px] font-normal leading-5"
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              variant="default"
                              className="bg-white rounded-none text-foreground cursor-pointer text-[14px] font-normal leading-5"
                            >
                              Block
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className="rounded-none border-t border-t-border text-badge-text-3 cursor-pointer text-[14px] font-normal leading-5"
                            >
                              Delete
                            </Button>
                          </div>
                        </DropDown>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-secondary-foreground">
                          {items.email}
                        </span>
                        <span className="text-secondary-foreground">
                          {items.designation}
                        </span>
                        <span
                          className={`flex items-center text-secondary-foreground ${
                            isActive ? 'text-badge-text-2' : ''
                          }`}
                        >
                          <Dot
                            className={`w-6 h-6 ${
                              isActive ? 'text-badge-text-2' : 'text-foreground'
                            }`}
                          />
                          {isActive ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </HRCard>
              );
            })}
          </HRCard>
        </div>
      </div>
    </>
  );
};
