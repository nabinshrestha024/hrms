import z from 'zod';

export const salaryStructureTemplateSchema = z.object({
  basicSalary: z.string().min(1, 'Basic Salary is required'),
  effectiveFrom: z.date({
    message: 'Date is required',
  }),
  dearnessAllowances: z.string().optional(),
  otherAllowances: z.string().optional(),
  fixed: z.string().optional(),
  percentage: z.string().optional(),
  ofbasic: z.string().optional(),
  calculationType: z.string().optional(),
  fixedAmount: z.string().optional(),
  lifeInsurance: z.string().optional(),
  medicalInsurance: z.string().optional(),
  accidentInsurance: z.string().optional(),
});

export type SalaryStructureTemplateFormValue = z.infer<
  typeof salaryStructureTemplateSchema
>;
