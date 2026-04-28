import { Mail, Phone } from 'lucide-react';
import { InitialsCard } from '../../components/initial-avatar';
import { DirectoriesType } from './schema/Directories';
import { HRCard } from '@erp/ui';

export const DirectoriesCard = ({ data }: { data: DirectoriesType[] }) => {
  return (
    <div className="px-6 pb-19.5 bg-background">
      <HRCard
        cardClassName="p-6 border-none rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
        cardContentClassName="grid grid-cols-3 gap-4 p-0"
      >
        {data.map((item) => {
          return (
            <div className="flex flex-col gap-3 shadow-sm border border-border rounded-[12px] p-4">
              <div className="flex gap-3 items-center">
                <InitialsCard
                  name={item.employeeName}
                  className="bg-foreground"
                />
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-foreground">
                    {item.employeeName}
                  </span>
                  <span className="text-[14px] font-semibold text-secondary-foreground">
                    {item.designation}
                  </span>
                </div>
              </div>
              <div className="text-secondary-foreground text-[14px] leading-5 font-medium flex flex-col gap-1">
                <span className="flex gap-2 items-center">
                  <Mail className="w-4 h-4" /> {item.email}
                </span>
                <span className="flex gap-2 items-center">
                  <Phone className="w-4 h-4" /> {item.contact}
                </span>
              </div>
            </div>
          );
        })}
      </HRCard>
    </div>
  );
};
