import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createWorkTypeSchema,
  updateWorkTypeSchema,
  type WorkType,
} from '@erp/data-access';
import { workTypeSeed } from './seed';

export function initWorkTypesModule() {
  db.registerCollection('work-types', workTypeSeed);

  return createCrudHandlers<WorkType>('work-types', {
    idPrefix: 'wty',
    searchFields: ['name', 'description'],
    createSchema: createWorkTypeSchema,
    updateSchema: updateWorkTypeSchema,
  });
}
