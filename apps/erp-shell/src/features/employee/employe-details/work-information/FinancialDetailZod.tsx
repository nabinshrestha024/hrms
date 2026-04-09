import z from 'zod';

export const financialSchema = z.object({
  grossSalary: z
    .string()
    .min(1, 'Gross salary is required')
    .regex(/^[0-9]+$/, 'Salary can only contain digits'),
  basicSalary: z
    .string()
    .min(1, 'Basic salary is required')
    .regex(/^[0-9]+$/, 'Salary can only contain digits'),

  bankName: z.string().min(1, 'Bank name is required'),
  bankAccountNumber: z.string().min(1, 'Bank account number is required'),
  bankAccountName: z.string().min(1, 'Bank account name is required'),
});

export type FinancialFormValue = z.infer<typeof financialSchema>;
