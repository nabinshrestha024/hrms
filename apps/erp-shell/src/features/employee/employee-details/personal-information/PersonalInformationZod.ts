import z from 'zod';

export const personalInformationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().min(1, 'Middle name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s]+@[^\s]+\.[^\s]+$/, 'Invalid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be atleast 10 digit')
    .regex(/^[0-9]+$/, 'Phone number can only contain digits'),
  dateOfBirth: z.coerce.date().min(1, 'Date is required'),
  gender: z.string().min(1, 'Gender is required'),
  maritalStatus: z.string().min(1, 'Marital Status is required'),
  country: z.string().min(1, 'Country is required'),
  province: z.string().min(1, 'Province is required'),
  city: z.string().min(1, 'Province is required'),
  municipality: z.string().min(1, 'Municipality is required'),
  ward: z
    .string()
    .min(1, 'Ward is required')
    .regex(/^[0-9]+$/, 'Ward can only contain digits'),
  emergencyContact: z
    .string()
    .min(10, 'Phone number must be atleast 10 digit')
    .regex(/^[0-9]+$/, 'Phone number can only contain digits'),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactRelation: z
    .string()
    .min(1, 'Emergency contact relation is required'),
});

export type PersonalInformationInput = z.input<
  typeof personalInformationSchema
>;

export type PersonalInformationOutput = z.output<
  typeof personalInformationSchema
>;
