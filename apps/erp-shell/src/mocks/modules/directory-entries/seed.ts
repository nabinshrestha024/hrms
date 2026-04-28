import type { DirectoryEntry } from '@erp/data-access';

/**
 * Directory-entries seed.
 * Field changes from legacy `directoriesDetails`:
 *   employeeID -> employeeId (canonical casing)
 *
 * A future task can derive these entries from `useEmployees()` rather
 * than maintaining a separate collection. For Phase 2 they stay
 * separate so the migration is a 1:1 swap.
 */
export const directoryEntrySeed: DirectoryEntry[] = [
  {
    id: 'dir-001',
    employeeId: 'EID11',
    employeeName: 'Samita Pandey',
    branch: 'Baneshwor',
    department: 'Technical',
    designation: 'Frontend Engineer',
    jobLevel: 'Junior',
    email: 'samita@company.com',
    contact: '9810000000',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dir-002',
    employeeId: 'EID12',
    employeeName: 'Sarita Thapa',
    branch: 'Naxal',
    department: 'Design',
    designation: 'UI Designer',
    jobLevel: 'Lead',
    email: 'sarita@company.com',
    contact: '9810000000',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dir-003',
    employeeId: 'EID13',
    employeeName: 'Renu Shrestha',
    branch: 'Kalanki',
    department: 'Technical',
    designation: 'Management',
    jobLevel: 'Mid',
    email: 'renu@company.com',
    contact: '9810000000',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dir-004',
    employeeId: 'EID14',
    employeeName: 'Sita Tamang',
    branch: 'Pulchowk',
    department: 'Human Resources',
    designation: 'HR',
    jobLevel: 'Senior',
    email: 'sita@company.com',
    contact: '9810000000',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dir-005',
    employeeId: 'EID15',
    employeeName: 'Kamala Adhikari',
    branch: 'Baneshwor',
    department: 'Technical',
    designation: 'Human Resource',
    jobLevel: 'Junior',
    email: 'emp@company.com',
    contact: '9810000000',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dir-006',
    employeeId: 'EID16',
    employeeName: 'Krishna Pandey',
    branch: 'Baneshwor',
    department: 'Technical',
    designation: 'Software Engineer',
    jobLevel: 'Junior',
    email: 'krishna.pandey@company.com',
    contact: '9810000000',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
