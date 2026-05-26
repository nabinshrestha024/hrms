import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// DocumentTemplate — a reusable document template or fillable form
// employees can be assigned to complete.
// ---------------------------------------------------------------------------

export const documentTemplateKindEnum = z.enum(['file', 'template']);

export type DocumentTemplateKind = z.infer<typeof documentTemplateKindEnum>;

export const documentTemplateSchema = z.object({
  id: idSchema,
  /** Display name, e.g. "Company Policies", "Tax Docs". */
  name: z.string().min(1).max(100),
  /**
   * 'file' = a static uploaded file employees download/view.
   * 'template' = a fillable form template employees complete.
   * (Replaces the misnamed legacy `fileName` field whose value was
   * actually one of these two kinds.)
   */
  file: z.string().optional(),
  categroy: z.string().min(1).max(100),
  documentBody: z.string().min(1).optional(),
  kind: documentTemplateKindEnum,
  ...timestampsSchema.shape,
});

export type DocumentTemplate = z.infer<typeof documentTemplateSchema>;

export const createDocumentTemplateSchema = documentTemplateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateDocumentTemplateInput = z.infer<
  typeof createDocumentTemplateSchema
>;

export const updateDocumentTemplateSchema =
  createDocumentTemplateSchema.partial();

export type UpdateDocumentTemplateInput = z.infer<
  typeof updateDocumentTemplateSchema
>;

export const documentTemplateFiltersSchema = z.object({
  search: z.string().optional(),
  kind: documentTemplateKindEnum.optional(),
});

export type DocumentTemplateFilters = z.infer<
  typeof documentTemplateFiltersSchema
>;
