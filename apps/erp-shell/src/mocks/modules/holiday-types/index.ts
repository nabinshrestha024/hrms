import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createHolidayTypeSchema,
  updateHolidayTypeSchema,
  type HolidayType,
} from '@erp/data-access';
import { holidayTypeSeed } from './seed';

export function initHolidayTypesModule() {
  db.registerCollection('holiday-types', holidayTypeSeed);

  return createCrudHandlers<HolidayType>('holiday-types', {
    idPrefix: 'hty',
    searchFields: ['name', 'description'],
    createSchema: createHolidayTypeSchema,
    updateSchema: updateHolidayTypeSchema,
  });
}
