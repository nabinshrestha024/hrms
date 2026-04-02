import { z } from 'zod';

export const analyticsSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string(),
});

export type Analytics = z.infer<typeof analyticsSchema>;

export const createAnalyticsSchema = analyticsSchema.omit({
  id: true,
  createdAt: true,
});
export type CreateAnalyticsInput = z.infer<typeof createAnalyticsSchema>;

export const updateAnalyticsSchema = createAnalyticsSchema.partial();
export type UpdateAnalyticsInput = z.infer<typeof updateAnalyticsSchema>;
