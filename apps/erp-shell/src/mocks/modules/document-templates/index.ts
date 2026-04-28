import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createDocumentTemplateSchema,
  updateDocumentTemplateSchema,
  type DocumentTemplate,
} from '@erp/data-access';
import { documentTemplateSeed } from './seed';

export function initDocumentTemplatesModule() {
  db.registerCollection('document-templates', documentTemplateSeed);

  return createCrudHandlers<DocumentTemplate>('document-templates', {
    idPrefix: 'dtm',
    searchFields: ['name'],
    createSchema: createDocumentTemplateSchema,
    updateSchema: updateDocumentTemplateSchema,
    filterFn: (item, params) => {
      if (params.kind && item.kind !== params.kind) return false;
      return true;
    },
  });
}
