import z from 'zod';

export const configHolidayTemplateSchema = z.object({
  holidayName: z.string().min(1, { message: 'Holiday Name is required' }),
  holidayType: z.string().min(1, { message: 'Holiday Type is required' }),
  date: z.date({
    message: 'Date is required',
  }),
  description: z.string().optional(),
});

export type ConfigHolidayTemplateFormValue = z.infer<
  typeof configHolidayTemplateSchema
>;
