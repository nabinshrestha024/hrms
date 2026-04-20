import { HRCard } from '@erp/ui';
import { assetsReportData } from '../schema/AssetsReportData';
import { IconButton } from '../../../components/icon-button';

export const AssetsRecordCard = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {assetsReportData.map((val, index) => {
        const Icon = val.icon;
        return (
          <HRCard
            key={index}
            cardClassName="p-6 border-l-4 border-r border-b border-t border-[#615FFF] rounded-xl shadow-sm bg-[#FFF]"
            cardContentClassName=" p-0 flex justify-betweem"
          >
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
                  {val.reportName}
                </span>
                <span className="text-[32px] font-normal leading-normal text-secondary">
                  {val.totalValue}
                </span>
              </div>
            </div>
            <IconButton variant="request">
              <Icon className="w-4 h-4 " />
            </IconButton>
          </HRCard>
        );
      })}
    </div>
  );
};
