import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// LeaveRequest — an employee's request for leave. Used by both the
// admin "Leave Requests" view and the personal "My Requests" view
// (which filters by employee).
// ---------------------------------------------------------------------------

export const leaveRequestStatusEnum = z.enum([
  'pending',
  'approved',
  'rejected',
]);

export type LeaveRequestStatus = z.infer<typeof leaveRequestStatusEnum>;

export const leaveRequestSchema = z.object({
  id: idSchema,
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  branch: z.string().optional(),
  /** Leave-type name, e.g. "Annual Leave". References `LeaveType.name`. */
  type: z.string().min(1),
  /** ISO start date YYYY-MM-DD. */
  fromDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  /** ISO end date YYYY-MM-DD. */
  toDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  /** Total leave days requested (inclusive of both endpoints). */
  totalDays: z.number().int().min(1),
  reason: z.string().min(1).max(1000),
  status: leaveRequestStatusEnum,
  ...timestampsSchema.shape,
});

export type LeaveRequest = z.infer<typeof leaveRequestSchema>;

export const createLeaveRequestSchema = leaveRequestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateLeaveRequestInput = z.infer<typeof createLeaveRequestSchema>;

export const updateLeaveRequestSchema = createLeaveRequestSchema.partial();

export type UpdateLeaveRequestInput = z.infer<typeof updateLeaveRequestSchema>;

export const leaveRequestFiltersSchema = z.object({
  search: z.string().optional(),
  employeeId: z.string().optional(),
  branch: z.string().optional(),
  type: z.string().optional(),
  status: leaveRequestStatusEnum.optional(),
});

export type LeaveRequestFilters = z.infer<typeof leaveRequestFiltersSchema>;
