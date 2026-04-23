import { LucideIcon, Moon, Sun, Sunrise, Sunset, Timer } from 'lucide-react';

export const shiftData = [
  {
    icon: Sunrise,
    title: 'Morning Shift',
    time: '6:00-2:00',
    graceTime: '15 min grace',
    code: 'MS',
    break: '30 min',
    workingHours: '7.5 hrs',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Active',
    numberOfEmployees: '08',
  },
  {
    icon: Sun,
    title: 'Day Shift',
    time: '09:00-18:00',
    graceTime: '15 min grace',
    code: 'DS',
    break: '60 min',
    workingHours: '8 hrs',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Active',
    numberOfEmployees: '24',
  },
  {
    icon: Sunset,
    title: 'Evening Shift',
    time: '14:00-22:00',
    graceTime: '15 min grace',
    code: 'ES',
    break: '30 min',
    workingHours: '7.5 hrs',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Active',
    numberOfEmployees: ' 12',
  },
  {
    icon: Moon,
    title: 'Night Shift',
    time: '22:00-06:00',
    graceTime: '15 min grace',
    code: 'NS',
    break: '30 min',
    workingHours: '7.5 hrs',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Active',
    numberOfEmployees: '0',
  },
  {
    icon: Timer,
    title: 'Flexible',
    time: '22:00-06:00',
    graceTime: '15 min grace',
    code: 'NS',
    break: '30 min',
    workingHours: '7.5 hrs',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Active',
    numberOfEmployees: '0',
  },
];
export type ShiftDataType = {
  icon: LucideIcon;
  title: string;
  time: string;
  graceTime: string;
  code: string;
  break: string;
  workingHours: string;
  days: string[];
  status: string;
  numberOfEmployees: string;
};
