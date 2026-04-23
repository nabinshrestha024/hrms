export const configurationleaveTypeData = [
  {
    leaveType: 'Annual Leave',
    days: 21,
    applicableTo: 'All',
    carryOver: 'Max 5',
    encashable: 'Max 10',
    paid: 'Yes',
  },
  {
    leaveType: 'Sick Leave',
    days: 12,
    applicableTo: 'All',
    carryOver: 'No',
    encashable: 'No',
    paid: 'Yes',
  },
  {
    leaveType: 'Maternity Leave',
    days: 90,
    applicableTo: 'Female',
    carryOver: 'No',
    encashable: 'No',
    paid: 'Yes',
  },
  {
    leaveType: 'Paternity Leave',
    days: 15,
    applicableTo: 'Male',
    carryOver: 'No',
    encashable: 'No',
    paid: 'Yes',
  },
];

export type ConfigurationLeaveType = {
  leaveType: string;
  days: number;
  applicableTo: string;
  carryOver: string;
  encashable: string;
  paid: string;
};
