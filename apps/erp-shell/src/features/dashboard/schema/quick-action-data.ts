import { ChartColumn, Clock4, FileText, TentTree } from 'lucide-react';
import { AddLeaveRequestForm } from '../../attendance/my-attendance/add-leave-request-form';
import { AddTimeRequestForm } from '../../attendance/my-attendance/add-time-request-form';

export const quickAccessData = [
  {
    id: 0,
    icon: TentTree,
    action: 'Leave Request',
    description: 'Request for leave',
    type: 'dialog',
    dialog: {
      title: 'Add Leave Request',
      formId: 'add-leave-request-form',
      component: AddLeaveRequestForm,
      componentClassName: 'py-4 pl-4 pr-2',
    },
  },
  {
    id: 1,
    icon: ChartColumn,
    action: 'Leave Balance',
    description: 'View Available Balance',
    path: '/leave-management/leave-balance',
  },
  {
    id: 2,
    icon: Clock4,
    action: 'Time Request',
    description: 'Time Correction',
    type: 'dialog',
    dialog: {
      title: 'Add Time Request',
      component: AddTimeRequestForm,
      formId: 'add-time-request-form',
      dialogClassName: 'sm:max-w-[709px]',
      componentClassName: 'py-4 pl-4 pr-2',
    },
  },
  {
    id: 3,
    icon: FileText,
    action: 'OT Request',
    description: 'Overtime Claim',
    path: '/attendance/my-attendance',
  },
];
