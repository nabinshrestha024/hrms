export const attendanceRecord = [
  {
    date: '2026-03-01',
    day: 'Sunday',
    status: 'Off',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    workingHour: '9h 0m',
    late: 0,
    earlyLeave: 0,
    oTIn: '06:30 PM',
    otOut: '08:00 PM',
    overtime: '1h 30m',
    event: '—',
    remarks: 'On time',
  },
  {
    date: '2026-03-02',
    day: 'Monday',
    status: 'Present',
    checkIn: '09:20 AM',
    checkOut: '06:00 PM',
    workingHour: '8h 40m',
    late: 20,
    earlyLeave: 0,
    oTIn: '',
    otOut: '',
    overtime: '0h 0m',
    event: '—',
    remarks: 'Late arrival',
  },
  {
    date: '2026-03-03',
    day: 'Tuesday',
    status: 'Leave',
    checkIn: '',
    checkOut: '',
    workingHour: '0h 0m',
    late: 0,
    earlyLeave: 0,
    oTIn: '',
    otOut: '',
    overtime: '0h 0m',
    event: 'Leave',
    remarks: 'Sick leave',
  },
  {
    date: '2026-03-04',
    day: 'Wednesday',
    status: 'Present',
    checkIn: '08:55 AM',
    checkOut: '05:30 PM',
    workingHour: '8h 35m',
    late: 0,
    earlyLeave: 30,
    oTIn: '',
    otOut: '',
    overtime: '0h 0m',
    event: '—',
    remarks: 'Left early',
  },
  {
    date: '2026-03-05',
    day: 'Thursday',
    status: 'Present',
    checkIn: '09:05 AM',
    checkOut: '07:30 PM',
    workingHour: '10h 25m',
    late: 5,
    earlyLeave: 0,
    oTIn: '06:00 PM',
    otOut: '07:30 PM',
    overtime: '1h 30m',
    event: 'Overtime',
    remarks: 'Extra work completed',
  },
];

export interface Attendance {
  date: string;
  day: string;
  status: string;
  checkIn: string;
  checkOut: string;
  workingHour: string;
  late: number;
  earlyLeave: number;
  oTIn: string;
  otOut: string;
  overtime: string;
  event: string;
  remarks: string;
}
