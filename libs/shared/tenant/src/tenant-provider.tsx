import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { TenantConfig } from './types';
import { resolveTenantSlug } from './resolve-tenant';
import { fetchTenantConfig } from './mock-tenants';
import { applyTenantTheme } from './apply-theme';
import { applyTenantBranding } from './apply-branding';

interface TenantContextValue {
  tenant: TenantConfig;
  slug: string;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const TenantContext = createContext<TenantContextValue | null>(null);

interface TenantProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function TenantProvider({ children, fallback }: TenantProviderProps) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDarkState] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('erp-theme') === 'dark';
  });

  const slug =
    typeof window !== 'undefined'
      ? resolveTenantSlug(window.location.hostname, window.location.search)
      : 'demo';

  useEffect(() => {
    fetchTenantConfig(slug)
      .then((config) => {
        setTenant(config);
        applyTenantTheme(config.theme, isDark);
        applyTenantBranding(config.branding);
      })
      .catch((err) => setError(err.message));
  }, [slug]);

  useEffect(() => {
    if (!tenant) return;
    applyTenantTheme(tenant.theme, isDark);
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('erp-theme', isDark ? 'dark' : 'light');
  }, [isDark, tenant]);

  const setIsDark = (dark: boolean) => setIsDarkState(dark);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Tenant Not Found</h1>
          <p className="mt-2 text-gray-600">
            Could not load configuration for "{slug}"
          </p>
        </div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <>
        {fallback ?? (
          <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
      </>
    );
  }

  return (
    <TenantContext.Provider value={{ tenant, slug, isDark, setIsDark }}>
      {children}
    </TenantContext.Provider>
  );
}
