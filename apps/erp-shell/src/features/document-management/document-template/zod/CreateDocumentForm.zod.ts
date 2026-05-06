import z from 'zod';

export const createTemplateSchema = z.object({
  documentTitle: z.string().min(1, 'This field is required'),
  category: z.string().min(1, 'This field is required'),
});

export type CreateTemplateFormValue = z.infer<typeof createTemplateSchema>;
