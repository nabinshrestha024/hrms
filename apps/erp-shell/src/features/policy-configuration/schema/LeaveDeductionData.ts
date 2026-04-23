export const leaveDeductionData = [
  {
    leaveTitle: 'Exclude Public Holidays from Leave Count',
    leaveSubTitle:
      'Holidays from the Mater Holiday Calendar will be automatically excluded',
    example: [
      'Dashain holidays:  Tuesday to Friday (4 days)',
      'Employee applies:   Monday to Saturday (6 days)',
      'System deducts: 2 days only (Monday + Saturday)',
    ],
  },
  {
    leaveTitle: 'Exlude Weekly Offs Working Days',
    leaveSubTitle:
      'Weekly off days (Saturday/Sunday) within leave period won’t be deducted unless Sandwich Rule applies',
    badge: 'Subject to Sandwich Rule',
  },
  {
    leaveTitle: 'Auto-Calculate Working Days',
    leaveSubTitle:
      'Automatically calculate actual working days when processing leave requests',
  },
];

export type LeaveDeductionData = {
  leaveTitle: string;
  subLeaveTitle: string;
  example?: string[];
  badge?: string;
};
