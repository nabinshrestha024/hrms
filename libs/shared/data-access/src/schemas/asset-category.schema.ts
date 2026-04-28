import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// AssetCategory — a category of tracked assets (Electronics, Vehicle,
// Furniture, IT Equipment, Cleanliness).
// ---------------------------------------------------------------------------

/**
 * Visual category key used to resolve a Lucide icon at render time.
 * The actual icon lives in the feature layer (see `assets-management/category/asset-category-icon.ts`)
 * so the schema stays JSON-serialisable.
 */
export const assetCategoryIconKeyEnum = z.enum([
  'electronics',
  'furniture',
  'vehicle',
  'it-equipment',
  'cleanliness',
]);

export type AssetCategoryIconKey = z.infer<typeof assetCategoryIconKeyEnum>;

export const assetCategorySchema = z.object({
  id: idSchema,
  /** Display name, e.g. "IT Equipment". Unique per tenant. */
  name: z.string().min(1).max(100),
  iconKey: assetCategoryIconKeyEnum,
  /**
   * Cached count of assets in this category. Stored rather than derived
   * because the legacy card shows it directly; a future task can switch
   * to deriving from `Asset` aggregates.
   */
  assetCount: z.number().int().min(0).default(0),
  /** Sample asset names shown on the category card preview. */
  exampleAssets: z.array(z.string().min(1)).default([]),
  ...timestampsSchema.shape,
});

export type AssetCategory = z.infer<typeof assetCategorySchema>;

export const createAssetCategorySchema = assetCategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAssetCategoryInput = z.infer<
  typeof createAssetCategorySchema
>;

export const updateAssetCategorySchema = createAssetCategorySchema.partial();

export type UpdateAssetCategoryInput = z.infer<
  typeof updateAssetCategorySchema
>;

export const assetCategoryFiltersSchema = z.object({
  search: z.string().optional(),
});

export type AssetCategoryFilters = z.infer<typeof assetCategoryFiltersSchema>;
