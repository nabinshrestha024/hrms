import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createLeaveRequestSchema,
  updateLeaveRequestSchema,
  type LeaveRequest,
} from '@erp/data-access';
import { leaveRequestSeed } from './seed';

export function initLeaveRequestsModule() {
  db.registerCollection('leave-requests', leaveRequestSeed);

  return createCrudHandlers<LeaveRequest>('leave-requests', {
    idPrefix: 'lvr',
    searchFields: ['employeeName', 'employeeId', 'reason'],
    createSchema: createLeaveRequestSchema,
    updateSchema: updateLeaveRequestSchema,
    filterFn: (item, params) => {
      if (params.employeeId && item.employeeId !== params.employeeId)
        return false;
      if (params.branch && item.branch !== params.branch) return false;
      if (params.type && item.type !== params.type) return false;
      if (params.status && item.status !== params.status) return false;
      return true;
    },
  });
}
