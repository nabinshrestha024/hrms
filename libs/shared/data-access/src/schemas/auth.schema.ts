import { z } from 'zod';

// ── Request schemas ─────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  tenantId: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ── Response schemas ────────────────────────────────────────────────

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  tenantId: z.string(),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  permissions: z.array(z.string()),
  token: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const sessionResponseSchema = z.object({
  user: userSchema,
  permissions: z.array(z.string()),
});

export type SessionResponse = z.infer<typeof sessionResponseSchema>;
