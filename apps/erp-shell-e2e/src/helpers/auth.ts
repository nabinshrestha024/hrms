import type { Page } from '@playwright/test';

export type Role = 'admin' | 'hr' | 'emp';

const CREDENTIALS: Record<Role, { email: string; password: string }> = {
  admin: { email: 'admin@gmail.com', password: 'Test@123' },
  hr: { email: 'hr@gmail.com', password: 'Test@123' },
  emp: { email: 'emp@gmail.com', password: 'Test@123' },
};

/**
 * Drive the login flow as one of the seeded mock users.
 * Resolves once the post-login route has loaded — we pin on the
 * topbar / sidebar shell so callers can immediately interact.
 */
export async function loginAs(page: Page, role: Role): Promise<void> {
  const { email, password } = CREDENTIALS[role];
  await page.goto('/');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
  // Authenticated layout always renders the sidebar; wait for it
  // before returning so subsequent assertions can rely on the shell.
  await page.waitForURL((url) => !url.pathname.endsWith('/login'));
}
