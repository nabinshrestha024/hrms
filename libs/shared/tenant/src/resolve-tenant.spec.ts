import { describe, it, expect } from 'vitest';
import { resolveTenantSlug } from './resolve-tenant';

describe('resolveTenantSlug', () => {
  it('extracts slug from subdomain (acme.erp.app)', () => {
    expect(resolveTenantSlug('acme.erp.app', '')).toBe('acme');
  });

  it('extracts slug from 3+ part hostname', () => {
    expect(resolveTenantSlug('tenant1.app.example.com', '')).toBe('tenant1');
  });

  it('uses query param override when present', () => {
    expect(resolveTenantSlug('localhost', '?tenant=acme')).toBe('acme');
  });

  it('query param takes precedence over subdomain', () => {
    expect(resolveTenantSlug('demo.erp.app', '?tenant=acme')).toBe('acme');
  });

  it('falls back to "demo" on localhost with no param', () => {
    expect(resolveTenantSlug('localhost', '')).toBe('demo');
  });

  it('falls back to "demo" for two-part hostname (erp.app)', () => {
    expect(resolveTenantSlug('erp.app', '')).toBe('demo');
  });

  it('falls back to "demo" for bare IP', () => {
    expect(resolveTenantSlug('127.0.0.1', '')).toBe('demo');
  });
});
