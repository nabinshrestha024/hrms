import { initAuthModule } from './modules/auth';
import { initBranchesModule } from './modules/branches';
import { initDashboardModule } from './modules/dashboard';
import { initDepartmentsModule } from './modules/departments';
import { initEmployeesModule } from './modules/employees';

/**
 * Central handler registry.
 * Each module initializes its database collection and returns its HTTP handlers.
 * To add a new module:
 *   1. Create mocks/modules/<name>/seed.ts (data)
 *   2. Create mocks/modules/<name>/index.ts (init + handlers)
 *   3. Import and spread here
 */
export const handlers = [
  ...initAuthModule(),
  ...initBranchesModule(),
  ...initDashboardModule(),
  ...initDepartmentsModule(),
  ...initEmployeesModule(),
  // Add new modules here:
  // ...initLeaveModule(),
  // ...initPayrollModule(),
  // ...initAssetsModule(),
  // ...initDocumentsModule(),
];
