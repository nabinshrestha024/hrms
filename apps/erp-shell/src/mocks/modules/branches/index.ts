import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import { branchSeed } from './seed';

export function initBranchesModule() {
  db.registerCollection('branches', branchSeed);

  return createCrudHandlers<(typeof branchSeed)[number]>('branches', {
    idPrefix: 'br',
    searchFields: ['branch', 'location', 'branchId'],
    filterFn: (item, params) => {
      if (params.branch && item.branch !== params.branch) return false;
      if (params.status && item.status !== params.status) return false;
      return true;
    },
  });
}
