import { createContext, useEffect, type ReactNode } from 'react';
import type { User } from './types';
import { useAuthStore } from './auth-store';
import { restoreSession } from './mock-auth';
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
  /** Optional async function to restore session via API. Falls back to local restoreSession(). */
  onRestoreSession?: () => Promise<{
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
    async function restore() {
      try {
        if (onRestoreSession) {
          const session = await onRestoreSession();
          if (session) {
            const token = sessionStorage.getItem(AUTH_TOKEN_KEY) ?? '';
            login(session.user, session.permissions, token);
            return;
          }
        } else {
          const session = restoreSession();
          if (session) {
            const token = sessionStorage.getItem(AUTH_TOKEN_KEY) ?? '';
            login(session.user, session.permissions, token);
            return;
          }
        }
      } catch {
        // Session restore failed — treat as logged out
      }
      setLoading(false);
    }
    restore();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
