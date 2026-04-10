import { z } from 'zod';

export const assignLeaveSchema = z.object({
  leaveCategory: z.string().min(1, 'Please select a leave category'),
});
export type AssignLeaveFormValue = z.infer<typeof assignLeaveSchema>;
