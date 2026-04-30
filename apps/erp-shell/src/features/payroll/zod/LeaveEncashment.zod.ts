import z from 'zod';

export const leaveEncashmentTemplateSchema = z.object({
  encashment: z.string().min(1, 'This field is required'),
  workingDays: z.string().optional(),
  maximumEncashableDays: z.string().min(1, 'This field is required'),
  minimumBalanceRetain: z.string().optional(),
  amountRounding: z.string().optional(),

  encashableLeaveTypes: z
    .array(z.string())
    .min(1, { message: 'Select at least one day' }),

  encashmentAllowed: z.string().min(1, 'This field is required'),

  taxable: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
  annualTax: z.string().min(1, 'This field is required'),
  hrApproval: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
});

export type LeaveEncashmentTemplateFormValue = z.infer<
  typeof leaveEncashmentTemplateSchema
>;
