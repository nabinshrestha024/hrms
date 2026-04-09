export const attendanceRecord = [
  {
    date: '2026-03-01',
    day: 'Sunday',
    status: true,
    checkIn: '09:00 AM',
    checkout: '06:00 PM',
    workingHours: '9h 0m',
    late: 0,
    earlyLeave: 0,
    otIn: '06:30 PM',
    otOut: '08:00 PM',
    overtime: '1h 30m',
    event: '—',
    remarks: 'On time',
  },
  {
    date: '2026-03-02',
    day: 'Monday',
    status: true,
    checkIn: '09:20 AM',
    checkout: '06:00 PM',
    workingHours: '8h 40m',
    late: 20,
    earlyLeave: 0,
    otIn: '',
    otOut: '',
    overtime: '0h 0m',
    event: '—',
    remarks: 'Late arrival',
  },
  {
    date: '2026-03-03',
    day: 'Tuesday',
    status: false,
    checkIn: '',
    checkout: '',
    workingHours: '0h 0m',
    late: 0,
    earlyLeave: 0,
    otIn: '',
    otOut: '09:30 PM',
    overtime: '0h 0m',
    event: 'Leave',
    remarks: 'Sick leave',
  },
  {
    date: '2026-03-04',
    day: 'Wednesday',
    status: true,
    checkIn: '08:55 AM',
    checkout: '05:30 PM',
    workingHours: '8h 35m',
    late: 0,
    earlyLeave: 30,
    otIn: '',
    otOut: '',
    overtime: '0h 0m',
    event: '—',
    remarks: 'Left early',
  },
  {
    date: '2026-03-05',
    day: 'Thursday',
    status: true,
    checkIn: '09:05 AM',
    checkout: '07:30 PM',
    workingHours: '10h 25m',
    late: 5,
    earlyLeave: 0,
    otIn: '06:00 PM',
    otOut: '07:30 PM',
    overtime: '1h 30m',
    event: 'Overtime',
    remarks: 'Extra work completed',
  },
];

export interface Attendance {
  date: string;
  day: string;
  status: boolean;
  checkIn: string;
  checkout: string;
  workingHours: string;
  late: number;
  earlyLeave: number;
  otIn: string;
  otOut: string;
  overtime: string;
  event: string;
  remarks: string;
}
