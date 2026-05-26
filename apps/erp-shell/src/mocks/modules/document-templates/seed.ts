import type { DocumentTemplate } from '@erp/data-access';

/**
 * Document-template seed.
 * Field changes from legacy `documentTemplateData`:
 *   documentName    -> name
 *   fileName "File" / "Template" -> kind: 'file' | 'template' (renamed —
 *     the legacy field name was misleading; its values were the kind,
 *     not a filename)
 *
 * The legacy seed had a duplicate "Tax Docs" — deduplicated.
 */
export const documentTemplateSeed: DocumentTemplate[] = [
  {
    id: 'dtm-001',
    name: 'Company Policies',
    kind: 'file',
    categroy: 'Legal',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dtm-002',
    name: 'Tax Docs',
    kind: 'template',
    categroy: 'Tax',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dtm-003',
    name: 'Personal IDs',
    kind: 'template',
    categroy: 'Identity',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
