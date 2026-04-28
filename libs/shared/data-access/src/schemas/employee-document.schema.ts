import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// EmployeeDocument — an uploaded document associated with an employee.
// Powers the document-management/visibility page.
// ---------------------------------------------------------------------------

export const employeeDocumentSchema = z.object({
  id: idSchema,
  /** Display name of the document, e.g. "Tax Form W-4". */
  name: z.string().min(1),
  employeeName: z.string().min(1),
  /** Category name, references a `DocumentCategory.name` (free string for now). */
  category: z.string().min(1),
  /** Upload date, ISO YYYY-MM-DD. */
  uploadDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  /** Whether the document is visible to its employee. */
  visible: z.boolean(),
  ...timestampsSchema.shape,
});

export type EmployeeDocument = z.infer<typeof employeeDocumentSchema>;

export const createEmployeeDocumentSchema = employeeDocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateEmployeeDocumentInput = z.infer<
  typeof createEmployeeDocumentSchema
>;

export const updateEmployeeDocumentSchema =
  createEmployeeDocumentSchema.partial();

export type UpdateEmployeeDocumentInput = z.infer<
  typeof updateEmployeeDocumentSchema
>;

export const employeeDocumentFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  visible: z.boolean().optional(),
});

export type EmployeeDocumentFilters = z.infer<
  typeof employeeDocumentFiltersSchema
>;
