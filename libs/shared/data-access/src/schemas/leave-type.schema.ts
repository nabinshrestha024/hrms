import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// LeaveType — a configurable leave category (Annual / Sick / Maternity ...).
//
// Distinct from `LeavePayType` (master-setup), which classifies leaves by
// pay status (Fully Paid / Half Paid / Not Paid). This resource describes
// what leaves an employee can take; the pay status is a separate axis.
// ---------------------------------------------------------------------------

/** Gender-eligibility for a leave category. */
export const leaveApplicableToEnum = z.enum(['all', 'female', 'male']);

export type LeaveApplicableTo = z.infer<typeof leaveApplicableToEnum>;

/**
 * Carry-over / encashment policy. `enabled: false` means the policy is off
 * (display "No"); when enabled, `maxDays` caps the value (display "Max N").
 */
export const leavePolicySchema = z.object({
  enabled: z.boolean(),
  maxDays: z.number().int().min(0).max(365).optional(),
});

export type LeavePolicy = z.infer<typeof leavePolicySchema>;

export const leaveTypeSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "Annual Leave". Unique per tenant. */
  name: z.string().min(1).max(100),
  /** Annual entitlement in days. */
  daysPerYear: z.number().int().min(0).max(365),
  applicableTo: leaveApplicableToEnum,
  /** Whether this leave is paid (true) or unpaid (false). */
  paid: z.boolean(),
  carryOver: leavePolicySchema,
  encashable: leavePolicySchema,
  /** Optional free-form description shown on edit. */
  description: z.string().max(500).optional(),
  ...timestampsSchema.shape,
});

export type LeaveType = z.infer<typeof leaveTypeSchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createLeaveTypeSchema = leaveTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateLeaveTypeInput = z.infer<typeof createLeaveTypeSchema>;

export const updateLeaveTypeSchema = createLeaveTypeSchema.partial();

export type UpdateLeaveTypeInput = z.infer<typeof updateLeaveTypeSchema>;

// ---------------------------------------------------------------------------
// List filters (kept separate from `listParamsSchema` — see
// holiday-type.schema.ts for the rationale).
// ---------------------------------------------------------------------------

export const leaveTypeFiltersSchema = z.object({
  search: z.string().optional(),
  applicableTo: leaveApplicableToEnum.optional(),
  paid: z.boolean().optional(),
});

export type LeaveTypeFilters = z.infer<typeof leaveTypeFiltersSchema>;
