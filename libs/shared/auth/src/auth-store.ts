import { create } from 'zustand';
import type { AuthState, User } from './types';
import { AUTH_TOKEN_KEY } from './constants';

interface AuthStore extends AuthState {
  login: (user: User, permissions: string[], token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  permissions: [],
  isAuthenticated: false,
  isLoading: true,

  login: (user, permissions, token) => {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    set({ user, permissions, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    set({
      user: null,
      permissions: [],
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (isLoading) => set({ isLoading }),
}));
