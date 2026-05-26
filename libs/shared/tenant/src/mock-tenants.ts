import type { TenantConfig } from './types';

export const MOCK_TENANTS: Record<string, TenantConfig> = {
  demo: {
    id: 't_demo_001',
    slug: 'demo',
    name: 'Demo Company',
    plan: 'professional',
    status: 'active',
    modulesEnabled: [
      'hr',
      'payroll',
      'attendance',
      'leave',
      'tasks',
      'recruitment',
      'documents',
      'assets',
      'calendar',
      'company-setup',
      'configuration',
      'onboarding',
      'assign-approver',
      'directories',
      'employee',
      'policy-configuration',
    ],
    maxEmployees: 500,
    locale: 'en-US',
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    ssoEnabled: false,
    ssoEnforce: false,
    branding: {
      logoUrl: '',
      faviconUrl: '/favicon.ico',
      appTitle: 'Global Square IT',
    },
    theme: {
      colors: {
        primary: '#4f39f6',
        primaryForeground: '#e0e7ff',
        background: '#f9fafb',
        foreground: 'oklch(0.145 0.004 286)',
        muted: '#f4f4f5',
        border: 'oklch(0.922 0.004 286)',
        dark: {},
      },
    },
  },
  acme: {
    id: 't_acme_002',
    slug: 'acme',
    name: 'Acme Corp',
    plan: 'starter',
    status: 'active',
    modulesEnabled: ['hr', 'attendance', 'leave'],
    maxEmployees: 50,
    locale: 'en-US',
    timezone: 'America/Chicago',
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    ssoEnabled: false,
    ssoEnforce: false,
    branding: {
      logoUrl: '',
      faviconUrl: '/favicon.ico',
      appTitle: 'Acme Corp HR',
    },
    theme: {
      colors: {
        // Acme overrides three core tokens (primary brand, card surface,
        // info accent) to demonstrate the tenant theming pipeline. Demo
        // tenant uses defaults from app.css :root.
        primary: '#0F766E', // teal/700 — Acme brand
        primaryForeground: '#CCFBF1', // teal/100
        card: '#F0FDFA', // teal/50 — surface tint
        info: '#0EA5E9', // sky/500
        infoForeground: '#F0F9FF',
        background: '#f9fafb',
        foreground: 'oklch(0.145 0.004 286)',
        muted: '#f4f4f5',
        border: 'oklch(0.922 0.004 286)',
        dark: {
          primary: 'oklch(0.60 0.22 145)',
          background: 'oklch(0.145 0 0)',
          foreground: 'oklch(0.985 0 0)',
          muted: 'oklch(0.17 0 0)',
          border: 'oklch(0.25 0 0)',
        },
      },
      borderRadius: '0.75rem',
    },
  },
};

export async function fetchTenantConfig(slug: string): Promise<TenantConfig> {
  await new Promise((r) => setTimeout(r, 100));
  const config = MOCK_TENANTS[slug];
  if (!config) throw new Error(`Tenant "${slug}" not found`);
  return config;
}
