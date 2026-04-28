export interface TenantConfig {
  id: string;
  slug: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  modulesEnabled: string[];
  maxEmployees: number;
  locale: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  ssoEnabled: boolean;
  ssoEnforce: boolean;
  branding: TenantBranding;
  theme: TenantTheme;
}

export interface TenantBranding {
  logoUrl: string;
  faviconUrl: string;
  appTitle: string;
  fontFamily?: string;
}

export interface TenantTheme {
  colors: {
    primary: string;
    primaryForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground?: string;
    border: string;
    accent?: string;
    accentForeground?: string;
    destructive?: string;
    destructiveForeground?: string;
    card?: string;
    cardForeground?: string;
    popover?: string;
    popoverForeground?: string;
    sidebar?: string;
    sidebarForeground?: string;
    info?: string;
    infoForeground?: string;
    success?: string;
    successForeground?: string;
    warning?: string;
    warningForeground?: string;
    dark: Record<string, string>;
  };
  borderRadius?: string;
}
