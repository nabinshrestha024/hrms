/**
 * Permission strings used by `<Can>` and `RouteGuard`.
 *
 * Format: `<group>:<resource>:<action>` — `SimpleAbility` joins
 * `subject` + `action` with a `:` and looks the result up against the
 * user's `permissions[]` array, so the constants below map onto how
 * `<Can action="create" subject="hr:employees">` is evaluated.
 *
 * Why constants instead of free-form strings: typo'd permission strings
 * silently grant nothing (the user just doesn't see the button). Routing
 * every consumer through the constants here makes typos a build error.
 */

// ---------------------------------------------------------------------------
// Resource subjects (the second-and-third segments of the permission string)
// ---------------------------------------------------------------------------

export const PERM_SUBJECTS = {
  HR_EMPLOYEES: 'hr:employees',
  HR_DEPARTMENTS: 'hr:departments',
  HR_BRANCHES: 'hr:branches',
  HR_DIRECTORIES: 'hr:directories',
  HR_NOTICE: 'hr:notice',

  ATTENDANCE_RECORDS: 'attendance:records',

  LEAVE_REQUESTS: 'leave:requests',
  LEAVE_TYPES: 'leave:types',

  DOCUMENTS_REVIEWS: 'documents:reviews',
  DOCUMENTS_TEMPLATES: 'documents:templates',
  DOCUMENTS_CATEGORIES: 'documents:categories',
  DOCUMENTS_ASSIGNMENTS: 'documents:assignments',
  DOCUMENTS_VISIBILITY: 'documents:visibility',

  ASSETS_ITEMS: 'assets:items',
  ASSETS_CATEGORIES: 'assets:categories',

  MASTER_HOLIDAY_TYPES: 'master:holiday-types',
  MASTER_CURRENCIES: 'master:currencies',
  MASTER_JOB_LEVELS: 'master:job-levels',
  MASTER_WORK_TYPES: 'master:work-types',
  MASTER_LEAVE_PAY_TYPES: 'master:leave-pay-types',

  CONFIG_HOLIDAYS: 'config:holidays',
  CONFIG_SHIFTS: 'config:shifts',
  CONFIG_WORK_WEEK: 'config:work-week',

  POLICY_LEAVE_DEDUCTION: 'policy:leave-deduction',
  POLICY_SANDWICH_RULE: 'policy:sandwich-rule',
  POLICY_WORKFLOW: 'policy:workflow',
  POLICY_PAYROLL: 'policy:payroll',

  SETTINGS_GENERAL: 'settings:general',
  SETTINGS_ROLES: 'settings:roles',

  // Legacy / cross-module subjects retained for backwards compatibility
  // with the seed permissions baked into existing mock users.
  PAYROLL_RUNS: 'payroll:runs',
  TASKS: 'tasks:tasks',
  RECRUITMENT_JOBS: 'recruitment:jobs',
} as const;

export type PermSubject = (typeof PERM_SUBJECTS)[keyof typeof PERM_SUBJECTS];

// ---------------------------------------------------------------------------
// Action verbs — the third segment.
//
// We use a small fixed verb set rather than free strings so the
// permission space is enumerable.
// ---------------------------------------------------------------------------

export const PERM_ACTIONS = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  APPROVE: 'approve',
  REJECT: 'reject',
  ASSIGN: 'assign',
  RETURN: 'return',
} as const;

export type PermAction = (typeof PERM_ACTIONS)[keyof typeof PERM_ACTIONS];

// ---------------------------------------------------------------------------
// Helper to build the full string used in mock-users.ts seeds.
// Consumers of `<Can>` pass `subject` + `action` separately, but the
// stored permission set is the joined string.
// ---------------------------------------------------------------------------

export function perm(subject: PermSubject, action: PermAction): string {
  return `${subject}:${action}`;
}

/** All actions for a given subject — sugar for the role-builders below. */
export function permsFor(
  subject: PermSubject,
  actions: PermAction[]
): string[] {
  return actions.map((a) => perm(subject, a));
}

// ---------------------------------------------------------------------------
// Role bundles — what a typical admin / hr / employee gets. mock-users
// composes from these; future server-side role definitions can mirror
// the same shape.
// ---------------------------------------------------------------------------

const CRUD: PermAction[] = ['read', 'create', 'update', 'delete'];
const READ_ONLY: PermAction[] = ['read'];

