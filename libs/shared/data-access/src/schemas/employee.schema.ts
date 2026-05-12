import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// Employee schema — single source of truth for the Employee type
// ---------------------------------------------------------------------------

export const employeeStatusEnum = z.enum(['active', 'inactive', 'on_leave']);
export type EmployeeStatus = z.infer<typeof employeeStatusEnum>;

export const employeeSchema = z.object({
  id: idSchema,

  // Identity
  employeeId: z.string().optional(),
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  avatar: z.string().url().nullable().optional(),

  // Address
  country: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  municipality: z.string().optional(),
  ward: z.string().optional(),
  address: z.string().optional(),

  // Emergency contact
  emergencyContact: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelation: z.string().optional(),

  // Work information
  branch: z.string().optional(),
  department: z.string(),
  designation: z.string(),
  jobLevel: z.string().optional(),
  shift: z.string().optional(),
  workType: z.string().optional(),
  employeeType: z.string().optional(),
  workPhone: z.string().optional(),
  workEmail: z.string().optional(),
  managerId: z.string().nullable().optional(),
  startDate: z.string(),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),

  // Compensation
  status: employeeStatusEnum,
  salary: z.number().min(0),
  grossSalary: z.number().optional(),
  basicSalary: z.number().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankAccountName: z.string().optional(),

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
  branch: z.string().optional(),
  status: employeeStatusEnum.optional(),
  search: z.string().optional(),
});

export type EmployeeFilters = z.infer<typeof employeeFiltersSchema>;
