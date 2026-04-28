import { test, expect } from '@playwright/test';
import { loginAs } from './helpers/auth';

// Phase 5.4 acceptance: per-role visibility. The mock-users seed gives
// admin / hr / employee three distinct permission bundles, and Phase 5.2
// wraps every mutation button in <Can>. These specs assert that the
// "Add Holiday Type" button (admin-only — `master:holiday-types:create`)
// is visible to admin but absent for the HR manager and the rank-and-file
// employee.

test('admin sees admin-only mutation buttons on master-setup pages', async ({
  page,
}) => {
  await loginAs(page, 'admin');
  await page.goto('/master-setup/holiday');
  await expect(
    page.getByRole('button', { name: /add holiday type/i })
  ).toBeVisible();
});

test('hr_manager does not see master-setup mutation buttons', async ({
  page,
}) => {
  await loginAs(page, 'hr');
  await page.goto('/master-setup/holiday');
  await expect(
    page.getByRole('button', { name: /add holiday type/i })
  ).toBeHidden();
});

test('employee does not see master-setup mutation buttons', async ({
  page,
}) => {
  await loginAs(page, 'emp');
  await page.goto('/master-setup/holiday');
  await expect(
    page.getByRole('button', { name: /add holiday type/i })
  ).toBeHidden();
});
