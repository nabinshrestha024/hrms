import type { Currency } from '@erp/data-access';

/**
 * Currency seed.
 * Mirrors the legacy `currencyData` array from
 * `apps/erp-shell/src/features/master-setup/schema/CurrencyData.ts`,
 * normalised onto the canonical schema. Field roles disambiguated:
 *   `code`   = ISO 4217 (was the misnamed `currencyName`)
 *   `name`   = full display name (was the misnamed `details`)
 *   `symbol` = display glyph (was `currencySymbol`)
 */
export const currencySeed: Currency[] = [
  {
    id: 'cur-001',
    code: 'NPR',
    name: 'Nepalese Rupee',
    symbol: 'रू',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cur-002',
    code: 'USD',
    name: 'United States Dollar',
    symbol: '$',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cur-003',
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
