import { createContext, useEffect, type ReactNode } from 'react';
import type { User } from './types';
import { useAuthStore } from './auth-store';
import { AUTH_TOKEN_KEY } from './constants';

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  /**
   * Async function that restores the user's session via the backend
   * (e.g. GET /auth/session with the httpOnly cookie). REQUIRED — there
   * is no client-side fallback so unsigned tokens cannot be trusted.
   */
  onRestoreSession: () => Promise<{
    user: User;
    permissions: string[];
  } | null>;
}

export function AuthProvider({
  children,
  onRestoreSession,
}: AuthProviderProps) {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  useEffect(() => {
    let cancelled = false;
    async function restore() {
      try {
        const session = await onRestoreSession();
        if (cancelled) return;
        if (session) {
          const token = sessionStorage.getItem(AUTH_TOKEN_KEY) ?? '';
          login(session.user, session.permissions, token);
          return;
        }
      } catch {
        // Session restore failed — treat as logged out
      }
      if (!cancelled) setLoading(false);
    }
    restore();
    return () => {
      cancelled = true;
    };
  }, [onRestoreSession, login, setLoading]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
