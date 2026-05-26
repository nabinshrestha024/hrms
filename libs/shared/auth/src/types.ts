export interface JWTPayload {
  sub: string;
  tenantId: string;
  email: string;
  name: string;
  role: Role;
  permissions: string[];
  exp: number;
}
export type Role = 'admin' | 'hr_manager' | 'employee';
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  tenantId: string;
}

export interface AuthState {
  user: User | null;
  permissions: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenantId: string;
}
