import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createHolidaySchema,
  updateHolidaySchema,
  type Holiday,
} from '@erp/data-access';
import { holidaySeed } from './seed';

export function initHolidaysModule() {
  db.registerCollection('holidays', holidaySeed);

  return createCrudHandlers<Holiday>('holidays', {
    idPrefix: 'hol',
    searchFields: ['name', 'description', 'type'],
    createSchema: createHolidaySchema,
    updateSchema: updateHolidaySchema,
    filterFn: (item, params) => {
      if (params.type && item.type !== params.type) return false;
      if (params.year && !item.date.startsWith(params.year)) return false;
      return true;
    },
  });
}
