import type { JobLevel } from '@erp/data-access';

/**
 * Job-level seed.
 *
 * Replaces `apps/erp-shell/src/features/master-setup/schema/JobLevelData.ts`,
 * which contained nonsensical filler ("National jobLevel" / "Regional
 * jobLevel" / a duplicated row) almost certainly carried over from a
 * find/replace of the holiday seed. This seed is real organisational
 * progression, ranked top-down (1 = highest in the org chart).
 */
export const jobLevelSeed: JobLevel[] = [
  {
    id: 'jlv-001',
    name: 'VP',
    description: 'Executive leadership; reports to C-suite.',
    rank: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'jlv-002',
    name: 'Director',
    description: 'Department leadership; owns multiple teams.',
    rank: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'jlv-003',
    name: 'Senior Manager',
    description: 'Senior team leadership; cross-team coordination.',
    rank: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'jlv-004',
    name: 'Manager',
    description: 'Team leadership; line management of ICs.',
    rank: 4,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'jlv-005',
    name: 'Senior',
    description: 'Senior individual contributor with mentoring scope.',
    rank: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'jlv-006',
    name: 'Mid',
    description: 'Mid-level individual contributor.',
    rank: 6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'jlv-007',
    name: 'Junior',
    description: 'Entry-level individual contributor.',
    rank: 7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
