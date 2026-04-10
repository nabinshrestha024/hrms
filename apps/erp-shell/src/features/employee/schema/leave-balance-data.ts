export const leaveBalanceData = [
  {
    id: 0,
    leave: 'Annual Leave',
    day: 55,
    total: 57,
    used: 2,
  },
  {
    id: 1,
    leave: 'Sick Leave',
    day: 38,
    total: 30,
    used: 8,
  },
  {
    id: 2,
    leave: 'Mourning Leave',
    day: 5,
    total: 5,
    used: 0,
  },
];

export type leaveBalance = {
  id: number;
  leave: string;
  day: number;
  total: number;
  used: number;
};
