import z from 'zod';

export const configBulkUploadTemplateSchema = z.object({
  bulkData: z.string().min(1, 'Bulk data is required'),
});

export type ConfigBulkUploadTemplateFormValue = z.infer<
  typeof configBulkUploadTemplateSchema
>;
