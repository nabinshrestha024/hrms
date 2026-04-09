import z from 'zod';

export const employeeDetailsSchema = z.object({
  branch: z.string().min(1, 'Branch is required'),
  department: z.string().min(1, 'Department is required'),
  employeeId: z.coerce.number().min(1, 'Employee ID is required'),
  designation: z.string().min(1, 'Designation is required'),
  jobLevel: z.string().min(1, 'Job level is required'),
  reportingManager: z.string().min(1, 'Reporting manager is required'),

  shift: z.string().min(1, 'Shift is required'),
  workType: z.string().min(1, 'Work type is required'),
  employeeType: z.string().min(1, 'Employee type is required'),

  workEmail: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s]+@[^\s]+\.[^\s]+$/, 'Invalid email address'),
  workPhoneNumber: z
    .string()
    .min(10, 'Phone number must be atleast 10 digit')
    .regex(/^[0-9]+$/, 'Phone number can only contain digits'),

  joiningDate: z.coerce.date().min(1, 'Date is required'),
  contractStartDate: z.coerce.date().min(1, 'Date is required'),
  contractEndDate: z.coerce.date().min(1, 'Date is required'),
});

export type EmployeeDetailsFormValue = z.infer<typeof employeeDetailsSchema>;
