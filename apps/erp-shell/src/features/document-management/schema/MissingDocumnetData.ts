export const missingDocumentData = [
  {
    employeeId: 'EID01',
    employeeName: 'Aa',
    department: 'Technical',
    branch: 'Baneshwor',
    missingDocument: '2',
    missingDoc: ['Tax Form W-4', 'Emergency Contact'],
    priority: 'High',
  },
  {
    employeeId: 'EID02',
    employeeName: 'Bb',
    department: 'Design',
    branch: 'Chabhail',
    missingDocument: '2',
    missingDoc: ['Bank Account Number', 'Job Type'],
    priority: 'Medium',
  },
  {
    employeeId: 'EID03',
    employeeName: 'Cc',
    department: 'Technical',
    branch: 'Baneshwor',
    missingDocument: '1',
    missingDoc: ['Basic Salary'],
    priority: 'Low',
  },
];

export type MissingDocumentType = {
  employeeId: string;
  employeeName: string;
  department: string;
  branch: string;
  priority: string;
  missingDocument: string;
  missingDoc: string[];
};
