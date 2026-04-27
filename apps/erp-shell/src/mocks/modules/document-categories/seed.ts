import type { DocumentCategory } from '@erp/data-access';

/**
 * Document-category seed.
 * Field changes from legacy `categoryData`:
 *   documentCategory -> name
 *   numOfDocs "12"   -> documentCount: 12 (number)
 *   createdDate      -> createdAt (uses standard ISO timestamp)
 *
 * The legacy seed had a duplicate "Tax Docs" entry — deduplicated here.
 */
export const documentCategorySeed: DocumentCategory[] = [
  {
    id: 'dcc-001',
    name: 'Company Policies',
    documentCount: 12,
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
  },
  {
    id: 'dcc-002',
    name: 'Tax Docs',
    documentCount: 12,
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
  },
  {
    id: 'dcc-003',
    name: 'Personal IDs',
    documentCount: 12,
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
  },
  {
    id: 'dcc-004',
    name: 'Performance & Reviews',
    documentCount: 12,
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
  },
  {
    id: 'dcc-005',
    name: 'Certifications',
    documentCount: 12,
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
  },
];
