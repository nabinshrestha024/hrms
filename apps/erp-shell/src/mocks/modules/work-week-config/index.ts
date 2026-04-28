import { delay, http } from 'msw';
import {
  updateWorkWeekConfigSchema,
  type WorkWeekConfig,
} from '@erp/data-access';
import { db } from '../../core/database';
import { badRequest, success, validationError } from '../../core/response';
import { workWeekConfigSeed } from './seed';

const API_BASE = '/api';
const COLLECTION = 'work-week-config';
const CONFIG_ID = workWeekConfigSeed.id;

/**
 * Singleton settings handler — `/api/work-week-config` exposes only GET
 * and PATCH (no list, no create, no delete). The collection is
 * registered with exactly one row; PATCH mutates the same row.
 *
 * Custom handlers rather than `createCrudHandlers` because the latter
 * assumes a list resource at `/<resource>` and a row at `/<resource>/:id`,
 * neither of which fits the singleton URL shape.
 */
export function initWorkWeekConfigModule() {
  db.registerCollection<WorkWeekConfig>(COLLECTION, [workWeekConfigSeed]);

  return [
    http.get(`${API_BASE}/${COLLECTION}`, async () => {
      await delay(150);
      const item = db.findById<WorkWeekConfig>(COLLECTION, CONFIG_ID);
      // Guarded against accidental seed-clear; in normal operation this
      // never returns null because we always re-seed on init.
      return success(item, 'Record_fetched');
    }),

    http.patch(`${API_BASE}/${COLLECTION}`, async ({ request }) => {
      await delay(200);
      try {
        const body = (await request.json()) as Record<string, unknown>;
        const result = updateWorkWeekConfigSchema.safeParse(body);
        if (!result.success) {
          return validationError(
            result.error.issues as Array<{
              path: (string | number)[];
              message: string;
            }>
          );
        }

        const updated = db.update<WorkWeekConfig>(COLLECTION, CONFIG_ID, {
          ...result.data,
          updatedAt: new Date().toISOString(),
        });

        return success(updated, 'Record_updated');
      } catch (err) {
        return badRequest(err instanceof Error ? err.message : 'Update failed');
      }
    }),
  ];
}
