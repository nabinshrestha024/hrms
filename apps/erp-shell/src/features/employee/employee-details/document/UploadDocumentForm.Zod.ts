import z from 'zod';

export const uploadDocumentSchema = z.object({
  documentTemplate: z.string().min(1, 'Select the document template'),
  documentCategory: z.string().min(1, 'Select the document category'),
  status: z.string().min(1, 'Select the status'),
  date: z.string().optional(),
  note: z.string().optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Image is required'),
});

export type UploadDocumentFormValue = z.infer<typeof uploadDocumentSchema>;
