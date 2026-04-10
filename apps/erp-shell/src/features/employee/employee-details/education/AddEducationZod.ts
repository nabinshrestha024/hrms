import { z } from 'zod';

export const educationSchema = z.object({
  qualification: z.string().min(1, 'Qualification is required'),
  studyField: z.string().min(1, 'Field of study is required'),
  university: z.string().min(1, 'University is required'),
  startYear: z.coerce.date().optional(),
  endYear: z.coerce.date().optional(),
  grade: z.coerce.number().optional(),
  status: z.string().optional(),
});

export type EducationFormValue = z.infer<typeof educationSchema>;
