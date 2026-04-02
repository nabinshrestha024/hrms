import type { JWTPayload } from './types';

interface MockUser {
  email: string;
  password: string;
  payload: Omit<JWTPayload, 'exp'>;
}

const MOCK_USERS: Record<string, MockUser[]> = {
  t_demo_001: [
    {
      email: 'admin@gmail.com',
      password: 'Test@123',
      payload: {
        sub: 'usr_001',
        tenantId: 't_demo_001',
        email: 'admin@gmail.com',
        name: 'Admin User',
        role: 'admin',
        permissions: [
          'hr:employees:read',
          'hr:employees:create',
          'hr:employees:update',
          'hr:employees:delete',
          'hr:departments:read',
          'hr:departments:create',
          'hr:departments:update',
          'payroll:runs:read',
          'payroll:runs:create',
          'payroll:runs:approve',
          'attendance:records:read',
          'attendance:records:create',
          'leave:requests:read',
          'leave:requests:create',
          'leave:requests:approve',
          'tasks:tasks:read',
          'tasks:tasks:create',
          'tasks:tasks:update',
          'recruitment:jobs:read',
          'recruitment:jobs:create',
          'settings:general:read',
          'settings:general:update',
          'settings:roles:read',
          'settings:roles:update',
        ],
      },
    },
    {
      email: 'hr@gmail.com',
      password: 'Test@123',
      payload: {
        sub: 'usr_002',
        tenantId: 't_demo_001',
        email: 'hr@gmail.com',
        name: 'HR Manager',
        role: 'hr_manager',
        permissions: [
          'hr:employees:read',
          'hr:employees:create',
          'hr:employees:update',
          'hr:departments:read',
          'leave:requests:read',
          'leave:requests:approve',
          'attendance:records:read',
        ],
      },
    },
    {
      email: 'emp@gmail.com',
      password: 'Test@123',
      payload: {
        sub: 'usr_003',
        tenantId: 't_demo_001',
        email: 'emp@gmail.com',
        name: 'John Employee',
        role: 'employee',
        permissions: [
          'hr:employees:read',
          'leave:requests:read',
          'leave:requests:create',
          'attendance:records:read',
          'attendance:records:create',
          'tasks:tasks:read',
          'tasks:tasks:update',
        ],
      },
    },
  ],
  t_acme_002: [
    {
      email: 'admin@acme.com',
      password: 'Test@123',
      payload: {
        sub: 'usr_010',
        tenantId: 't_acme_002',
        email: 'admin@acme.com',
        name: 'Acme Admin',
        role: 'admin',
        permissions: [
          'hr:employees:read',
          'hr:employees:create',
          'hr:employees:update',
          'hr:employees:delete',
          'hr:departments:read',
          'hr:departments:create',
          'attendance:records:read',
          'attendance:records:create',
          'leave:requests:read',
          'leave:requests:create',
          'leave:requests:approve',
          'settings:general:read',
          'settings:general:update',
        ],
      },
    },
  ],
};

export function findMockUser(
  tenantId: string,
  email: string,
  password: string
) {
  const tenantUsers = MOCK_USERS[tenantId];
  if (!tenantUsers) return null;
  return (
    tenantUsers.find((u) => u.email === email && u.password === password) ??
    null
  );
}
