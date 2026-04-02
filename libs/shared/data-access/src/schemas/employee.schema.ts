import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// Employee schema — single source of truth for the Employee type
// ---------------------------------------------------------------------------

export const employeeStatusEnum = z.enum(['active', 'inactive', 'on_leave']);
export type EmployeeStatus = z.infer<typeof employeeStatusEnum>;

export const employeeSchema = z.object({
  id: idSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string(),
  designation: z.string(),
  status: employeeStatusEnum,
  salary: z.number().min(0),
  startDate: z.string(),
  managerId: z.string().nullable().optional(),
  avatar: z.string().url().nullable().optional(),
  ...timestampsSchema.shape,
});

export type Employee = z.infer<typeof employeeSchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs — derived from the same schema, no duplication
// ---------------------------------------------------------------------------

export const createEmployeeSchema = employeeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;

// ---------------------------------------------------------------------------
// Employee list filters
// ---------------------------------------------------------------------------

export const employeeFiltersSchema = z.object({
  department: z.string().optional(),
  status: employeeStatusEnum.optional(),
  search: z.string().optional(),
});

export type EmployeeFilters = z.infer<typeof employeeFiltersSchema>;
