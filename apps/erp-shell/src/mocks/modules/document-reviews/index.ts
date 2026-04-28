import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createDocumentReviewSchema,
  updateDocumentReviewSchema,
  type DocumentReview,
} from '@erp/data-access';
import { documentReviewSeed } from './seed';

export function initDocumentReviewsModule() {
  db.registerCollection('document-reviews', documentReviewSeed);

  return createCrudHandlers<DocumentReview>('document-reviews', {
    idPrefix: 'drv',
    searchFields: ['fileName', 'employeeName', 'uploadedBy'],
    createSchema: createDocumentReviewSchema,
    updateSchema: updateDocumentReviewSchema,
    filterFn: (item, params) => {
      if (params.type && item.type !== params.type) return false;
      if (params.status && item.status !== params.status) return false;
      return true;
    },
  });
}
