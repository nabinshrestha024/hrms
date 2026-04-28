import type { LeaveType } from '@erp/data-access';

/**
 * Leave-type seed.
 *
 * Replaces the legacy `configurationleaveTypeData` array from
 * `apps/erp-shell/src/features/configuration/schema/LeaveTypeData.ts`.
 *
 * Field changes (stringly-typed → structured):
 *   leaveType   "Annual Leave"   -> name
 *   days        21               -> daysPerYear
 *   applicableTo "All"           -> applicableTo: 'all' | 'female' | 'male'
 *   carryOver   "Max 5" / "No"   -> { enabled, maxDays? }
 *   encashable  "Max 10" / "No"  -> { enabled, maxDays? }
 *   paid        "Yes" / "No"     -> paid: boolean
 *
 * The display strings ("Max 5", "No", "Yes") are reconstructed in the
 * table cell so the original column appearance is preserved.
 */
export const leaveTypeSeed: LeaveType[] = [
  {
    id: 'lvt-001',
    name: 'Annual Leave',
    daysPerYear: 21,
    applicableTo: 'all',
    paid: true,
    carryOver: { enabled: true, maxDays: 5 },
    encashable: { enabled: true, maxDays: 10 },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lvt-002',
    name: 'Sick Leave',
    daysPerYear: 12,
    applicableTo: 'all',
    paid: true,
    carryOver: { enabled: false },
    encashable: { enabled: false },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lvt-003',
    name: 'Maternity Leave',
    daysPerYear: 90,
    applicableTo: 'female',
    paid: true,
    carryOver: { enabled: false },
    encashable: { enabled: false },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lvt-004',
    name: 'Paternity Leave',
    daysPerYear: 15,
    applicableTo: 'male',
    paid: true,
    carryOver: { enabled: false },
    encashable: { enabled: false },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
