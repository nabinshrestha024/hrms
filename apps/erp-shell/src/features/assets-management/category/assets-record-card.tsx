import { HRCard } from '@erp/ui';
import {
  Banknote,
  Computer,
  MonitorCheck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { IconButton } from '../../../components/icon-button';

// Top-of-page summary chrome. Values are placeholder display strings;
// a future task should compute them from `useAssets()` aggregates
// (counts by status, summed `value`). Inlined here so the legacy
// `schema/AssetsReportData.ts` could be deleted; this constant is
// local-only and not exported.
const assetsReportData: Array<{
  reportName: string;
  totalValue: string;
  icon: LucideIcon;
}> = [
  { reportName: 'Total Assets', totalValue: '25', icon: Computer },
  { reportName: 'Available Assets', totalValue: '02', icon: MonitorCheck },
  { reportName: 'Assigned Assets', totalValue: '23', icon: UserCheck },
  { reportName: 'Total Value', totalValue: '2,25,000', icon: Banknote },
];

export const AssetsRecordCard = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {assetsReportData.map((val) => {
        const Icon = val.icon;
        return (
          <HRCard
            key={val.reportName}
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
