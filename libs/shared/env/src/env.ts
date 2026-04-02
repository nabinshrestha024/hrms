export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 30000),
  authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'erp-token',
  authSessionDuration: Number(
    import.meta.env.VITE_AUTH_SESSION_DURATION ?? 86400
  ),
  defaultTenant: import.meta.env.VITE_DEFAULT_TENANT ?? 'demo',
  enableMockAuth: import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true',
  enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API !== 'false',
  enablePlugins: import.meta.env.VITE_ENABLE_PLUGINS === 'true',
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
} as const;
