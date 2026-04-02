import type { TenantBranding } from './types';

export function applyTenantBranding(branding: TenantBranding): void {
  document.title = branding.appTitle;

  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = branding.faviconUrl;

  if (branding.fontFamily) {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      branding.fontFamily
    )}:wght@400;500;600;700&display=swap`;
    let fontLink = document.querySelector<HTMLLinkElement>(
      'link[data-tenant-font]'
    );
    if (!fontLink) {
      fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.setAttribute('data-tenant-font', 'true');
      document.head.appendChild(fontLink);
    }
    fontLink.href = fontUrl;
    document.documentElement.style.setProperty(
      '--font-sans',
      `'${branding.fontFamily}', ui-sans-serif, system-ui, sans-serif`
    );
  }
}
