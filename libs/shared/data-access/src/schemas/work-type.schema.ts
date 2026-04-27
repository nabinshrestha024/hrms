import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// WorkType — a working-arrangement category (e.g. "On-site", "Remote",
// "Hybrid"). Referenced by `Employee.workType`.
// ---------------------------------------------------------------------------

export const workTypeSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "Hybrid". Unique per tenant. */
  name: z.string().min(1).max(100),
  /** Optional description shown in the table and edit form. */
  description: z.string().max(500).optional(),
  ...timestampsSchema.shape,
});

export type WorkType = z.infer<typeof workTypeSchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createWorkTypeSchema = workTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateWorkTypeInput = z.infer<typeof createWorkTypeSchema>;

export const updateWorkTypeSchema = createWorkTypeSchema.partial();

export type UpdateWorkTypeInput = z.infer<typeof updateWorkTypeSchema>;

// ---------------------------------------------------------------------------
// List filters (kept separate from `listParamsSchema` — see
// holiday-type.schema.ts for the rationale).
// ---------------------------------------------------------------------------

export const workTypeFiltersSchema = z.object({
  search: z.string().optional(),
});

export type WorkTypeFilters = z.infer<typeof workTypeFiltersSchema>;
