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
  /** Called on 401 after a refresh attempt has failed (or when no refresh is configured). */
  onUnauthorized?: () => void;
  /**
   * Optional refresh hook called when a request returns 401. Should obtain a
   * new access token (typically via a refresh-token cookie or backend call)
   * and return `true` on success. The original request will then be retried
   * exactly once. Concurrent 401s are deduplicated — only one refresh runs
   * at a time and other requests await the same promise.
   */
  refreshToken?: () => Promise<boolean>;
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
    errors: unknown[] = []
  ) {
    super(message);
    this.name = 'ApiError';
    // Normalize errors to ApiErrorDetail[]
    this.errors = errors.map((e) => {
      if (
        typeof e === 'object' &&
        e !== null &&
        'errorCode' in e &&
        'errorMessage' in e
      ) {
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

/** Combine multiple AbortSignals into one. Falls back for older runtimes. */
function anySignal(signals: (AbortSignal | undefined)[]): AbortSignal {
  const filtered = signals.filter((s): s is AbortSignal => s != null);
  if (filtered.length === 0) return new AbortController().signal;
  if (filtered.length === 1) return filtered[0];
  // Use native AbortSignal.any when available (Node 20+, modern browsers)
  if (typeof (AbortSignal as { any?: unknown }).any === 'function') {
    return (AbortSignal as { any: (s: AbortSignal[]) => AbortSignal }).any(
      filtered
    );
  }
  // Fallback: forward abort from any source to a new controller
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  for (const s of filtered) {
    if (s.aborted) {
      controller.abort();
      break;
    }
    s.addEventListener('abort', onAbort, { once: true });
  }
  return controller.signal;
}

export interface RequestOptions<T = unknown> {
  /** External signal (e.g. from TanStack Query). Combined with the timeout. */
  signal?: AbortSignal;
  /**
   * Optional Zod schema (or any object with a `.parse(data) => T` method).
   * When provided, the response data is validated and typed at the boundary,
   * removing the need for `.parse()` calls in every queryFn.
   */
  schema?: { parse: (data: unknown) => T };
}

export class ApiClient {
  /** Single in-flight refresh promise — concurrent 401s share it. */
  private refreshPromise: Promise<boolean> | null = null;

  constructor(private config: ApiClientConfig) {}

  private async tryRefresh(): Promise<boolean> {
    if (!this.config.refreshToken) return false;
    if (this.refreshPromise) return this.refreshPromise;
    this.refreshPromise = this.config
      .refreshToken()
      .catch(() => false)
      .finally(() => {
        this.refreshPromise = null;
      });
    return this.refreshPromise;
  }

  private async request<T>(
    path: string,
    options?: RequestInit & RequestOptions,
    isRetry = false
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${path}`;
    const token = this.config.getToken?.();

    const timeoutController = new AbortController();
    const timeoutId = setTimeout(
      () => timeoutController.abort(),
      this.config.timeout ?? 30000
    );

    const signal = anySignal([timeoutController.signal, options?.signal]);

    try {
      const res = await fetch(url, {
        ...options,
        signal,
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
        // 401 with a configured refresh hook → try once
        if (res.status === 401 && !isRetry && this.config.refreshToken) {
          const refreshed = await this.tryRefresh();
          if (refreshed) {
            // Retry the original request with the new token
            return this.request<T>(path, options, true);
          }
        }

        const error = envelope.success
          ? new ApiError(
              res.status,
              envelope.data.code,
              envelope.data.message,
              envelope.data.errors as unknown[]
            )
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

        if (code !== '200' && code !== '201' && code !== '204') {
          const error = new ApiError(
            res.status,
            code,
            message,
            errors as unknown[]
          );
          this.config.onError?.(error);
          throw error;
        }

        const validated = options?.schema
          ? (options.schema.parse(data) as T)
          : (data as T);

        return {
          data: validated,
          code,
          message,
          status: res.status,
        };
      }

      // ── Non-envelope response (fallback for MSW / simple APIs) ──
      const validated = options?.schema
        ? (options.schema.parse(body) as T)
        : (body as T);

      return {
        data: validated,
        code: String(res.status),
        message: 'OK',
        status: res.status,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, options);
  }

  post<T>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch<T>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}
