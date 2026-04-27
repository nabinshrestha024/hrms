import type { WorkWeekConfig } from '@erp/data-access';

/**
 * Work-week config — singleton settings record.
 *
 * One row per tenant. The legacy `WorkWeekData.ts` only contained UI
 * dropdown options (`weekStartsOptions`, `weekendPolicyOptions`); those
 * have moved inline to the form since they're chrome, not entity data.
 * The form did not previously persist anywhere — this seed represents
 * the canonical default config.
 */
export const workWeekConfigSeed: WorkWeekConfig = {
  id: 'wwk-001',
  weekStarts: 'sun',
  weekendPolicy: 'full-weekend-off',
  payrollCycleStartDay: 1,
  payrollCycleEndDay: 30,
  workingDays: [
    { day: 'mon', type: 'full' },
    { day: 'tue', type: 'full' },
    { day: 'wed', type: 'full' },
    { day: 'thu', type: 'full' },
    { day: 'fri', type: 'full' },
  ],
  minHoursPerDay: 4,
  maxHoursPerDay: 9,
  overtimeEnabled: false,
  overtime: {},
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};
