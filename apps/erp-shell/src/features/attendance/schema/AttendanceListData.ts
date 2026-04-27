import type { AttendanceRecord } from '@erp/data-access';

export type AttendanceListRecord = {
  employeeId: string;
  employeeName: string;
  branch: string;

  workType: 'Office' | 'Remote' | 'Hybrid';
  employeeType: 'Full-Time' | 'Part-Time' | 'Contract';

  date: string;
  day: string;
  shift: string;

  checkIn: string | null;
  checkOut: string | null;
  workingHour: string | null;
  late: string | null;
  earlyLeave: string | null;

  OTIn: string | null;
  otOut: string | null;
  overTimeHours: string | null;

  event: string;
  remarks: string;
  status: string;
};

/**
 * Bridge canonical `AttendanceRecord` (lowercase `otIn`/`overtimeHours`,
 * lowercase status enum, no `day`) to the legacy `AttendanceListRecord`
 * shape that inner tables still type against. Removed in Phase 3.2.
 */
export const toAttendanceListRecord = (
  r: AttendanceRecord
): AttendanceListRecord =>
  ({
    ...r,
    day: new Date(r.date).toLocaleDateString('en-US', { weekday: 'long' }),
    OTIn: r.otIn,
    overTimeHours: r.overtimeHours,
    status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
  } as unknown as AttendanceListRecord);
