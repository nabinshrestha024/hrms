import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// MissingDocument — a per-employee record of which required documents
// have not yet been uploaded.
// ---------------------------------------------------------------------------

export const documentPriorityEnum = z.enum(['high', 'medium', 'low']);

export type DocumentPriority = z.infer<typeof documentPriorityEnum>;

export const missingDocumentSchema = z.object({
  id: idSchema,
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  department: z.string().min(1),
  branch: z.string().min(1),
  /** Names of the documents the employee has not yet uploaded. */
  missingDocs: z.array(z.string().min(1)).default([]),
  priority: documentPriorityEnum,
  ...timestampsSchema.shape,
});

export type MissingDocument = z.infer<typeof missingDocumentSchema>;

export const createMissingDocumentSchema = missingDocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateMissingDocumentInput = z.infer<
  typeof createMissingDocumentSchema
>;

export const updateMissingDocumentSchema =
  createMissingDocumentSchema.partial();

export type UpdateMissingDocumentInput = z.infer<
  typeof updateMissingDocumentSchema
>;

export const missingDocumentFiltersSchema = z.object({
  search: z.string().optional(),
  department: z.string().optional(),
  branch: z.string().optional(),
  priority: documentPriorityEnum.optional(),
});

export type MissingDocumentFilters = z.infer<
  typeof missingDocumentFiltersSchema
>;
