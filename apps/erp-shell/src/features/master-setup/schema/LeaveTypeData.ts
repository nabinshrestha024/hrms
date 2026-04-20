export const leaveTypeData = [
  {
    leavetype: 'Fully Paid',
    code: 'FP',
    details: 'Leave with full salary benefit',
  },
  {
    leavetype: 'Not Paid',
    code: 'NP',
    details: 'Leave without salary (Leave Without Pay)',
  },
];

export type leaveTypeDataType = {
  leavetype: string;
  code: string;
  details: string;
};
