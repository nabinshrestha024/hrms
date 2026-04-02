import { z } from 'zod';

// ---------------------------------------------------------------------------
// Paginated response wrapper — every list endpoint returns this shape
// ---------------------------------------------------------------------------

export function paginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  });
}

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// ---------------------------------------------------------------------------
// Common query params for list endpoints
// ---------------------------------------------------------------------------

export const listParamsSchema = z.object({
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
});

export type ListParams = z.infer<typeof listParamsSchema>;

// ---------------------------------------------------------------------------
// API error response shape
// ---------------------------------------------------------------------------

export const apiErrorResponseSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

// ---------------------------------------------------------------------------
// Common field schemas (reusable across entities)
// ---------------------------------------------------------------------------

export const idSchema = z.string().min(1);

export const timestampsSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Timestamps = z.infer<typeof timestampsSchema>;
