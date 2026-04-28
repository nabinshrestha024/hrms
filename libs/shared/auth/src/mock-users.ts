import {
  ADMIN_PERMISSIONS,
  EMPLOYEE_PERMISSIONS,
  HR_MANAGER_PERMISSIONS,
} from './permissions';
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
        permissions: ADMIN_PERMISSIONS,
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
        permissions: HR_MANAGER_PERMISSIONS,
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
        permissions: EMPLOYEE_PERMISSIONS,
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
        permissions: ADMIN_PERMISSIONS,
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
