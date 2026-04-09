import z from 'zod';

export const assignAccessTemplateSchema = z.object({
  assignRole: z.string().min(1, 'Select assign role'),
  dataScope: z.string().min(1, 'Select assign role'),
});

export type AssignAccessTemplateFormValue = z.infer<
  typeof assignAccessTemplateSchema
>;

export interface AssignAccessTemplateData {
  assignRole: string;
  dataScope: string;
}
