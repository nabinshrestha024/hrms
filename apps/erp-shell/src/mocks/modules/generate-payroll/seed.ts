import { GeneratePayroll } from '@erp/data-access';

/**
 * Payroll seed.
 * Changes:
 *  basicSalary / grossSalary -> number |''
 *  missing fields -> explicitly set to null
 *  added createdAt / updatedAt for consistency
 */
export const generatePayrollSeed: GeneratePayroll[] = [
  {
    id: 'gen-01',
    name: 'Shyam Sapkota',
    department: 'Engineering',
    role: 'Senior Developer',
    basicSalary: null,
    grossSalary: null,
    absentDays: 2,
    lateMinutes: 45,
    overtimeHours: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'gen-02',
    name: 'Uma Neupane',
    department: 'Product',
    role: 'Product Manager',
    basicSalary: null,
    grossSalary: null,
    absentDays: 2,
    lateMinutes: null,
    overtimeHours: 12,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'gen-03',
    name: 'Hari Gurung',
    department: 'Engineering',
    role: 'Senior Developer',
    basicSalary: null,
    grossSalary: null,
    absentDays: 1,
    lateMinutes: 20,
    overtimeHours: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'gen-04',
    name: 'Roshan Rai',
    department: 'Design',
    role: 'UI/UX Designer',
    basicSalary: null,
    grossSalary: null,
    absentDays: null,
    lateMinutes: 45,
    overtimeHours: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'gen-05',
    name: 'Sushma Poudel',
    department: 'Engineering',
    role: 'Senior Developer',
    basicSalary: null,
    grossSalary: null,
    absentDays: null,
    lateMinutes: null,
    overtimeHours: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'gen-06',
    name: 'Sushma Sharma',
    department: 'Human Resources',
    role: 'HR Manager',
    basicSalary: null,
    grossSalary: null,
    absentDays: 2,
    lateMinutes: 47,
    overtimeHours: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
