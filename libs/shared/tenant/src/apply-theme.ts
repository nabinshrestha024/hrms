import type { TenantTheme } from './types';

const COLOR_KEY_TO_CSS_VAR: Record<string, string> = {
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  background: '--background',
  foreground: '--foreground',
  muted: '--muted',
  border: '--border',
  accent: '--accent',
  destructive: '--destructive',
};

export function applyTenantTheme(theme: TenantTheme, isDark: boolean): void {
  const root = document.documentElement;
  const colors = isDark && Object.keys(theme.colors.dark).length > 0
    ? theme.colors.dark
    : theme.colors;

  for (const [key, value] of Object.entries(colors)) {
    if (key === 'dark') continue;
    const cssVar = COLOR_KEY_TO_CSS_VAR[key];
    if (cssVar && typeof value === 'string') {
      root.style.setProperty(cssVar, value);
    }
  }

  if (theme.borderRadius) {
    root.style.setProperty('--radius', theme.borderRadius);
  }
}

export function clearTenantTheme(): void {
  const root = document.documentElement;
  for (const cssVar of Object.values(COLOR_KEY_TO_CSS_VAR)) {
    root.style.removeProperty(cssVar);
  }
  root.style.removeProperty('--radius');
}
