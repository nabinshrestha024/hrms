import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createCurrencySchema,
  updateCurrencySchema,
  type Currency,
} from '@erp/data-access';
import { currencySeed } from './seed';

export function initCurrenciesModule() {
  db.registerCollection('currencies', currencySeed);

  return createCrudHandlers<Currency>('currencies', {
    idPrefix: 'cur',
    searchFields: ['code', 'name', 'symbol'],
    createSchema: createCurrencySchema,
    updateSchema: updateCurrencySchema,
  });
}
