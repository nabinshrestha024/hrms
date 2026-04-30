import z from 'zod';

export const festivalBonusTemplateSchema = z.object({
  bonusName: z.string().min(1, 'This field is required'),
  bonusAmount: z.string().min(1, 'This field is required'),
  calculationBase: z.string().optional(),
  disbursementMonth: z.string().optional(),

  minimumServicePeriod: z.string().min(1, 'This field is required'),
  proRataforNewEmployees: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),

  annualTaxCalculation: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
  taxDistributionMethod: z.string().min(1, 'This field is required'),
  taxableIncome: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
});

export type FestivalBonusTemplateFormValue = z.infer<
  typeof festivalBonusTemplateSchema
>;
