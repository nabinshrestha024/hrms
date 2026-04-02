import { describe, it, expect, beforeEach } from 'vitest';
import { applyTenantTheme } from './apply-theme';
import type { TenantTheme } from './types';

const mockTheme: TenantTheme = {
  colors: {
    primary: 'oklch(0.50 0.20 145)',
    primaryForeground: 'oklch(0.98 0 0)',
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.15 0 0)',
    muted: 'oklch(0.97 0 0)',
    border: 'oklch(0.92 0 0)',
    dark: {
      primary: 'oklch(0.60 0.22 145)',
      primaryForeground: 'oklch(0.10 0 0)',
      background: 'oklch(0.15 0 0)',
      foreground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.20 0 0)',
      border: 'oklch(0.27 0 0)',
    },
  },
  borderRadius: '0.75rem',
};

describe('applyTenantTheme', () => {
  beforeEach(() => {
    document.documentElement.style.cssText = '';
  });

  it('sets light mode CSS variables on :root', () => {
    applyTenantTheme(mockTheme, false);
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--primary')).toBe(
      'oklch(0.50 0.20 145)'
    );
    expect(root.style.getPropertyValue('--background')).toBe('oklch(1 0 0)');
  });

  it('sets dark mode CSS variables when isDark is true', () => {
    applyTenantTheme(mockTheme, true);
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--primary')).toBe(
      'oklch(0.60 0.22 145)'
    );
    expect(root.style.getPropertyValue('--background')).toBe('oklch(0.15 0 0)');
  });

  it('sets border radius', () => {
    applyTenantTheme(mockTheme, false);
    expect(document.documentElement.style.getPropertyValue('--radius')).toBe(
      '0.75rem'
    );
  });

  it('handles theme without optional fields', () => {
    const minimal: TenantTheme = {
      colors: {
        primary: 'oklch(0.5 0.2 200)',
        primaryForeground: 'oklch(1 0 0)',
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.1 0 0)',
        muted: 'oklch(0.9 0 0)',
        border: 'oklch(0.8 0 0)',
        dark: {},
      },
    };
    expect(() => applyTenantTheme(minimal, false)).not.toThrow();
  });
});
