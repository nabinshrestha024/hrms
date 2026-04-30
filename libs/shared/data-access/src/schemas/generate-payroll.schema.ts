import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

export const generatePayrollSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "IT Equipment". Unique per tenant. */
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  department: z.string().min(1).max(100),

  /**
   * Cached count of assets in this category. Stored rather than derived
   * because the legacy card shows it directly; a future task can switch
   * to deriving from `Asset` aggregates.
   */
  basicSalary: z.coerce.number().nullable(),
  grossSalary: z.coerce.number().nullable(),

  absentDays: z.coerce.number().nullable(),
  lateMinutes: z.coerce.number().nullable(),
  overtimeHours: z.coerce.number().nullable(),
  ...timestampsSchema.shape,
});

export type GeneratePayroll = z.infer<typeof generatePayrollSchema>;

export const createGeneratePayrollSchema = generatePayrollSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateGeneratePayrollInput = z.infer<
  typeof createGeneratePayrollSchema
>;

export const updateGeneratePayrollSchema =
  createGeneratePayrollSchema.partial();

export type UpdateGeneratePayrollInput = z.infer<
  typeof updateGeneratePayrollSchema
>;

export const GeneratePayrollFiltersSchema = z.object({
  search: z.string().optional(),
  department: z.string().optional(),
});

export type GeneratePayrollFilters = z.infer<
  typeof GeneratePayrollFiltersSchema
>;
