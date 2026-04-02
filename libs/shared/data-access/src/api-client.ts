import { z } from 'zod';

// ── API Envelope ────────────────────────────────────────────────────
// Every backend response follows this shape:
// { code: "200", message: "Record_fetched", data: T, errors: [] }

export const apiEnvelopeSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.unknown(),
  errors: z.array(z.unknown()).default([]),
});

export type ApiEnvelope<T = unknown> = {
  code: string;
  message: string;
  data: T;
  errors: unknown[];
};

// ── Config & Types ──────────────────────────────────────────────────

export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  getToken?: () => string | null;
  /** Called on every error. Use for toast notifications. */
  onError?: (error: ApiError) => void;
  /** Called on 401. Use for session expiry redirect. */
  onUnauthorized?: () => void;
}

export interface ApiResponse<T> {
  data: T;
  code: string;
  message: string;
  status: number;
}

// ── Error Types ─────────────────────────────────────────────────────

export interface ApiErrorDetail {
  errorCode: string;
  errorMessage: string;
}

export class ApiError extends Error {
  public errors: ApiErrorDetail[];

  constructor(
    public status: number,
    public code: string,
    message: string,
    errors: unknown[] = [],
  ) {
    super(message);
    this.name = 'ApiError';
    // Normalize errors to ApiErrorDetail[]
    this.errors = errors.map((e) => {
      if (typeof e === 'object' && e !== null && 'errorCode' in e && 'errorMessage' in e) {
        return e as ApiErrorDetail;
      }
      return { errorCode: 'UNKNOWN', errorMessage: String(e) };
    });
  }

  /** First error message, or the top-level message */
  get firstError(): string {
    return this.errors[0]?.errorMessage ?? this.message;
  }
}

// ── Client ──────────────────────────────────────────────────────────

export class ApiClient {
  constructor(private config: ApiClientConfig) {}

  private async request<T>(
    path: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${path}`;
    const token = this.config.getToken?.();

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.timeout ?? 30000,
    );

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options?.headers,
        },
      });

      // Parse response body
      let body: unknown;
      try {
        body = await res.json();
      } catch {
        body = null;
      }

      // Try to parse as standard envelope
      const envelope = apiEnvelopeSchema.safeParse(body);

      // ── HTTP-level error (4xx, 5xx) ──
      if (!res.ok) {
        const error = envelope.success
          ? new ApiError(res.status, envelope.data.code, envelope.data.message, envelope.data.errors as unknown[])
          : new ApiError(res.status, String(res.status), res.statusText);

        if (res.status === 401) {
          this.config.onUnauthorized?.();
        }

        this.config.onError?.(error);
        throw error;
      }

      // ── Envelope-level error (HTTP 200 but code !== "200") ──
      if (envelope.success) {
        const { code, message, data, errors } = envelope.data;

        if (code !== '200' && code !== '201') {
          const error = new ApiError(res.status, code, message, errors as unknown[]);
          this.config.onError?.(error);
          throw error;
        }

        return {
          data: data as T,
          code,
          message,
          status: res.status,
        };
      }

      // ── Non-envelope response (fallback for MSW / simple APIs) ──
      return {
        data: body as T,
        code: String(res.status),
        message: 'OK',
        status: res.status,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get<T>(path: string) {
    return this.request<T>(path);
  }

  post<T>(path: string, body: unknown) {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(path: string, body: unknown) {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T>(path: string, body: unknown) {
    return this.request<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }
}
