import z from 'zod';

export const advanceOptionTemplateSchema = z.object({
  allowLeave: z.boolean().refine((v) => v === true, {
    message: 'Select this option',
  }),
});

export type AdvanceOptionTemplateFormValue = z.infer<
  typeof advanceOptionTemplateSchema
>;
