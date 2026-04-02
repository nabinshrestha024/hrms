import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import { employeeSeed } from './seed';
import { createEmployeeSchema, updateEmployeeSchema, type Employee } from '@erp/data-access';

export function initEmployeesModule() {
  db.registerCollection('employees', employeeSeed);

  return createCrudHandlers<Employee>('employees', {
    idPrefix: 'emp',
    searchFields: ['firstName', 'lastName', 'email'],
    createSchema: createEmployeeSchema,
    updateSchema: updateEmployeeSchema,
    filterFn: (item, params) => {
      if (params.department && item.department !== params.department) return false;
      if (params.status && item.status !== params.status) return false;
      return true;
    },
  });
}
