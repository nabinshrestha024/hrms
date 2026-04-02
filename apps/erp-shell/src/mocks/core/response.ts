import { HttpResponse } from 'msw';

/**
 * Standard API envelope response helpers.
 * Matches the backend format exactly:
 *
 * Success: { code: "200", message: "Record_fetched", data: T, errors: [] }
 * Error:   { code: "400", message: "Bad request", data: null, errors: [{ errorCode, errorMessage }] }
 */

export interface ErrorDetail {
  errorCode: string;
  errorMessage: string;
}

// ── Success Responses ───────────────────────────────────────────────

export function success<T>(data: T, message = 'Record_fetched', status = 200) {
  return HttpResponse.json(
    { code: String(status), message, data, errors: [] },
    { status },
  );
}

export function created<T>(data: T, message = 'Record_created') {
  return success(data, message, 201);
}

export function noContent(message = 'Record_deleted') {
  return HttpResponse.json(
    { code: '204', message, data: null, errors: [] },
    { status: 200 },
  );
}

// ── Error Responses ─────────────────────────────────────────────────

export function error(
  message: string,
  code = '400',
  status = 400,
  errors: ErrorDetail[] = [],
) {
  return HttpResponse.json(
    { code, message, data: null, errors },
    { status },
  );
}

export function badRequest(message: string, errors: ErrorDetail[] = []) {
  return error(message, '400', 400, errors);
}

export function unauthorized(message = 'Invalid credentials') {
  return error(message, '401', 401, [
    { errorCode: 'AUTH001', errorMessage: message },
  ]);
}

export function forbidden(message = 'Access denied') {
  return error(message, '403', 403, [
    { errorCode: 'AUTH003', errorMessage: message },
  ]);
}

export function notFound(resource = 'Record') {
  return error(`${resource}_not_found`, '404', 404, [
    { errorCode: 'NOT_FOUND', errorMessage: `${resource} not found` },
  ]);
}

export function serverError(message = 'Internal server error') {
  return error(message, '500', 500, [
    { errorCode: 'SERVER_ERROR', errorMessage: message },
  ]);
}

// ── Validation Helpers ──────────────────────────────────────────────

/**
 * Convert Zod validation errors to API error format.
 * Usage: validationError(zodError.issues)
 */
export function validationError(
  issues: Array<{ path: (string | number)[]; message: string }>,
) {
  const errors: ErrorDetail[] = issues.map((issue) => ({
    errorCode: `VALIDATION_${issue.path.join('_').toUpperCase()}`,
    errorMessage: `'${issue.path.join('.')}' ${issue.message}`,
  }));

  return badRequest('Validation failed', errors);
}