export const ADMIN_PERMISSIONS: string[] = [
  ...permsFor(PERM_SUBJECTS.HR_EMPLOYEES, CRUD),
  ...permsFor(PERM_SUBJECTS.HR_DEPARTMENTS, CRUD),
  ...permsFor(PERM_SUBJECTS.HR_BRANCHES, CRUD),
  ...permsFor(PERM_SUBJECTS.HR_DIRECTORIES, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.HR_NOTICE, ['create']),

  ...permsFor(PERM_SUBJECTS.ATTENDANCE_RECORDS, [...CRUD, 'approve']),

  ...permsFor(PERM_SUBJECTS.LEAVE_REQUESTS, [...CRUD, 'approve', 'reject']),
  ...permsFor(PERM_SUBJECTS.LEAVE_TYPES, CRUD),

  ...permsFor(PERM_SUBJECTS.DOCUMENTS_REVIEWS, [
    ...READ_ONLY,
    'approve',
    'reject',
  ]),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_TEMPLATES, CRUD),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_CATEGORIES, CRUD),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_ASSIGNMENTS, ['create']),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_VISIBILITY, [...READ_ONLY, 'update']),

  ...permsFor(PERM_SUBJECTS.ASSETS_ITEMS, [...CRUD, 'assign', 'return']),
  ...permsFor(PERM_SUBJECTS.ASSETS_CATEGORIES, CRUD),

  ...permsFor(PERM_SUBJECTS.MASTER_HOLIDAY_TYPES, CRUD),
  ...permsFor(PERM_SUBJECTS.MASTER_CURRENCIES, CRUD),
  ...permsFor(PERM_SUBJECTS.MASTER_JOB_LEVELS, CRUD),
  ...permsFor(PERM_SUBJECTS.MASTER_WORK_TYPES, CRUD),
  ...permsFor(PERM_SUBJECTS.MASTER_LEAVE_PAY_TYPES, CRUD),

  ...permsFor(PERM_SUBJECTS.CONFIG_HOLIDAYS, CRUD),
  ...permsFor(PERM_SUBJECTS.CONFIG_SHIFTS, CRUD),
  ...permsFor(PERM_SUBJECTS.CONFIG_WORK_WEEK, [...READ_ONLY, 'update']),

  ...permsFor(PERM_SUBJECTS.POLICY_LEAVE_DEDUCTION, [...READ_ONLY, 'update']),
  ...permsFor(PERM_SUBJECTS.POLICY_SANDWICH_RULE, [...READ_ONLY, 'update']),
  ...permsFor(PERM_SUBJECTS.POLICY_WORKFLOW, [...READ_ONLY, 'update']),
  ...permsFor(PERM_SUBJECTS.POLICY_PAYROLL, [...READ_ONLY, 'update']),

  ...permsFor(PERM_SUBJECTS.SETTINGS_GENERAL, [...READ_ONLY, 'update']),
  ...permsFor(PERM_SUBJECTS.SETTINGS_ROLES, [...READ_ONLY, 'update']),

  ...permsFor(PERM_SUBJECTS.PAYROLL_RUNS, [...READ_ONLY, 'create', 'approve']),
  ...permsFor(PERM_SUBJECTS.TASKS, [...READ_ONLY, 'create', 'update']),
  ...permsFor(PERM_SUBJECTS.RECRUITMENT_JOBS, [...READ_ONLY, 'create']),
];

export const HR_MANAGER_PERMISSIONS: string[] = [
  // HR can manage employees + departments + directory but not branch CRUD.
  ...permsFor(PERM_SUBJECTS.HR_EMPLOYEES, ['read', 'create', 'update']),
  ...permsFor(PERM_SUBJECTS.HR_DEPARTMENTS, ['read']),
  ...permsFor(PERM_SUBJECTS.HR_BRANCHES, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.HR_DIRECTORIES, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.HR_NOTICE, ['create']),

  ...permsFor(PERM_SUBJECTS.ATTENDANCE_RECORDS, READ_ONLY),

  // HR approves/rejects leave but does not manage leave-type policy.
  ...permsFor(PERM_SUBJECTS.LEAVE_REQUESTS, [
    ...READ_ONLY,
    'create',
    'approve',
    'reject',
  ]),
  ...permsFor(PERM_SUBJECTS.LEAVE_TYPES, READ_ONLY),

  // Document review: read + approve/reject submitted documents,
  // assign templates, but no template/category CRUD.
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_REVIEWS, [
    ...READ_ONLY,
    'approve',
    'reject',
  ]),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_TEMPLATES, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_CATEGORIES, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_ASSIGNMENTS, ['create']),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_VISIBILITY, READ_ONLY),

  ...permsFor(PERM_SUBJECTS.ASSETS_ITEMS, [
    ...READ_ONLY,
    'create',
    'update',
    'assign',
    'return',
  ]),
  ...permsFor(PERM_SUBJECTS.ASSETS_CATEGORIES, READ_ONLY),

  ...permsFor(PERM_SUBJECTS.CONFIG_HOLIDAYS, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.CONFIG_SHIFTS, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.CONFIG_WORK_WEEK, READ_ONLY),
];

export const EMPLOYEE_PERMISSIONS: string[] = [
  // Self-service only.
  ...permsFor(PERM_SUBJECTS.HR_EMPLOYEES, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.HR_DIRECTORIES, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.HR_NOTICE, READ_ONLY),

  ...permsFor(PERM_SUBJECTS.ATTENDANCE_RECORDS, [...READ_ONLY, 'create']),

  ...permsFor(PERM_SUBJECTS.LEAVE_REQUESTS, [...READ_ONLY, 'create']),
  ...permsFor(PERM_SUBJECTS.LEAVE_TYPES, READ_ONLY),

  ...permsFor(PERM_SUBJECTS.DOCUMENTS_REVIEWS, READ_ONLY),
  ...permsFor(PERM_SUBJECTS.DOCUMENTS_VISIBILITY, READ_ONLY),

  ...permsFor(PERM_SUBJECTS.ASSETS_ITEMS, READ_ONLY),

  ...permsFor(PERM_SUBJECTS.TASKS, [...READ_ONLY, 'update']),
];
