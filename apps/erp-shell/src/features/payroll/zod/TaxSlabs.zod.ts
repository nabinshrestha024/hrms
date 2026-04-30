import z from 'zod';

export const taxConfig = z.object({
  minAmount: z.string().min(1, 'This field is required'),
  maxAmount: z.string().min(1, 'This field is required'),
  rate: z.string().min(1, 'This field is required'),
  description: z.string().min(1, 'This field is required'),
});

export const taxSlabTemplateSchema = z.object({
  fiscalYear: z.string().optional(),
  maritalStatus: z.string().optional(),

  config: z.array(taxConfig).min(1),
  femaleTaxpayerRebate: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
  socialSecurityFundRebate: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
  lifeInsurancePremiumRebate: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
  medicalInsuranceRebate: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
});

export type TaxSlabTemplateFormValue = z.infer<typeof taxSlabTemplateSchema>;
