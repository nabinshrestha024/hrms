import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// JobLevel — a tier in the organisation hierarchy (e.g. "VP", "Senior").
// Referenced by `Employee.jobLevel`.
// ---------------------------------------------------------------------------

export const jobLevelSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "VP", "Senior Engineer". Unique per tenant. */
  name: z.string().min(1).max(100),
  /** Optional summary of the responsibilities at this level. */
  description: z.string().max(500).optional(),
  /**
   * Position in the org chart, 1 = top. Used to sort lists from senior
   * to junior. Should be unique per tenant; uniqueness is enforced at
   * the API layer rather than the schema (Zod can't validate cross-row).
   */
  rank: z.number().int().min(1).max(999),
  ...timestampsSchema.shape,
});

export type JobLevel = z.infer<typeof jobLevelSchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createJobLevelSchema = jobLevelSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateJobLevelInput = z.infer<typeof createJobLevelSchema>;

export const updateJobLevelSchema = createJobLevelSchema.partial();

export type UpdateJobLevelInput = z.infer<typeof updateJobLevelSchema>;

// ---------------------------------------------------------------------------
// List filters (kept separate from `listParamsSchema` — see
// holiday-type.schema.ts for the rationale).
// ---------------------------------------------------------------------------

export const jobLevelFiltersSchema = z.object({
  search: z.string().optional(),
});

export type JobLevelFilters = z.infer<typeof jobLevelFiltersSchema>;
