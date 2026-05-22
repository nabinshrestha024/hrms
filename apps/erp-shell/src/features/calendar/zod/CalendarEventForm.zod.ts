import z from 'zod';

export const addCalendarEventSchema = z.object({
  eventType: z.string().optional(),
  eventName: z.string().optional(),
  holidayName: z.string().optional(),
  holidayType: z.string().optional(),
  description: z.string().optional(),
});

export type AddCalendarEventFormValue = z.infer<typeof addCalendarEventSchema>;
