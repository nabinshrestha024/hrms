import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// Asset — a tracked physical or digital asset (laptop, vehicle, furniture).
// ---------------------------------------------------------------------------

export const assetStatusEnum = z.enum([
  'available',
  'assigned',
  'maintenance',
  'retired',
]);

export type AssetStatus = z.infer<typeof assetStatusEnum>;

export const assetConditionEnum = z.enum(['excellent', 'good', 'fair', 'poor']);

export type AssetCondition = z.infer<typeof assetConditionEnum>;

export const assetSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "Dell Latitude 7420". */
  name: z.string().min(1).max(150),
  /** Category name (free string for now; references `AssetCategory.name`). */
  category: z.string().min(1),
  /** Manufacturer / inventory serial number. Unique per tenant. */
  serialNumber: z.string().min(1).max(50),
  status: assetStatusEnum,
  /** Employee name the asset is assigned to. `null` when status='available'. */
  assignedTo: z.string().nullable(),
  condition: assetConditionEnum,
  /** Purchase / replacement value in tenant currency. */
  value: z.number().min(0),
  /**
   * Assignment date (ISO YYYY-MM-DD). `null` when not assigned.
   * The legacy seed used empty string for unassigned — normalised to null.
   */
  assignedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')
    .nullable(),
  ...timestampsSchema.shape,
});

export type Asset = z.infer<typeof assetSchema>;

export const createAssetSchema = assetSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;

export const updateAssetSchema = createAssetSchema.partial();

export type UpdateAssetInput = z.infer<typeof updateAssetSchema>;

export const assetFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: assetStatusEnum.optional(),
  condition: assetConditionEnum.optional(),
});

export type AssetFilters = z.infer<typeof assetFiltersSchema>;
