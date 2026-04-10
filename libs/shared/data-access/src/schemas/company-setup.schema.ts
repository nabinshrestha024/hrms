import { z } from 'zod';

// ---------------------------------------------------------------------------
// Branch
// ---------------------------------------------------------------------------

export const branchStatusEnum = z.enum(['Active', 'Inactive']);
export type BranchStatus = z.infer<typeof branchStatusEnum>;

export const branchSchema = z.object({
  id: z.string(),
  branchId: z.string(),
  branch: z.string(),
  location: z.string(),
  contact: z.string(),
  status: branchStatusEnum,
  createdDate: z.string(),
});

export type Branch = z.infer<typeof branchSchema>;

export const createBranchSchema = branchSchema.omit({ id: true });
export type CreateBranchInput = z.infer<typeof createBranchSchema>;

export const updateBranchSchema = createBranchSchema.partial();
export type UpdateBranchInput = z.infer<typeof updateBranchSchema>;

export const branchFiltersSchema = z.object({
  branch: z.string().optional(),
  status: branchStatusEnum.optional(),
});
export type BranchFilters = z.infer<typeof branchFiltersSchema>;

// ---------------------------------------------------------------------------
// Department
// ---------------------------------------------------------------------------

export const departmentSchema = z.object({
  id: z.string(),
  department: z.string(),
  location: z.string(),
  code: z.string(),
});

export type Department = z.infer<typeof departmentSchema>;

export const createDepartmentSchema = departmentSchema.omit({ id: true });
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;

export const updateDepartmentSchema = createDepartmentSchema.partial();
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;
