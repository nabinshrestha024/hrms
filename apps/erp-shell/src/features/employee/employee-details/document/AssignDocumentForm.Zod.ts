import z from 'zod';

export const assignDocumentSchema = z.object({
  documentTemplate: z.string().min(1, 'Select the document template'),
  documentCategory: z.string().min(1, 'Select the document category'),
  status: z.string().min(1, 'Select the status'),
  date: z.string().optional(),
  note: z.string().optional(),
});

export type AssignDocumentFormValue = z.infer<typeof assignDocumentSchema>;
