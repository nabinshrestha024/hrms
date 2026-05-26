import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// DocumentReview — a single uploaded-document review entry, used by the
// document-management/review-approval page.
// ---------------------------------------------------------------------------

export const documentReviewStatusEnum = z.enum([
  'pending',
  'accepted',
  'rejected',
]);

export type DocumentReviewStatus = z.infer<typeof documentReviewStatusEnum>;

export const documentReviewSchema = z.object({
  id: idSchema,
  fileName: z.string().min(1),
  /** Document type/category, e.g. "Passport IDs". */
  type: z.string().min(1),
  /** Display size, e.g. "3.2 MB". Kept as a free-form string for now. */
  size: z.string().min(1),
  /** Uploaded date, ISO YYYY-MM-DD. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  uploadedBy: z.string().min(1),
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  employeeDepartment: z.string().min(1),
  status: documentReviewStatusEnum,
  rejectedReason: z.string().max(1000).optional(),
  file: z.string(),
  ...timestampsSchema.shape,
});

export type DocumentReview = z.infer<typeof documentReviewSchema>;

export const createDocumentReviewSchema = documentReviewSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateDocumentReviewInput = z.infer<
  typeof createDocumentReviewSchema
>;

export const updateDocumentReviewSchema = createDocumentReviewSchema.partial();

export type UpdateDocumentReviewInput = z.infer<
  typeof updateDocumentReviewSchema
>;

export const documentReviewFiltersSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  status: documentReviewStatusEnum.optional(),
});

export type DocumentReviewFilters = z.infer<typeof documentReviewFiltersSchema>;
