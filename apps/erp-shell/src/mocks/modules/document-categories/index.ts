import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createDocumentCategorySchema,
  updateDocumentCategorySchema,
  type DocumentCategory,
} from '@erp/data-access';
import { documentCategorySeed } from './seed';

export function initDocumentCategoriesModule() {
  db.registerCollection('document-categories', documentCategorySeed);

  return createCrudHandlers<DocumentCategory>('document-categories', {
    idPrefix: 'dcc',
    searchFields: ['name'],
    createSchema: createDocumentCategorySchema,
    updateSchema: updateDocumentCategorySchema,
  });
}
