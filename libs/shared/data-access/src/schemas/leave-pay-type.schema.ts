import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// LeavePayType — a pay-status categorisation for leaves (e.g. "Fully Paid",
// "Not Paid", "Half Paid"). Distinct from the configuration "leave types"
// resource, which catalogues actual leave categories like Annual, Sick,
// or Casual; that one will land later in Phase 2.1 under its own name.
// ---------------------------------------------------------------------------

export const leavePayTypeSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "Fully Paid". Unique per tenant. */
  name: z.string().min(1).max(100),
  /**
   * Short code shown in tables and on payslips, e.g. "FP", "NP".
   * Two to six uppercase letters; uniqueness enforced at the API layer.
   */
  code: z
    .string()
    .min(2)
    .max(6)
    .regex(/^[A-Z]+$/, 'Code must be uppercase letters only'),
  /** Optional free-form description. */
  description: z.string().max(500).optional(),
  ...timestampsSchema.shape,
});

export type LeavePayType = z.infer<typeof leavePayTypeSchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createLeavePayTypeSchema = leavePayTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateLeavePayTypeInput = z.infer<typeof createLeavePayTypeSchema>;

export const updateLeavePayTypeSchema = createLeavePayTypeSchema.partial();

export type UpdateLeavePayTypeInput = z.infer<typeof updateLeavePayTypeSchema>;

// ---------------------------------------------------------------------------
// List filters (kept separate from `listParamsSchema` — see
// holiday-type.schema.ts for the rationale).
// ---------------------------------------------------------------------------

export const leavePayTypeFiltersSchema = z.object({
  search: z.string().optional(),
});

export type LeavePayTypeFilters = z.infer<typeof leavePayTypeFiltersSchema>;
