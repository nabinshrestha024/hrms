export interface FormatCurrencyOptions {
  locale?: string; // e.g., 'en-US'
  currency?: string; // e.g., 'USD', 'EUR', 'NPR'
  compact?: boolean; // e.g., '$1.2K' instead of '$1,200'
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  const {
    locale = 'en-US',
    currency = 'USD',
    compact = false,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits: compact ? 0 : minimumFractionDigits,
    maximumFractionDigits: compact ? 1 : maximumFractionDigits,
  }).format(amount);
}

export function formatNumber(
  value: number,
  options: { locale?: string; compact?: boolean } = {}
): string {
  const { locale = 'en-US', compact = false } = options;

  return new Intl.NumberFormat(locale, {
    notation: compact ? 'compact' : 'standard',
  }).format(value);
}

export function formatPercent(
  value: number,
  options: { locale?: string; decimals?: number } = {}
): string {
  const { locale = 'en-US', decimals = 1 } = options;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
