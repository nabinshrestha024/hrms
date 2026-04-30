import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createGeneratePayrollSchema,
  type GeneratePayroll,
} from '@erp/data-access';
import { generatePayrollSeed } from './seed';

export function initGeneratePayrollModule() {
  db.registerCollection('generate-payrolls', generatePayrollSeed);

  return createCrudHandlers<GeneratePayroll>('generate-payrolls', {
    idPrefix: 'gen',
    searchFields: ['name'],
    createSchema: createGeneratePayrollSchema,
    filterFn: (item, params) => {
      if (params.department && item.department !== params.department)
        return false;
      return true;
    },
  });
}
