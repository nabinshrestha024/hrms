import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// DirectoryEntry — a denormalised employee record for the directory page.
//
// A future task can derive this from the `Employee` resource directly via
// `useEmployees()` instead of maintaining a separate collection. For
// Phase 2 it stays as its own resource so the migration is a 1:1 swap.
// ---------------------------------------------------------------------------

export const directoryEntrySchema = z.object({
  id: idSchema,
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  branch: z.string().min(1),
  department: z.string().min(1),
  designation: z.string().min(1),
  jobLevel: z.string().min(1),
  email: z.string().email(),
  contact: z.string().min(1),
  ...timestampsSchema.shape,
});

export type DirectoryEntry = z.infer<typeof directoryEntrySchema>;

export const createDirectoryEntrySchema = directoryEntrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateDirectoryEntryInput = z.infer<
  typeof createDirectoryEntrySchema
>;

export const updateDirectoryEntrySchema = createDirectoryEntrySchema.partial();

export type UpdateDirectoryEntryInput = z.infer<
  typeof updateDirectoryEntrySchema
>;

export const directoryEntryFiltersSchema = z.object({
  search: z.string().optional(),
  branch: z.string().optional(),
  department: z.string().optional(),
});

export type DirectoryEntryFilters = z.infer<typeof directoryEntryFiltersSchema>;
