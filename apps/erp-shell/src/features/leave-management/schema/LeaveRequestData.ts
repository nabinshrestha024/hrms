export const leaveRequestData = [
  {
    employeeId: 'E-001',
    employeeName: 'Aarav Sharma',
    branch: 'Kathmandu',
    type: 'Annual Leave',
    duration: '2026-04-10-2026-04-12',

    totalDays: 5,
    reason: 'Family vacation',
    status: 'Pending',
  },
  {
    employeeId: 'E-002',
    employeeName: 'Sita Gurung',
    branch: 'Pokhara',
    type: 'Sick Leave',
    duration: '2026-04-10-2026-04-12',

    totalDays: 3,
    reason: 'Flu and fever',
    status: 'Approved',
  },
  {
    employeeId: 'E-003',
    employeeName: 'Ramesh Koirala',
    branch: 'Biratnagar',
    type: 'Casual Leave',
    duration: '2026-04-10-2026-04-12',
    totalDays: 3,
    reason: 'Personal work',
    status: 'Rejected',
  },
  {
    employeeId: 'E-004',
    employeeName: 'Nisha Thapa',
    branch: 'Lalitpur',
    type: 'Maternity Leave',
    duration: '2026-05-01-2026-08-01',
    totalDays: 93,
    reason: 'Maternity leave',
    status: 'Approved',
  },
  {
    employeeId: 'E-005',
    employeeName: 'Kiran Adhikari',
    branch: 'Chitwan',
    type: 'Emergency Leave',
    duration: '2026-03-25-2026-03-27',
    totalDays: 3,
    reason: 'Family emergency',
    status: 'Pending',
  },
  {
    employeeId: 'E-006',
    employeeName: 'Pooja Rai',
    branch: 'Dharan',
    type: 'Annual Leave',
    duration: '2026-06-15-2026-06-20',
    totalDays: 6,
    reason: 'Travel plan',
    status: 'Approved',
  },
  {
    employeeId: 'E-007',
    employeeName: 'Bikash Shrestha',
    branch: 'Bhaktapur',
    type: 'Sick Leave',
    duration: '2026-03-18-2026-03-19',
    totalDays: 2,
    reason: 'Medical checkup',
    status: 'Rejected',
  },
];

export type LeaveRequest = {
  employeeId: string;
  employeeName: string;
  branch: string;
  type: string;
  duration: string;
  totalDays: number;
  reason: string;
  status: string;
};
