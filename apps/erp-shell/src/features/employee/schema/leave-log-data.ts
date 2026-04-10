export const leaveLogData = [
  {
    eventDate: '2026-02-28',
    description: 'Leave Added (Monthly Accrual)',
    days: '+1.5',
    runningBalance: '54.0',
  },
  {
    eventDate: '2026-01-28',
    description: 'Leave Added (Monthly Accrual)',
    days: '+1.5',
    runningBalance: '52.5',
  },
  {
    eventDate: '2025-12-31',
    description: 'Leave Added (Monthly Accrual)',
    days: '-1.0',
    runningBalance: '51.0',
  },
  {
    eventDate: '2025-11-28',
    description: 'Leave Added (Monthly Accrual)',
    days: '+1.5',
    runningBalance: '52.0',
  },
];

export type LeaveLog = {
  eventDate: string;
  description: string;
  days: string;
  runningBalance: string;
};
