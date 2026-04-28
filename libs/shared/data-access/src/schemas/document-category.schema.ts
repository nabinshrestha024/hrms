import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// DocumentCategory — a category of employee documents (e.g. "Company
// Policies", "Tax Docs", "Personal IDs").
// ---------------------------------------------------------------------------

export const documentCategorySchema = z.object({
  id: idSchema,
  /** Display name, e.g. "Tax Docs". Unique per tenant. */
  name: z.string().min(1).max(100),
  /**
   * Cached count of documents in this category. Stored rather than
   * derived because the legacy table shows it directly; a future task
   * can switch to deriving from `EmployeeDocument` aggregates.
   */
  documentCount: z.number().int().min(0).default(0),
  ...timestampsSchema.shape,
});

export type DocumentCategory = z.infer<typeof documentCategorySchema>;

export const createDocumentCategorySchema = documentCategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateDocumentCategoryInput = z.infer<
  typeof createDocumentCategorySchema
>;

export const updateDocumentCategorySchema =
  createDocumentCategorySchema.partial();

export type UpdateDocumentCategoryInput = z.infer<
  typeof updateDocumentCategorySchema
>;

export const documentCategoryFiltersSchema = z.object({
  search: z.string().optional(),
});

export type DocumentCategoryFilters = z.infer<
  typeof documentCategoryFiltersSchema
>;
