/**
 * Generic CRUD handler factory.
 * Creates GET (list), GET (detail), POST, PATCH, DELETE handlers for any entity.
 * All responses use the standard API envelope format:
 *   { code, message, data, errors: [{ errorCode, errorMessage }] }
 *
 * Supports optional Zod validation on create/update.
 */
import { http, delay } from 'msw';
import type { z } from 'zod';
import { db } from './database';
import {
  success,
  created,
  noContent,
  notFound,
  badRequest,
  validationError,
} from './response';

const API_BASE = '/api';

interface CrudOptions<T> {
  /** Prefix for auto-generated IDs (e.g. 'emp' → 'emp-001') */
  idPrefix?: string;
  /** Fields to search against when `?search=` is provided */
  searchFields?: (keyof T & string)[];
  /** Custom filter function — receives item + raw URL params */
  filterFn?: (item: T, params: Record<string, string>) => boolean;
  /** Zod schema to validate POST body. Returns validation errors if invalid. */
  createSchema?: z.ZodType;
  /** Zod schema to validate PATCH body. Returns validation errors if invalid. */
  updateSchema?: z.ZodType;
  /** Simulated network delay in ms. Default: 150 */
  delayMs?: number;
}

function parseParams(url: string): Record<string, string> {
  const out: Record<string, string> = {};
  new URL(url).searchParams.forEach((v, k) => {
    out[k] = v;
  });
  return out;
}

export function createCrudHandlers<T extends { id: string }>(
  resource: string,
  opts: CrudOptions<T> = {}
) {
  const d = opts.delayMs ?? 150;
  const prefix = opts.idPrefix ?? resource.slice(0, 3);

  return [
    // ── LIST ──
    http.get(`${API_BASE}/${resource}`, async ({ request }) => {
      await delay(d);
      const p = parseParams(request.url);

      const filter = (item: T) => {
        if (p.search && opts.searchFields) {
          const q = p.search.toLowerCase();
          const match = opts.searchFields.some((f) =>
            String(item[f]).toLowerCase().includes(q)
          );
          if (!match) return false;
        }
        if (opts.filterFn && !opts.filterFn(item, p)) return false;
        return true;
      };

      const result = db.query<T>(resource, {
        filter,
        sortBy: p.sortBy,
        sortOrder: p.sortOrder as 'asc' | 'desc' | undefined,
        page: p.page ? Number(p.page) : undefined,
        pageSize: p.pageSize ? Number(p.pageSize) : undefined,
      });

      return success(result, 'Records_fetched');
    }),

    // ── GET ONE ──
    http.get(`${API_BASE}/${resource}/:id`, async ({ params }) => {
      await delay(d);
      const item = db.findById<T>(resource, params.id as string);
      if (!item) return notFound(resource);
      return success(item, 'Record_fetched');
    }),

    // ── CREATE ──
    http.post(`${API_BASE}/${resource}`, async ({ request }) => {
      await delay(d);
      try {
        const body = (await request.json()) as Record<string, unknown>;

        // Validate with Zod if schema provided
        if (opts.createSchema) {
          const result = opts.createSchema.safeParse(body);
          if (!result.success) {
            return validationError(
              result.error.issues as Array<{
                path: (string | number)[];
                message: string;
              }>
            );
          }
        }

        const now = new Date().toISOString();
        const item = db.create<T>(resource, {
          ...body,
          id: db.nextId(resource, prefix),
          createdAt: now,
          updatedAt: now,
        } as unknown as T);

        return created(item, 'Record_created');
      } catch (err) {
        return badRequest(err instanceof Error ? err.message : 'Create failed');
      }
    }),

    // ── UPDATE ──
    http.patch(`${API_BASE}/${resource}/:id`, async ({ params, request }) => {
      await delay(d);
      try {
        const body = (await request.json()) as Record<string, unknown>;

        // Validate with Zod if schema provided
        if (opts.updateSchema) {
          const result = opts.updateSchema.safeParse(body);
          if (!result.success) {
            return validationError(
              result.error.issues as Array<{
                path: (string | number)[];
                message: string;
              }>
            );
          }
        }

        const updated = db.update<T>(
          resource,
          params.id as string,
          {
            ...body,
            updatedAt: new Date().toISOString(),
          } as unknown as Partial<T>
        );

        if (!updated) return notFound(resource);
        return success(updated, 'Record_updated');
      } catch (err) {
        return badRequest(err instanceof Error ? err.message : 'Update failed');
      }
    }),

    // ── DELETE ──
    http.delete(`${API_BASE}/${resource}/:id`, async ({ params }) => {
      await delay(d);
      const ok = db.delete(resource, params.id as string);
      if (!ok) return notFound(resource);
      return noContent();
    }),
  ];
}
