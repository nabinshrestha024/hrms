import { http, delay } from 'msw';
// Dev-only entry — never imported from production app code.
import { mockLogin, restoreSession } from '@erp/auth/dev';
import { success, unauthorized } from '../../core/response';

const API_BASE = '/api';

export function initAuthModule() {
  return [
    http.post(`${API_BASE}/auth/login`, async ({ request }) => {
      await delay(300);
      try {
        const body = (await request.json()) as {
          email: string;
          password: string;
          tenantId: string;
        };
        const result = await mockLogin(body);
        return success(result, 'Login_success');
      } catch (err) {
        return unauthorized(
          err instanceof Error ? err.message : 'Invalid credentials'
        );
      }
    }),

    http.get(`${API_BASE}/auth/session`, async () => {
      await delay(100);
      const session = restoreSession();
      if (session) return success(session, 'Session_restored');
      return unauthorized('Session expired');
    }),
  ];
}
