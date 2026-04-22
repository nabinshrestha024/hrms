import z from 'zod';

export const commonOptionTemplateSchema = z.object({
  leaveName: z.string().min(1, 'Leave Name is required'),
  code: z.string().min(1, 'Code is required'),
  leaveType: z.string().min(1, 'Leave Type is required'),
  applicableTo: z.string().min(1, 'Applicable To is required'),
  accrualFrequency: z.string().min(1, 'Accrual Frequency is required'),
  gender: z.string().optional(),
});

export type CommonOptionTemplateFormValue = z.infer<
  typeof commonOptionTemplateSchema
>;
