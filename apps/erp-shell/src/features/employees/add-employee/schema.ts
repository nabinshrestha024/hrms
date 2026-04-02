import { z } from 'zod';

export const addEmployeeSchema = z.object({
  // Step 1: Basic Details
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  personalEmail: z.string().min(1, 'Email is required').email('Invalid email'),
  phone: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  maritalStatus: z.string().min(1, 'Marital status is required'),
  country: z.string().min(1, 'Country is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'City is required'),
  municipality: z.string().min(1, 'Municipality is required'),
  ward: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  emergencyContact: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelation: z.string().optional(),

  // Step 2: Work Information
  branch: z.string().min(1, 'Branch is required'),
  department: z.string().min(1, 'Department is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  designation: z.string().min(1, 'Designation is required'),
  jobLevel: z.string().min(1, 'Job level is required'),
  reportingManager: z.string().optional(),
  shift: z.string().min(1, 'Shift is required'),
  workType: z.string().min(1, 'Work type is required'),
  employeeType: z.string().min(1, 'Employee type is required'),
  workPhone: z.string().optional(),
  workEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  joiningDate: z.string().min(1, 'Joining date is required'),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),

  // Step 3: Financial Information
  grossSalary: z.string().min(1, 'Gross salary is required'),
  basicSalary: z.string().min(1, 'Basic salary is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  bankAccountNumber: z.string().min(1, 'Account number is required'),
  bankAccountName: z.string().min(1, 'Account name is required'),
});

export type AddEmployeeInput = z.infer<typeof addEmployeeSchema>;

/** Fields to validate per step before allowing "Next" */
export const stepFields: (keyof AddEmployeeInput)[][] = [
  ['firstName', 'lastName', 'personalEmail', 'phone', 'dateOfBirth', 'gender', 'maritalStatus', 'country', 'province', 'city', 'municipality', 'address'],
  ['branch', 'department', 'employeeId', 'designation', 'jobLevel', 'shift', 'workType', 'employeeType', 'joiningDate'],
  ['grossSalary', 'basicSalary', 'bankName', 'bankAccountNumber', 'bankAccountName'],
];
