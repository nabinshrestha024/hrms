import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createShiftSchema,
  updateShiftSchema,
  type Shift,
} from '@erp/data-access';
import { shiftSeed } from './seed';

export function initShiftsModule() {
  db.registerCollection('shifts', shiftSeed);

  return createCrudHandlers<Shift>('shifts', {
    idPrefix: 'sft',
    searchFields: ['name', 'code'],
    createSchema: createShiftSchema,
    updateSchema: updateShiftSchema,
    filterFn: (item, params) => {
      if (params.shiftType && item.shiftType !== params.shiftType) return false;
      if (params.isActive !== undefined) {
        const expected = params.isActive === 'true';
        if (item.isActive !== expected) return false;
      }
      return true;
    },
  });
}
