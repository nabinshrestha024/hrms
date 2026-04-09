import z from 'zod';

export const addDepartmentSchema = z.object({
  departmentName: z.string().min(1, 'Department name is required'),
  departmentId: z.string().min(1, 'Department id is required'),
  status: z.string().min(1, 'Status is required'),
});

export type AddDepartmentFormValue = z.infer<typeof addDepartmentSchema>;
