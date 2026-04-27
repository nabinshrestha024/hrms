import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// AttendanceRecord — a single employee's attendance entry for a date.
// Used by both the all-employees attendance list and the per-employee
// "my attendance" view (which filters by employee).
// ---------------------------------------------------------------------------

export const attendanceStatusEnum = z.enum([
  'present',
  'absent',
  'leave',
  'holiday',
  'off',
]);

export type AttendanceStatus = z.infer<typeof attendanceStatusEnum>;

/** HH:MM 24-hour optional time. */
const hhmm = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be HH:MM')
  .nullable();

export const attendanceRecordSchema = z.object({
  id: idSchema,
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  branch: z.string().optional(),
  workType: z.enum(['Office', 'Remote', 'Hybrid']).optional(),
  employeeType: z.enum(['Full-Time', 'Part-Time', 'Contract']).optional(),
  /** ISO YYYY-MM-DD. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  shift: z.string().optional(),
  checkIn: hhmm,
  checkOut: hhmm,
  /** Worked time in HH:MM. Null when absent / on leave. */
  workingHour: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM')
    .nullable(),
  /** Late arrival in HH:MM ("00:00" when on time). */
  late: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM')
    .nullable(),
  /** Early-leave duration in HH:MM. */
  earlyLeave: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM')
    .nullable(),
  otIn: hhmm,
  otOut: hhmm,
  overtimeHours: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM')
    .nullable(),
  event: z.string().optional(),
  remarks: z.string().optional(),
  status: attendanceStatusEnum,
  ...timestampsSchema.shape,
});

export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;

export const createAttendanceRecordSchema = attendanceRecordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAttendanceRecordInput = z.infer<
  typeof createAttendanceRecordSchema
>;

export const updateAttendanceRecordSchema =
  createAttendanceRecordSchema.partial();

export type UpdateAttendanceRecordInput = z.infer<
  typeof updateAttendanceRecordSchema
>;

export const attendanceRecordFiltersSchema = z.object({
  search: z.string().optional(),
  employeeId: z.string().optional(),
  branch: z.string().optional(),
  status: attendanceStatusEnum.optional(),
  /** Filter by ISO month "YYYY-MM" (matches the leading 7 chars of `date`). */
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
});

export type AttendanceRecordFilters = z.infer<
  typeof attendanceRecordFiltersSchema
>;
