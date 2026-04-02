export interface JWTPayload {
  sub: string;
  tenantId: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  exp: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
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
