import { test, expect } from '@playwright/test';

// Phase 6.3 acceptance: tenant theming pipeline. Instead of pixel-diffing
// screenshots (flaky across renderers), assert the computed CSS variable
// `--primary` on :root reflects the active tenant's override. The values
// come from `MOCK_TENANTS` in `libs/shared/tenant/src/mock-tenants.ts`:
//   demo  → #4f39f6  (default indigo, set in :root via app.css)
//   acme  → #0F766E  (teal override applied at runtime by apply-theme.ts)

const readPrimary = (page: import('@playwright/test').Page) =>
  page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim()
  );

test('demo tenant uses the default --primary token', async ({ page }) => {
  await page.goto('/?tenant=demo');
  // The TenantProvider applies the theme on first mount; wait until the
  // value is non-empty before asserting (CSS vars resolve synchronously
  // but applyTenantTheme runs in a useEffect).
  await expect.poll(() => readPrimary(page)).toBe('#4f39f6');
});

test('acme tenant overrides --primary with the teal brand color', async ({
  page,
}) => {
  await page.goto('/?tenant=acme');
  await expect.poll(() => readPrimary(page)).toBe('#0F766E');
});
