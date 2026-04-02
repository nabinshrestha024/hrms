import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { ApiClient, type ApiError } from './api-client';

const ApiClientContext = createContext<ApiClient | null>(null);

interface ApiProviderProps {
  children: ReactNode;
  baseUrl: string;
  getToken?: () => string | null;
  timeout?: number;
  /** Called on every API error. Wire this to toast(). */
  onError?: (error: ApiError) => void;
  /** Called on 401 responses. Wire this to redirect to /login. */
  onUnauthorized?: () => void;
}

export function ApiProvider({
  children,
  baseUrl,
  getToken,
  timeout,
  onError,
  onUnauthorized,
}: ApiProviderProps) {
  const client = useMemo(
    () =>
      new ApiClient({
        baseUrl,
        getToken,
        timeout,
        onError,
        onUnauthorized,
      }),
    [baseUrl, getToken, timeout, onError, onUnauthorized],
  );

  return (
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  );
}

export function useApiClient(): ApiClient {
  const client = useContext(ApiClientContext);
  if (!client) throw new Error('useApiClient must be used within ApiProvider');
  return client;
}
