import { ChartColumn, Clock4, FileText, TentTree } from 'lucide-react';

export const quickAccessData = [
  {
    id: 0,
    icon: TentTree,
    action: 'Leave Request',
    description: 'Request for leave',
  },
  {
    id: 1,
    icon: ChartColumn,
    action: 'Leave Balance',
    description: 'View Available Balance',
  },
  {
    id: 2,
    icon: Clock4,
    action: 'Time Request',
    description: 'Time Correction',
  },
  {
    id: 3,
    icon: FileText,
    action: 'OT Request',
    description: 'Overtime Claim',
  },
];
