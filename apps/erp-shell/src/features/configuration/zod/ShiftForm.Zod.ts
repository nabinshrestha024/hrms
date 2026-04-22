import z from 'zod';

export const shiftTemplateSchema = z.object({
  shift: z.string().min(1, { message: 'Shift is required' }),
  code: z.string().min(1, { message: 'Code is required' }),
  shiftType: z.string().min(1, { message: 'Shift type is required' }),

  startTime: z.string({
    message: 'Start time is required',
  }),
  endTime: z.string({
    message: 'End time is required',
  }),
  break: z.string({
    message: 'Break is required',
  }),
  applicableDays: z
    .array(z.string())
    .min(1, { message: 'Select at least one day' }),
  grace: z.string().min(1, { message: 'Grace time is required' }),
  overTime: z.string().min(1, { message: 'Over Time is required' }),
  lateIn: z.string().min(1, { message: 'Late In is required' }),
  earlyOut: z.string().min(1, { message: 'Early Out is required' }),

  defaultShift: z.boolean().optional(),
});

export type ShiftTemplateFormValue = z.infer<typeof shiftTemplateSchema>;
