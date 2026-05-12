import { z } from 'zod';

export const assignAccessTemplateSchema = z.object({
  assignRole: z.string().min(1),

  dataScope: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('global'),
      branches: z.array(z.string()),
    }),
    z.object({
      type: z.literal('limited'),
      branches: z.array(z.string()).min(1, 'Select at least one branch'),
    }),
    z.object({
      type: z.literal('self'),
      branches: z.array(z.string()),
    }),
  ]),
});

export type AssignAccessTemplateFormValue = z.infer<
  typeof assignAccessTemplateSchema
>;
