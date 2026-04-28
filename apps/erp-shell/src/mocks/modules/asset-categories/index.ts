import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createAssetCategorySchema,
  updateAssetCategorySchema,
  type AssetCategory,
} from '@erp/data-access';
import { assetCategorySeed } from './seed';

export function initAssetCategoriesModule() {
  db.registerCollection('asset-categories', assetCategorySeed);

  return createCrudHandlers<AssetCategory>('asset-categories', {
    idPrefix: 'aca',
    searchFields: ['name'],
    createSchema: createAssetCategorySchema,
    updateSchema: updateAssetCategorySchema,
  });
}
