import z from 'zod';

export const deductionTemplateSchema = z.object({
  employeeContributionPF: z.string().min(1, 'This field is required'),
  employerContributionPF: z.string().min(1, 'This field is required'),
  calculationBasePF: z.string().optional(),
  maximumContributionPF: z.string().optional(),

  employeeContributionSSF: z.string().min(1, 'This field is required'),
  employerContributionSSF: z.string().min(1, 'This field is required'),
  calculationBaseSSF: z.string().optional(),
  maximumContributionSSF: z.string().optional(),

  cit: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
  deductionType: z.string().optional(),
  lifeInsurance: z.string().optional(),
  medicalInsurance: z.string().optional(),
  accidentInsurance: z.string().optional(),

  gratuityRate: z.string().optional(),
  eligibility: z.string().optional(),
});

export type DeductionTemplateFormValue = z.infer<
  typeof deductionTemplateSchema
>;
