import type { Shift } from '@erp/data-access';

/**
 * Shift seed.
 *
 * Replaces the legacy `shiftData` array from
 * `apps/erp-shell/src/features/configuration/schema/ShiftData.ts`.
 *
 * Field changes:
 *   - `icon` (a `LucideIcon` React component) dropped from storage —
 *     the icon is resolved at render time from `shiftType` (enum) via a
 *     small mapping in the feature layer. Schema stays JSON-serialisable.
 *   - `time` ("06:00-14:00") split into `startTime` + `endTime` (HH:MM).
 *   - `graceTime` ("15 min grace") parsed into numeric `gracePeriodMinutes`.
 *   - `break` ("30 min") parsed into numeric `breakMinutes`.
 *   - `workingHours` removed — derive from start/end times at render.
 *   - `status` ("Active") → boolean `isActive`.
 *   - `numberOfEmployees` removed — that's a derived count, not part of
 *     the shift entity. The feature card renders a placeholder until a
 *     follow-up wires the aggregate.
 *   - `title` → `name`, `days` → `applicableDays`.
 *   - Code conflict fixed: legacy "Flexible" reused "NS"; given proper "FX".
 *
 * Policy fields the form already collected (`overtimeAfterHours`,
 * `lateInMinutes`, `earlyOutMinutes`, `isDefault`) are now part of the
 * canonical schema with sensible defaults.
 */
export const shiftSeed: Shift[] = [
  {
    id: 'sft-001',
    name: 'Morning Shift',
    code: 'MS',
    shiftType: 'Morning',
    startTime: '06:00',
    endTime: '14:00',
    breakMinutes: 30,
    gracePeriodMinutes: 15,
    overtimeAfterHours: 9,
    lateInMinutes: 15,
    earlyOutMinutes: 15,
    applicableDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    isActive: true,
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sft-002',
    name: 'Day Shift',
    code: 'DS',
    shiftType: 'Day',
    startTime: '09:00',
    endTime: '18:00',
    breakMinutes: 60,
    gracePeriodMinutes: 15,
    overtimeAfterHours: 9,
    lateInMinutes: 15,
    earlyOutMinutes: 15,
    applicableDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    isActive: true,
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sft-003',
    name: 'Evening Shift',
    code: 'ES',
    shiftType: 'Evening',
    startTime: '14:00',
    endTime: '22:00',
    breakMinutes: 30,
    gracePeriodMinutes: 15,
    applicableDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    isActive: true,
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sft-004',
    name: 'Night Shift',
    code: 'NS',
    shiftType: 'Night',
    startTime: '22:00',
    endTime: '06:00',
    breakMinutes: 30,
    gracePeriodMinutes: 15,
    applicableDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    isActive: true,
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sft-005',
    name: 'Flexible',
    code: 'FX',
    shiftType: 'Flexible',
    startTime: '09:00',
    endTime: '18:00',
    breakMinutes: 30,
    gracePeriodMinutes: 15,
    applicableDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    isActive: true,
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
