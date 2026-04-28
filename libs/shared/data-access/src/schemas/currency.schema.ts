import { z } from 'zod';
import { idSchema, timestampsSchema } from './common.schema';

// ---------------------------------------------------------------------------
// Currency — a currency master record (e.g. NPR / Nepalese Rupee / रू).
// ---------------------------------------------------------------------------

export const currencySchema = z.object({
  id: idSchema,
  /**
   * ISO 4217-style code, uppercase, three letters (e.g. "NPR", "USD").
   * Used as the canonical identifier across payroll/exchange-rate flows.
   */
  code: z
    .string()
    .min(3)
    .max(3)
    .regex(/^[A-Z]{3}$/, 'Currency code must be three uppercase letters'),
  /** Full display name, e.g. "Nepalese Rupee". */
  name: z.string().min(1).max(100),
  /** Display symbol, e.g. "रू", "$", "€". */
  symbol: z.string().min(1).max(10),
  /** Optional free-form notes shown on the master-setup page. */
  description: z.string().max(500).optional(),
  ...timestampsSchema.shape,
});

export type Currency = z.infer<typeof currencySchema>;

// ---------------------------------------------------------------------------
// Create / Update DTOs
// ---------------------------------------------------------------------------

export const createCurrencySchema = currencySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateCurrencyInput = z.infer<typeof createCurrencySchema>;

export const updateCurrencySchema = createCurrencySchema.partial();

export type UpdateCurrencyInput = z.infer<typeof updateCurrencySchema>;

// ---------------------------------------------------------------------------
// List filters (kept separate from `listParamsSchema` — see
// holiday-type.schema.ts for the rationale).
// ---------------------------------------------------------------------------

export const currencyFiltersSchema = z.object({
  search: z.string().optional(),
});

export type CurrencyFilters = z.infer<typeof currencyFiltersSchema>;
