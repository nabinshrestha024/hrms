import z from 'zod';

// ---------------------------------------------------------------------------
// Form-level validation for the multi-step "Add Employee" wizard.
//
// This schema is *not* the canonical entity schema — that lives in
// `@erp/data-access` as `employeeSchema` / `createEmployeeSchema`. The
// form schema enforces UX-only constraints (regex, age ≥ 16, file
// instance for the avatar upload, all-fields-required because the
// wizard is the create path) that don't belong on the API entity.
//
// Field-name mapping applied at submit time in `employee-form.tsx`:
//
//   form (UX-friendly)        canonical (`CreateEmployeeInput`)
//   ─────────────────────     ────────────────────────────────────
//   phoneNumber               phone
//   workPhoneNumber           workPhone
//   joiningDate (Date)        startDate (ISO YYYY-MM-DD)
//   dateOfBirth (Date)        dateOfBirth (ISO YYYY-MM-DD)
//   contractStartDate (Date)  contractStartDate (ISO YYYY-MM-DD)
//   contractEndDate (Date)    contractEndDate (ISO YYYY-MM-DD)
//   reportingManager          managerId
//   grossSalary (string)      salary (number)
//   basicSalary (string)      basicSalary (number)
//   image (File)              avatar (URL — uploaded separately, future)
// ---------------------------------------------------------------------------

export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s]+@[^\s]+\.[^\s]+$/, 'Invalid email address'),
  phoneNumber: z
    .string()
    .regex(
      /^(97|98)\d{8}$/,
      'Phone number must start with 97 or 98 and be 10 digits'
    ),
  dateOfBirth: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Date is required',
    })
    .refine((date) => date < new Date(), {
      message: 'Date of birth must be in the past',
    })
    .refine(
      (date) => {
        const today = new Date();

        let age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < date.getDate())
        ) {
          age--;
        }

        return age >= 16;
      },
      {
        message: 'Employee must be at least 16 years old',
      }
    ),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Image is required'),
  gender: z.string().min(1, 'Select gender'),

  maritalStatus: z.string().min(1, 'Select marital status'),

  country: z.string().min(1, 'Select Country'),
  province: z.string().min(1, 'Select province'),
  city: z.string().optional(),
  municipality: z.string().min(1, 'Select Municipality'),
  ward: z
    .string()
    .min(1, 'Ward is required')
    .regex(/^[0-9]+$/, 'Ward can only contain digits'),
  address: z.string().min(1, 'Address is required'),

  emergencyContact: z
    .string()
    .regex(
      /^(97|98)\d{8}$/,
      'Phone number must start with 97 or 98 and be 10 digits'
    ),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactRelation: z
    .string()
    .min(1, 'Emergency contact relation is required'),

  branch: z.string().min(1, 'Select Branch'),
  department: z.string().min(1, 'Select department'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  designation: z.string().min(1, 'Designation is required'),
  jobLevel: z.string().min(1, 'Select job level'),
  reportingManager: z.string().min(1, 'Select reporting manager'),

  shift: z.string().min(1, 'Select shift'),
  workType: z.string().min(1, 'Select work type'),
  employeeType: z.string().min(1, 'Select employee type'),

  workEmail: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s]+@[^\s]+\.[^\s]+$/, 'Invalid email address'),
  workPhoneNumber: z
    .string()
    .regex(
      /^(97|98)\d{8}$/,
      'Phone number must start with 97 or 98 and be 10 digits'
    ),

  joiningDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().refine((d) => !isNaN(d.getTime()), 'Date is required')
  ),
  contractStartDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: 'Date is required',
  }),

  contractEndDate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: 'Date is required',
  }),

  grossSalary: z
    .string()
    .min(1, 'Gross salary is required')
    .regex(/^[0-9]+$/, 'Salary can only contain digits'),
  basicSalary: z
    .string()
    .min(1, 'Basic salary is required')
    .regex(/^[0-9]+$/, 'Salary can only contain digits'),

  bankName: z.string().min(1, 'Bank name is required'),
  bankAccountNumber: z
    .string()
    .min(1, 'Bank account number is required')
    .regex(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed'),
  bankAccountName: z.string().min(1, 'Bank account name is required'),
});

export type EmployeeFormValue = z.infer<typeof employeeSchema>;
