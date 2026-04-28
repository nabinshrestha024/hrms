import type { LeavePayType } from '@erp/data-access';

/**
 * Leave-pay-type seed.
 *
 * Replaces `apps/erp-shell/src/features/master-setup/schema/LeaveTypeData.ts`,
 * normalised onto the canonical schema. Field roles disambiguated:
 *   `name`        = display name (was `leavetype` — note the lowercase "t").
 *   `code`        = short code (unchanged).
 *   `description` = free-form notes (was `details`).
 *
 * A "Half Paid" entry is added so the seed shows three distinct
 * categories rather than just two.
 */
export const leavePayTypeSeed: LeavePayType[] = [
  {
    id: 'lpt-001',
    name: 'Fully Paid',
    code: 'FP',
    description: 'Leave with full salary benefit.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lpt-002',
    name: 'Half Paid',
    code: 'HP',
    description: 'Leave with half the regular salary.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lpt-003',
    name: 'Not Paid',
    code: 'NP',
    description: 'Leave without salary (Leave Without Pay).',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
