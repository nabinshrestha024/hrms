import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createEmployeeDocumentSchema,
  updateEmployeeDocumentSchema,
  type EmployeeDocument,
} from '@erp/data-access';
import { employeeDocumentSeed } from './seed';

export function initEmployeeDocumentsModule() {
  db.registerCollection('employee-documents', employeeDocumentSeed);

  return createCrudHandlers<EmployeeDocument>('employee-documents', {
    idPrefix: 'edc',
    searchFields: ['name', 'employeeName', 'category'],
    createSchema: createEmployeeDocumentSchema,
    updateSchema: updateEmployeeDocumentSchema,
    filterFn: (item, params) => {
      if (params.category && item.category !== params.category) return false;
      if (params.visible !== undefined) {
        const expected = params.visible === 'true';
        if (item.visible !== expected) return false;
      }
      return true;
    },
  });
}
