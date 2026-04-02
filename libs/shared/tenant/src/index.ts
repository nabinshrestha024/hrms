export type { TenantConfig, TenantBranding, TenantTheme } from './types';
export { resolveTenantSlug } from './resolve-tenant';
export { applyTenantTheme, clearTenantTheme } from './apply-theme';
export { applyTenantBranding } from './apply-branding';
export { MOCK_TENANTS, fetchTenantConfig } from './mock-tenants';
export { TenantProvider } from './tenant-provider';
export { useTenant } from './use-tenant';
