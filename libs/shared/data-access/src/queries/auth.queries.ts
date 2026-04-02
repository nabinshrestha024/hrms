import { useMutation, useQuery } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  loginResponseSchema,
  sessionResponseSchema,
  type LoginInput,
  type LoginResponse,
  type SessionResponse,
} from '../schemas/auth.schema';

// ── Query Keys ──────────────────────────────────────────────────────

export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};

// ── Hooks ───────────────────────────────────────────────────────────

/**
 * Login mutation.
 * POST /auth/login → { user, permissions, token }
 */
export function useLogin() {
  const client = useApiClient();
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (input) => {
      const { data } = await client.post('/auth/login', input);
      return loginResponseSchema.parse(data);
    },
  });
}

/**
 * Session restore query.
 * GET /auth/session → { user, permissions }
 * Only runs when a token exists in sessionStorage.
 */
export function useSession(options?: { enabled?: boolean }) {
  const client = useApiClient();
  return useQuery<SessionResponse | null>({
    queryKey: authKeys.session(),
    queryFn: async () => {
      try {
        const { data } = await client.get('/auth/session');
        return sessionResponseSchema.parse(data);
      } catch {
        return null;
      }
    },
    enabled: options?.enabled ?? true,
    retry: false,
    staleTime: Infinity,
  });
}
