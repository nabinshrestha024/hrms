export { SimpleAbility } from './ability';
export type { Ability } from './ability';
export { AbilityProvider } from './ability-provider';
export { AuthProvider } from './auth-provider';
export { useAuthStore, authReady } from './auth-store';
export { Can } from './can';
export { AUTH_TOKEN_KEY } from './constants';
export { RouteGuard } from './route-guard';
export type { AuthState, JWTPayload, LoginCredentials, User } from './types';
export { useAbility } from './use-ability';
export { useAuth } from './use-auth';

// NOTE: mockLogin / restoreSession are NOT exported from the public barrel.
// Import them directly from '@erp/auth/dev' for development/testing only.
