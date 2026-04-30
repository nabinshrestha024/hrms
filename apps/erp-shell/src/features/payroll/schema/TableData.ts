export const employeesDetailData = [
  {
    id: 'SS1',
    name: 'Shyam Sapkota',
    department: 'Engineering',
    role: 'Senior Developer',
    basicSalary: '',
    grossSalary: '',
    absentDays: 2,
    lateMinutes: 45,
    overtimeHours: 12,
  },
  {
    id: 'UN1',
    name: 'Uma Neupane',
    department: 'Product',
    role: 'Product Manager',
    basicSalary: '',
    grossSalary: '',
    absentDays: 2,
    overtimeHours: 12,
  },
  {
    id: 'HG1',
    name: 'Hari Gurung',
    department: 'Engineering',
    role: 'Senior Developer',
    basicSalary: '',
    grossSalary: '',
    absentDays: 1,
    lateMinutes: 20,
    overtimeHours: 2,
  },
  {
    id: 'RR1',
    name: 'Roshan Rai',
    department: 'Design',
    role: 'UI/UX Designer',
    basicSalary: '',
    grossSalary: '',
    lateMinutes: 45,
    overtimeHours: 1,
  },
  {
    id: 'SP1',
    name: 'Sushma Poudel',
    department: 'Engineering',
    role: 'Senior Developer',
    basicSalary: '',
    grossSalary: '',
    overtimeHours: 5,
  },
  {
    id: 'SS2',
    name: 'Sushma Sharma',
    department: 'Human Resources',
    role: 'HR Manager',
    basicSalary: '',
    grossSalary: '',
    absentDays: 2,
    lateMinutes: 47,
  },
];
export type EmployeeDetailType = {
  id: string;
  name: string;
  department: string;
  role: string;
  basicSalary: string;
  grossSalary: string;
  absentDays?: number;
  lateMinutes?: number;
  overtimeHours?: number;
};
