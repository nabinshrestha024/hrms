import { ChartColumn, Clock4, FileText, TentTree } from 'lucide-react';

export const quickAccessData = [
  {
    id: 0,
    icon: TentTree,
    action: 'Leave Request',
    description: 'Request for leave',
    path: '/dashboard',
  },
  {
    id: 1,
    icon: ChartColumn,
    action: 'Leave Balance',
    description: 'View Available Balance',
    path: '/dashboard',
  },
  {
    id: 2,
    icon: Clock4,
    action: 'Time Request',
    description: 'Time Correction',
    path: '/dashboard',
  },
  {
    id: 3,
    icon: FileText,
    action: 'OT Request',
    description: 'Overtime Claim',
    path: '/dashboard',
  },
];
