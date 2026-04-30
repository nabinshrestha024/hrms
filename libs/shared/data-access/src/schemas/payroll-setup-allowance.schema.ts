import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

export const allowanceStatusEnum = z.enum(['True', 'False']);
export const allowanceTypeEnum = z.enum([
  'Taxable',
  'Non-Taxable',
  'Partially Taxable',
]);

export const allowanceSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "IT Equipment". Unique per tenant. */
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(100),
  type: allowanceTypeEnum,
  description: z.string(),

  /**
   * Cached count of assets in this category. Stored rather than derived
   * because the legacy card shows it directly; a future task can switch
   * to deriving from `Asset` aggregates.
   */
  calculation: z.string().min(1).max(100),
  taxExemptLimit: z.string(),

  active: allowanceStatusEnum,
  ...timestampsSchema.shape,
});

export type Allowance = z.infer<typeof allowanceSchema>;

export const createAllowanceSchema = allowanceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAllowanceInput = z.infer<typeof createAllowanceSchema>;

export const updateAllowanceSchema = createAllowanceSchema.partial();

export type UpdateAllowanceInput = z.infer<typeof updateAllowanceSchema>;

export const allowanceFiltersSchema = z.object({
  search: z.string().optional(),
});

export type AllowanceFilters = z.infer<typeof allowanceFiltersSchema>;
