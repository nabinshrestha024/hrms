import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// Shift — a working-shift definition (e.g. "Morning Shift" 06:00-14:00).
// Referenced by Employee.shift.
// ---------------------------------------------------------------------------

/**
 * Visual / icon category used by the shift list and cards. The actual
 * `LucideIcon` is resolved at the render layer via a small mapping so
 * the schema remains JSON-serialisable.
 */
export const shiftTypeEnum = z.enum([
  'Morning',
  'Day',
  'Evening',
  'Night',
  'Flexible',
]);

export type ShiftTypeKind = z.infer<typeof shiftTypeEnum>;

/** HH:MM 24-hour time string. */
const hhmm = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be HH:MM (24-hour)');

/** ISO weekday key. */
export const weekdayEnum = z.enum([
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
]);

export type Weekday = z.infer<typeof weekdayEnum>;

export const shiftSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "Morning Shift". Unique per tenant. */
  name: z.string().min(1).max(100),
  /**
   * Short uppercase code, e.g. "MS", "DS". Two to six uppercase letters.
   * Uniqueness enforced at the API layer.
   */
  code: z
    .string()
    .min(2)
    .max(6)
    .regex(/^[A-Z]+$/, 'Code must be uppercase letters only'),
  shiftType: shiftTypeEnum,
  /** Shift start, 24-hour HH:MM. */
  startTime: hhmm,
  /** Shift end, 24-hour HH:MM. */
  endTime: hhmm,
  /** Break length in minutes. */
  breakMinutes: z.number().int().min(0).max(480),
  /** Grace period for late arrival, in minutes. */
  gracePeriodMinutes: z.number().int().min(0).max(120),
  /**
   * Hours after which work counts as overtime. Optional — when omitted,
   * tenants fall back to a global default.
   */
  overtimeAfterHours: z.number().min(0).max(24).optional(),
  /** Late-in threshold in minutes. */
  lateInMinutes: z.number().int().min(0).max(240).optional(),
  /** Early-out threshold in minutes. */
  earlyOutMinutes: z.number().int().min(0).max(240).optional(),
  /** Days of the week this shift runs. */
  applicableDays: z.array(weekdayEnum).min(1),
  /** When false, the shift is hidden from new-employee selection but kept for history. */
  isActive: z.boolean(),
  /** Marked as the default shift for new employees. At most one per tenant. */
  isDefault: z.boolean(),
  ...timestampsSchema.shape,
});

export type Shift = z.infer<typeof shiftSchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createShiftSchema = shiftSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateShiftInput = z.infer<typeof createShiftSchema>;

export const updateShiftSchema = createShiftSchema.partial();

export type UpdateShiftInput = z.infer<typeof updateShiftSchema>;

// ---------------------------------------------------------------------------
// List filters (kept separate from `listParamsSchema` — see
// holiday-type.schema.ts for the rationale).
// ---------------------------------------------------------------------------

export const shiftFiltersSchema = z.object({
  search: z.string().optional(),
  shiftType: shiftTypeEnum.optional(),
  isActive: z.boolean().optional(),
});

export type ShiftFilters = z.infer<typeof shiftFiltersSchema>;
