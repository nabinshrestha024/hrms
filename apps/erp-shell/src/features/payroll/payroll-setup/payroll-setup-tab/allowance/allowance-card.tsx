import { HRCard } from '@erp/ui';
import { Coins } from 'lucide-react';
import { IconButton } from '../../../../../components/icon-button';
import { allowanceCardData } from '../../../schema/AllowanceData';

export const AllowanceCard = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {allowanceCardData.map((val) => {
        return (
          <HRCard
            key={val.allowanceType}
            cardClassName="p-6 border-l-4 border-r border-b border-t border-outline rounded-xl shadow-sm bg-white"
            cardContentClassName=" p-0 flex justify-betweem"
          >
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
                  {val.allowanceType}
                </span>
                <span className="text-[32px] font-normal leading-normal text-secondary">
                  {val.size}
                </span>
              </div>
            </div>

            <IconButton variant="destructive">
              <Coins className="w-4 h-4 " />
            </IconButton>
          </HRCard>
        );
      })}
    </div>
  );
};
