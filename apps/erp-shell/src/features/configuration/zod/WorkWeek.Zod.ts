import z from 'zod';

export const workWeekTemplateSchema = z.object({
  weekStarts: z.string().min(1, { message: 'Select this field' }),
  weekendPolicy: z.string().min(1, { message: 'Weekend policy is required' }),
  payrollCycleStarts: z.string().min(1, { message: 'This field is required' }),

  payrollCycleEnds: z.string({
    message: 'Payroll cycle end is required',
  }),
  minHours: z.string({
    message: 'Min hours is required',
  }),
  maxHours: z.string({
    message: 'Max hours is required',
  }),
  workingDays: z
    .array(
      z.object({
        day: z.string(),
        type: z.enum(['full', 'half']),
      })
    )
    .min(1, 'Select at least one working day'),
  regularOT: z.string().optional(),
  weekendOT: z.string().optional(),
  holidayOT: z.string().optional(),
});

export type WorkWeekTemplateFormValue = z.infer<typeof workWeekTemplateSchema>;
