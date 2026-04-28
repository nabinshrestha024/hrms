import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createMissingDocumentSchema,
  updateMissingDocumentSchema,
  type MissingDocument,
} from '@erp/data-access';
import { missingDocumentSeed } from './seed';

export function initMissingDocumentsModule() {
  db.registerCollection('missing-documents', missingDocumentSeed);

  return createCrudHandlers<MissingDocument>('missing-documents', {
    idPrefix: 'msd',
    searchFields: ['employeeName', 'employeeId', 'department', 'branch'],
    createSchema: createMissingDocumentSchema,
    updateSchema: updateMissingDocumentSchema,
    filterFn: (item, params) => {
      if (params.department && item.department !== params.department)
        return false;
      if (params.branch && item.branch !== params.branch) return false;
      if (params.priority && item.priority !== params.priority) return false;
      return true;
    },
  });
}
