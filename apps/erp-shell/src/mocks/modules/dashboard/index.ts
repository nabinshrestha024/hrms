import { http, delay } from 'msw';
import { db } from '../../core/database';
import { success, created, notFound, badRequest } from '../../core/response';
import {
  attendanceSeed,
  myRequestsSeed,
  noticesSeed,
  eventsSeed,
  teamRequestsSeed,
  personalInfoSeed,
  companyProfileSeed,
} from './seed';

const API_BASE = '/api';

function parseParams(url: string): Record<string, string> {
  const out: Record<string, string> = {};
  new URL(url).searchParams.forEach((v, k) => {
    out[k] = v;
  });
  return out;
}

export function initDashboardModule() {
  db.registerCollection('dashboard-attendance', attendanceSeed);
  db.registerCollection('dashboard-my-requests', myRequestsSeed);
  db.registerCollection('dashboard-notices', noticesSeed);
  db.registerCollection('dashboard-events', eventsSeed);
  db.registerCollection('dashboard-team-requests', teamRequestsSeed);
  db.registerCollection('dashboard-personal-info', personalInfoSeed);
  db.registerCollection('company-profile', companyProfileSeed);

  return [
    // ── Attendance (GET with optional event filter) ──
    http.get(`${API_BASE}/dashboard/attendance`, async ({ request }) => {
      await delay(150);
      const p = parseParams(request.url);
      const filter = (item: any) => {
        if (p.event && item.event !== p.event) return false;
        return true;
      };
      const result = db.query('dashboard-attendance', {
        filter,
        page: p.page ? Number(p.page) : undefined,
        pageSize: p.pageSize ? Number(p.pageSize) : undefined,
      });
      return success(result.data, 'Records_fetched');
    }),

    // ── My Requests (GET with status/type filter) ──
    http.get(`${API_BASE}/dashboard/my-requests`, async ({ request }) => {
      await delay(150);
      const p = parseParams(request.url);
      const filter = (item: any) => {
        if (p.status && item.status !== p.status) return false;
        if (p.type && item.type !== p.type) return false;
        return true;
      };
      const result = db.query('dashboard-my-requests', {
        filter,
        page: p.page ? Number(p.page) : undefined,
        pageSize: p.pageSize ? Number(p.pageSize) : undefined,
      });
      return success(result.data, 'Records_fetched');
    }),

    // ── Notices (full CRUD) ──
    http.get(`${API_BASE}/dashboard/notices`, async ({ request }) => {
      await delay(150);
      const p = parseParams(request.url);
      const filter = (item: any) => {
        if (p.noticeType && item.noticeType !== p.noticeType) return false;
        if (p.search) {
          const q = p.search.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
          );
        }
        return true;
      };
      const result = db.query('dashboard-notices', {
        filter,
        page: p.page ? Number(p.page) : undefined,
        pageSize: p.pageSize ? Number(p.pageSize) : undefined,
      });
      return success(result.data, 'Records_fetched');
    }),

    http.post(`${API_BASE}/dashboard/notices`, async ({ request }) => {
      await delay(200);
      try {
        const body = (await request.json()) as Record<string, unknown>;
        const now = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        const item = db.create('dashboard-notices', {
          ...body,
          id: db.nextId('dashboard-notices', 'notice'),
          createdAt: now,
        });
        return created(item, 'Notice_created');
      } catch (err) {
        return badRequest(err instanceof Error ? err.message : 'Create failed');
      }
    }),

    http.delete(`${API_BASE}/dashboard/notices/:id`, async ({ params }) => {
      await delay(150);
      const ok = db.delete('dashboard-notices', params.id as string);
      if (!ok) return notFound('Notice');
      return success(null, 'Notice_deleted');
    }),

    // ── Events (GET with type filter) ──
    http.get(`${API_BASE}/dashboard/events`, async ({ request }) => {
      await delay(150);
      const p = parseParams(request.url);
      const filter = (item: any) => {
        if (p.eventType && item.eventType !== p.eventType) return false;
        return true;
      };
      const data = db.getAll('dashboard-events').filter(filter);
      return success(data, 'Records_fetched');
    }),

    // ── Team Requests (GET with type/status filter) ──
    http.get(`${API_BASE}/dashboard/team-requests`, async ({ request }) => {
      await delay(150);
      const p = parseParams(request.url);
      const filter = (item: any) => {
        if (p.status && item.status !== p.status) return false;
        if (p.type && item.type !== p.type) return false;
        return true;
      };
      const result = db.query('dashboard-team-requests', {
        filter,
        page: p.page ? Number(p.page) : undefined,
        pageSize: p.pageSize ? Number(p.pageSize) : undefined,
      });
      return success(result.data, 'Records_fetched');
    }),

    // ── Team Requests: approve/reject ──
    http.patch(
      `${API_BASE}/dashboard/team-requests/:id`,
      async ({ params, request }) => {
        await delay(200);
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const updated = db.update(
            'dashboard-team-requests',
            params.id as string,
            body
          );
          if (!updated) return notFound('TeamRequest');
          return success(updated, 'Request_updated');
        } catch (err) {
          return badRequest(
            err instanceof Error ? err.message : 'Update failed'
          );
        }
      }
    ),

    // ── Personal Info ──
    http.get(`${API_BASE}/dashboard/personal-info`, async () => {
      await delay(100);
      const data = db.getAll('dashboard-personal-info');
      return success(data, 'Records_fetched');
    }),

    // ── Company Profile (GET + PATCH) ──
    http.get(`${API_BASE}/company-profile`, async () => {
      await delay(150);
      const all = db.getAll('company-profile');
      return success(all[0] ?? null, 'Record_fetched');
    }),

    http.patch(`${API_BASE}/company-profile`, async ({ request }) => {
      await delay(200);
      try {
        const body = (await request.json()) as Record<string, unknown>;
        const all = db.getAll<{ id: string }>('company-profile');
        if (all.length === 0) return notFound('CompanyProfile');
        const updated = db.update('company-profile', all[0].id, body);
        return success(updated, 'Profile_updated');
      } catch (err) {
        return badRequest(err instanceof Error ? err.message : 'Update failed');
      }
    }),
  ];
}
