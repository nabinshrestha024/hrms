import type { HolidayType } from '@erp/data-access';

/**
 * Holiday-type seed.
 * Mirrors the legacy `holidayData` array from
 * `apps/erp-shell/src/features/master-setup/schema/HolidayData.ts`,
 * normalised onto the canonical schema (`name` / `description` / `color`)
 * with stable ids, distinct categories, and accessible hex colors.
 */
export const holidayTypeSeed: HolidayType[] = [
  {
    id: 'hty-001',
    name: 'National Holiday',
    description: 'Mandatory holidays observed nationwide',
    color: '#A855F7',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'hty-002',
    name: 'Regional Holiday',
    description: 'Holidays specific to state or local regions',
    color: '#3B82F6',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'hty-003',
    name: 'Company Holiday',
    description: 'Special holidays granted by the organization',
    color: '#22C55E',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'hty-004',
    name: 'Floating Holiday',
    description: 'Optional holidays each employee may take during the year',
    color: '#EAB308',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
