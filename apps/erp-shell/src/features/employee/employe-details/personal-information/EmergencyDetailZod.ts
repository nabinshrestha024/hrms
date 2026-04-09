import z from 'zod';

export const emergencySchema = z.object({
  emergencyContact: z
    .string()
    .min(10, 'Phone number must be atleast 10 digit')
    .regex(/^[0-9]+$/, 'Phone number can only contain digits'),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactRelation: z
    .string()
    .min(1, 'Emergency contact relation is required'),
});

export type EmergencyFormValue = z.infer<typeof emergencySchema>;
