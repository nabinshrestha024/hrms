import type { EmployeeDocument } from '@erp/data-access';

/**
 * Employee-document seed.
 * Field changes from legacy `visibilityData`:
 *   document      -> name
 *   uploadDate    -> uploadDate (normalised to ISO YYYY-MM-DD)
 *   visibility    -> visible
 */
export const employeeDocumentSeed: EmployeeDocument[] = [
  {
    id: 'edc-001',
    name: 'Tax Form W-4',
    employeeName: 'Arjun Sapkota',
    category: 'Tax',
    uploadDate: '2023-12-12',
    visible: true,
    createdAt: '2023-12-12T00:00:00Z',
    updatedAt: '2023-12-12T00:00:00Z',
  },
  {
    id: 'edc-002',
    name: 'Employment Contract - 2024',
    employeeName: 'Sangita Thapa',
    category: 'Contracts',
    uploadDate: '2024-01-11',
    visible: true,
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z',
  },
  {
    id: 'edc-003',
    name: 'Performance Review Q1 2024',
    employeeName: 'Sagar Thapa',
    category: 'Agreements',
    uploadDate: '2024-01-11',
    visible: false,
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z',
  },
  {
    id: 'edc-004',
    name: 'NDA Agreement',
    employeeName: 'Rajan Magar',
    category: 'Policies',
    uploadDate: '2025-04-05',
    visible: false,
    createdAt: '2025-04-05T00:00:00Z',
    updatedAt: '2025-04-05T00:00:00Z',
  },
];
