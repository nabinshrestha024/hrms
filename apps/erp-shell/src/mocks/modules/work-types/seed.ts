import type { WorkType } from '@erp/data-access';

/**
 * Work-type seed.
 *
 * Replaces `apps/erp-shell/src/features/master-setup/schema/WorkTypeData.ts`,
 * normalised onto the canonical schema. Field roles disambiguated:
 *   `name`        = display name (was `worktype` — note the lower-cased "t"
 *                   that the form's `workType` and the existing
 *                   `Employee.workType` did not match).
 *   `description` = free-form notes (was `details`).
 */
export const workTypeSeed: WorkType[] = [
  {
    id: 'wty-001',
    name: 'On-site',
    description: 'Required to work at the office premises.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'wty-002',
    name: 'Remote',
    description: 'Fully remote working arrangement.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'wty-003',
    name: 'Hybrid',
    description: 'Combination of remote and on-site work.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
