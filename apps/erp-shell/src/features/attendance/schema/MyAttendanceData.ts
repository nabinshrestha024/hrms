import type { AttendanceRecord } from '@erp/data-access';

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

/** "HH:MM" -> total minutes; null/empty -> 0. */
const hhmmToMinutes = (v: string | null | undefined): number => {
  if (!v) return 0;
  const [h, m] = v.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

/**
 * Bridge canonical `AttendanceRecord` to the legacy `Attendance` shape used
 * by the "My Attendance" inner table (`oTIn`/`overtime`, capitalized status).
 * Removed in Phase 3.2.
 */
export const toMyAttendanceRecord = (r: AttendanceRecord): Attendance =>
  ({
    ...r,
    day: new Date(r.date).toLocaleDateString('en-US', { weekday: 'long' }),
    checkIn: r.checkIn ?? '',
    checkOut: r.checkOut ?? '',
    workingHour: r.workingHour ?? '0h 0m',
    late: hhmmToMinutes(r.late),
    earlyLeave: hhmmToMinutes(r.earlyLeave),
    oTIn: r.otIn ?? '',
    otOut: r.otOut ?? '',
    overtime: r.overtimeHours ?? '0h 0m',
    status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
  } as unknown as Attendance);
