import { test, expect } from '@playwright/test';
import { loginAs } from './helpers/auth';

// Smoke specs that exercise the auth + shell pipeline. Detailed per-feature
// specs live in their own files (e.g. `auth-roles.spec.ts`,
// `master-setup.spec.ts`).

test('login redirects to the authenticated shell', async ({ page }) => {
  await loginAs(page, 'admin');
  await expect(page).not.toHaveURL(/\/login$/);
  // Sidebar TopBar shows the signed-in user's name in dev mode.
  await expect(page.getByText(/Admin User/i)).toBeVisible();
});

test('invalid credentials show an error toast', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('admin@gmail.com');
  await page.getByLabel('Password').fill('wrong-password');
  await page.getByRole('button', { name: /sign in/i }).click();
  // Stays on login; the toast region surfaces "Login failed".
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByText(/login failed/i)).toBeVisible();
});
