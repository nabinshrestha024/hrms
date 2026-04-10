import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import { departmentSeed } from './seed';

export function initDepartmentsModule() {
  db.registerCollection('departments', departmentSeed);

  return createCrudHandlers<(typeof departmentSeed)[number]>('departments', {
    idPrefix: 'dept',
    searchFields: ['department', 'location', 'code'],
  });
}
