import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createLeaveTypeSchema,
  updateLeaveTypeSchema,
  type LeaveType,
} from '@erp/data-access';
import { leaveTypeSeed } from './seed';

export function initLeaveTypesModule() {
  db.registerCollection('leave-types', leaveTypeSeed);

  return createCrudHandlers<LeaveType>('leave-types', {
    idPrefix: 'lvt',
    searchFields: ['name', 'description'],
    createSchema: createLeaveTypeSchema,
    updateSchema: updateLeaveTypeSchema,
    filterFn: (item, params) => {
      if (params.applicableTo && item.applicableTo !== params.applicableTo)
        return false;
      if (params.paid !== undefined) {
        const expected = params.paid === 'true';
        if (item.paid !== expected) return false;
      }
      return true;
    },
  });
}
