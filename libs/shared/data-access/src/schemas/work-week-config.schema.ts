import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';
import { weekdayEnum } from './shift.schema';

// ---------------------------------------------------------------------------
// WorkWeekConfig — a tenant-scoped *singleton* settings record describing
// the working week, weekend policy, payroll cycle and overtime rules.
//
// Singleton semantics: there is at most one record per tenant. The HTTP
// shape is GET / PATCH on `/api/work-week-config` (no list, no create,
// no delete).
// ---------------------------------------------------------------------------

export const weekendPolicyEnum = z.enum([
  'full-weekend-off',
  'public-holiday-off',
]);

export type WeekendPolicy = z.infer<typeof weekendPolicyEnum>;

export const workingDayEntrySchema = z.object({
  day: weekdayEnum,
  type: z.enum(['full', 'half']),
});

export type WorkingDayEntry = z.infer<typeof workingDayEntrySchema>;

export const overtimeMultipliersSchema = z.object({
  /** Multiplier applied to regular OT hours (e.g. 1.5). */
  regular: z.number().min(0).max(10).optional(),
  /** Multiplier applied on weekends. */
  weekend: z.number().min(0).max(10).optional(),
  /** Multiplier applied on holidays. */
  holiday: z.number().min(0).max(10).optional(),
});

export type OvertimeMultipliers = z.infer<typeof overtimeMultipliersSchema>;

export const workWeekConfigSchema = z.object({
  id: idSchema,
  /** Day the week starts on. */
  weekStarts: weekdayEnum,
  /** How weekends are handled in attendance accounting. */
  weekendPolicy: weekendPolicyEnum,
  /** Day of month the payroll cycle begins (1-31). */
  payrollCycleStartDay: z.number().int().min(1).max(31),
  /** Day of month the payroll cycle ends (1-31). */
  payrollCycleEndDay: z.number().int().min(1).max(31),
  /** Working days, with optional half-day flag per day. */
  workingDays: z.array(workingDayEntrySchema).min(1),
  /** Minimum hours per working day. */
  minHoursPerDay: z.number().min(0).max(24),
  /** Maximum hours per working day. */
  maxHoursPerDay: z.number().min(0).max(24),
  /** Master switch for overtime tracking. */
  overtimeEnabled: z.boolean(),
  /** Per-context overtime multipliers; only meaningful when enabled. */
  overtime: overtimeMultipliersSchema,
  ...timestampsSchema.shape,
});

export type WorkWeekConfig = z.infer<typeof workWeekConfigSchema>;

// ---------------------------------------------------------------------------
// Update DTO — singleton has no Create or Delete; PATCH may carry any
// subset of the fields.
// ---------------------------------------------------------------------------

export const updateWorkWeekConfigSchema = workWeekConfigSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

export type UpdateWorkWeekConfigInput = z.infer<
  typeof updateWorkWeekConfigSchema
>;
