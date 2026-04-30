import { Allowance, createAllowanceSchema } from '@erp/data-access';
import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import { allowancesSeed } from './seed';

export function initAllowanceModule() {
  db.registerCollection('allowances', allowancesSeed);

  return createCrudHandlers<Allowance>('allowances', {
    idPrefix: 'allow',
    searchFields: ['name'],
    createSchema: createAllowanceSchema,
  });
}
