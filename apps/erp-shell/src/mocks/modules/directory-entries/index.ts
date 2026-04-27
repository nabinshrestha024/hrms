import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createDirectoryEntrySchema,
  updateDirectoryEntrySchema,
  type DirectoryEntry,
} from '@erp/data-access';
import { directoryEntrySeed } from './seed';

export function initDirectoryEntriesModule() {
  db.registerCollection('directory-entries', directoryEntrySeed);

  return createCrudHandlers<DirectoryEntry>('directory-entries', {
    idPrefix: 'dir',
    searchFields: ['employeeName', 'employeeId', 'designation', 'department'],
    createSchema: createDirectoryEntrySchema,
    updateSchema: updateDirectoryEntrySchema,
    filterFn: (item, params) => {
      if (params.branch && item.branch !== params.branch) return false;
      if (params.department && item.department !== params.department)
        return false;
      return true;
    },
  });
}
