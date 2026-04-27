import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createLeavePayTypeSchema,
  updateLeavePayTypeSchema,
  type LeavePayType,
} from '@erp/data-access';
import { leavePayTypeSeed } from './seed';

export function initLeavePayTypesModule() {
  db.registerCollection('leave-pay-types', leavePayTypeSeed);

  return createCrudHandlers<LeavePayType>('leave-pay-types', {
    idPrefix: 'lpt',
    searchFields: ['name', 'code', 'description'],
    createSchema: createLeavePayTypeSchema,
    updateSchema: updateLeavePayTypeSchema,
  });
}
