import { HRCard } from '@erp/ui';
import { IconButton } from '../../../components/icon-button';
import { generatePayrollData } from '../schema/GeneratePayrollData';

export const GeneratePayrollCard = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {generatePayrollData.map((val, index) => {
        const Icon = val.icon;
        return (
          <HRCard
            key={index}
            cardClassName="p-6 border-l-4 border-r border-b border-t border-[#615FFF] rounded-xl shadow-sm bg-[#FFF]"
            cardContentClassName=" p-0 flex justify-betweem"
          >
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-medium leading-4 text-text-1">
                    {val.name}
                  </span>
                  <span className="text-[24px] font-normal leading-normal text-badge-text-8">
                    {val.amount}
                  </span>
                </div>
                <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
                  {val.description}
                </span>
              </div>
            </div>
            <IconButton
              variant="request"
              className="text-badge-text-8 bg-chart-7"
            >
              <Icon className="w-4 h-4 font-bold" />
            </IconButton>
          </HRCard>
        );
      })}
    </div>
  );
};
