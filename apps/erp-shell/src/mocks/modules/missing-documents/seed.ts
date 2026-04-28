import type { MissingDocument } from '@erp/data-access';

/**
 * Missing-documents seed.
 * Field changes from legacy `missingDocumentData`:
 *   missingDocument (string count) -> dropped (derive from missingDocs.length)
 *   missingDoc                     -> missingDocs (renamed for clarity)
 *   priority "High"                -> priority enum 'high' | 'medium' | 'low'
 */
export const missingDocumentSeed: MissingDocument[] = [
  {
    id: 'msd-001',
    employeeId: 'EID01',
    employeeName: 'Aa',
    department: 'Technical',
    branch: 'Baneshwor',
    missingDocs: ['Tax Form W-4', 'Emergency Contact'],
    priority: 'high',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'msd-002',
    employeeId: 'EID02',
    employeeName: 'Bb',
    department: 'Design',
    branch: 'Chabhail',
    missingDocs: ['Bank Account Number', 'Job Type'],
    priority: 'medium',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'msd-003',
    employeeId: 'EID03',
    employeeName: 'Cc',
    department: 'Technical',
    branch: 'Baneshwor',
    missingDocs: ['Basic Salary'],
    priority: 'low',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
