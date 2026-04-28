import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createAssetSchema,
  updateAssetSchema,
  type Asset,
} from '@erp/data-access';
import { assetSeed } from './seed';

export function initAssetsModule() {
  db.registerCollection('assets', assetSeed);

  return createCrudHandlers<Asset>('assets', {
    idPrefix: 'ast',
    searchFields: ['name', 'serialNumber', 'category', 'assignedTo'],
    createSchema: createAssetSchema,
    updateSchema: updateAssetSchema,
    filterFn: (item, params) => {
      if (params.category && item.category !== params.category) return false;
      if (params.status && item.status !== params.status) return false;
      if (params.condition && item.condition !== params.condition) return false;
      return true;
    },
  });
}
