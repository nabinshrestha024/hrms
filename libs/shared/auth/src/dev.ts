/**
 * Dev-only auth entry point.
 *
 * IMPORTANT: This file MUST NOT be imported from production application code.
 * It exposes unsigned base64 "tokens" for local development with MSW mocks.
 * Only mock handlers and test setup should import from here.
 *
 * In production, the real backend issues signed JWTs and the SPA should
 * never construct or verify them client-side.
 */
export { mockLogin, restoreSession } from './mock-auth';
