import type { Holiday } from '@erp/data-access';

/**
 * Holidays calendar seed.
 *
 * Replaces the legacy `holidayTableData` array from
 * `apps/erp-shell/src/features/configuration/schema/HolidayData.ts`.
 * Field changes:
 *   - `day` (e.g. "Thursday") dropped from the schema; deterministically
 *     derivable from `date` at render time.
 *   - `date` normalised to ISO `YYYY-MM-DD` (was `YYYY/MM/DD`).
 *   - `description` becomes optional.
 *
 * The original list had two entries; extending lightly so the calendar
 * shows a more useful preview.
 */
export const holidaySeed: Holiday[] = [
  {
    id: 'hol-001',
    name: "New Year's Day",
    date: '2026-01-01',
    type: 'National',
    description: 'New Year celebration.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'hol-002',
    name: 'Office Anniversary',
    date: '2026-07-05',
    type: 'Company',
    description: '3rd Year.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'hol-003',
    name: 'Republic Day',
    date: '2026-05-29',
    type: 'National',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
