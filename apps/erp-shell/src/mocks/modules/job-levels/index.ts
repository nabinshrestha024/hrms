import { db } from '../../core/database';
import { createCrudHandlers } from '../../core/handlers-factory';
import {
  createJobLevelSchema,
  updateJobLevelSchema,
  type JobLevel,
} from '@erp/data-access';
import { jobLevelSeed } from './seed';

export function initJobLevelsModule() {
  db.registerCollection('job-levels', jobLevelSeed);

  return createCrudHandlers<JobLevel>('job-levels', {
    idPrefix: 'jlv',
    searchFields: ['name', 'description'],
    createSchema: createJobLevelSchema,
    updateSchema: updateJobLevelSchema,
  });
}
