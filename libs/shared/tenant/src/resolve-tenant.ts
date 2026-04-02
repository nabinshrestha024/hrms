export function resolveTenantSlug(hostname: string, search: string): string {
  const params = new URLSearchParams(search);
  const paramTenant = params.get('tenant');
  if (paramTenant) return paramTenant;

  // IP addresses (all-numeric parts) should not be treated as subdomains
  const parts = hostname.split('.');
  const isIP = parts.every((p) => /^\d+$/.test(p));
  if (!isIP && parts.length >= 3) return parts[0];

  return 'demo';
}
