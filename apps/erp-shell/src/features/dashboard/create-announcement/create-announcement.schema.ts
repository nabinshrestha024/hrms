import z from 'zod';

export const createAnnouncementSchema = z.object({
  announcementTitle: z.string().min(1, 'Announcement Title is required'),
  branch: z.string().min(1, 'Select the branch'),
  department: z.string().min(1, 'Select the department'),
  priority: z.string().min(1, 'Select the priority'),
  shortDescription: z.string().min(1, 'Short Description is required'),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Image is required'),
});

export type CreateAnnouncementFormValue = z.infer<
  typeof createAnnouncementSchema
>;
