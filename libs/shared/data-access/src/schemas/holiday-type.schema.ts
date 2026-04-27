import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// HolidayType — a category of holiday in master-setup (e.g. "National
// Holiday", "Regional Holiday", "Floating Holiday"). The actual calendar
// dates live in the separate `holidays` resource (configuration/holidays).
// ---------------------------------------------------------------------------

export const holidayTypeSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "National Holiday". Unique per tenant. */
  name: z.string().min(1).max(100),
  /** Free-form description shown in the table and the edit form. */
  description: z.string().max(500).optional(),
  /**
   * Color used as the row indicator in lists. Hex (e.g. "#EF4444") or
   * any CSS color string. Validated as non-empty; format is enforced in
   * the form layer (color-radio widget) rather than the schema so older
   * seeds that used keyword colors ("purple") remain valid.
   */
  color: z.string().min(1),
  ...timestampsSchema.shape,
});

export type HolidayType = z.infer<typeof holidayTypeSchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createHolidayTypeSchema = holidayTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateHolidayTypeInput = z.infer<typeof createHolidayTypeSchema>;

export const updateHolidayTypeSchema = createHolidayTypeSchema.partial();

export type UpdateHolidayTypeInput = z.infer<typeof updateHolidayTypeSchema>;

// ---------------------------------------------------------------------------
// List filters
// (Pagination/sort live in `ListParams` — combine via intersection at the
// hook-signature level. Do NOT extend `listParamsSchema` here, or `z.infer`
// turns default-bearing fields into required keys and breaks callers like
// `useHolidayTypes({ pageSize: 100 })`.)
// ---------------------------------------------------------------------------

export const holidayTypeFiltersSchema = z.object({
  search: z.string().optional(),
});

export type HolidayTypeFilters = z.infer<typeof holidayTypeFiltersSchema>;
