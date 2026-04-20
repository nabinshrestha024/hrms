import {
  Banknote,
  Computer,
  LucideIcon,
  MonitorCheck,
  UserCheck,
} from 'lucide-react';

export const assetsReportData = [
  {
    reportName: 'Total Assets',
    totalValue: '25',
    icon: Computer,
  },
  {
    reportName: 'Available Assets',
    totalValue: '02',
    icon: MonitorCheck,
  },
  {
    reportName: 'Assigned Assets',
    totalValue: '23',
    icon: UserCheck,
  },
  {
    reportName: 'Total Value',
    totalValue: '2,25,000',
    icon: Banknote,
  },
];

export type AssetsReport = {
  reportName: string;
  totalValue: string;
  icon: LucideIcon;
};
