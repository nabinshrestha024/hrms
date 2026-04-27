import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// Holiday — a single dated entry in the holiday calendar (configuration
// resource). Distinct from `HolidayType` (master-setup), which catalogues
// the *categories* a holiday can belong to.
// ---------------------------------------------------------------------------

export const holidaySchema = z.object({
  id: idSchema,
  /** Display name, e.g. "New Year's Day". */
  name: z.string().min(1).max(100),
  /**
   * ISO date string (YYYY-MM-DD). Storing only the date portion — no
   * time, no day-of-week (derive that at render time).
   */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  /**
   * Category label, matching a `HolidayType.name` from master-setup
   * (e.g. "National", "Regional", "Company", "Floating"). String for now;
   * once master-setup IDs are stable across tenants this will be a
   * proper reference.
   */
  type: z.string().min(1).max(100),
  /** Optional free-form description. */
  description: z.string().max(500).optional(),
  ...timestampsSchema.shape,
});

export type Holiday = z.infer<typeof holidaySchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createHolidaySchema = holidaySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateHolidayInput = z.infer<typeof createHolidaySchema>;

export const updateHolidaySchema = createHolidaySchema.partial();

export type UpdateHolidayInput = z.infer<typeof updateHolidaySchema>;

// ---------------------------------------------------------------------------
// List filters (kept separate from `listParamsSchema` — see
// holiday-type.schema.ts for the rationale).
// ---------------------------------------------------------------------------

export const holidayFiltersSchema = z.object({
  search: z.string().optional(),
  /** Filter by holiday type name (matches `Holiday.type`). */
  type: z.string().optional(),
  /** Filter by ISO year ("2026"). Matches the leading 4 chars of `date`. */
  year: z
    .string()
    .regex(/^\d{4}$/)
    .optional(),
});

export type HolidayFilters = z.infer<typeof holidayFiltersSchema>;
