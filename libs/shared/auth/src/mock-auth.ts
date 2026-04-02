import type { JWTPayload, LoginCredentials, User } from './types';
import { findMockUser } from './mock-users';
import { AUTH_TOKEN_KEY } from './constants';

export async function mockLogin(credentials: LoginCredentials): Promise<{
  user: User;
  permissions: string[];
  token: string;
}> {
  await new Promise((r) => setTimeout(r, 300));

  const mockUser = findMockUser(
    credentials.tenantId,
    credentials.email,
    credentials.password
  );
  if (!mockUser) {
    throw new Error('Invalid email or password');
  }

  const payload: JWTPayload = {
    ...mockUser.payload,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  };

  const token = btoa(JSON.stringify(payload));

  const user: User = {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    tenantId: payload.tenantId,
  };

  return { user, permissions: payload.permissions, token };
}

export function restoreSession(): { user: User; permissions: string[] } | null {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;

  try {
    const payload: JWTPayload = JSON.parse(atob(token));
    if (payload.exp * 1000 < Date.now()) {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    }
    return {
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        tenantId: payload.tenantId,
      },
      permissions: payload.permissions,
    };
  } catch {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    return null;
  }
}
