// API Client
export { ApiClient, ApiError, apiEnvelopeSchema } from './api-client';
export type { ApiClientConfig, ApiResponse, ApiEnvelope, ApiErrorDetail } from './api-client';
export { createApiClient } from './create-api-client';

// Query Provider
export { QueryProvider } from './query-provider';

// API Provider
export { ApiProvider, useApiClient } from './api-provider';

// Typed query/mutation factories
export { createTypedQuery, createTypedQueryWithParams, createTypedMutation } from './create-typed-query';

// Common schemas & types
export {
  paginatedSchema,
  listParamsSchema,
  apiErrorResponseSchema,
  idSchema,
  timestampsSchema,
} from './schemas/common.schema';
export type {
  PaginatedResponse,
  ListParams,
  ApiErrorResponse,
  Timestamps,
} from './schemas/common.schema';

// Employee schemas, types & queries
export {
  employeeSchema,
  employeeStatusEnum,
  createEmployeeSchema,
  updateEmployeeSchema,
  employeeFiltersSchema,
} from './schemas/employee.schema';
export type {
  Employee,
  EmployeeStatus,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  EmployeeFilters,
} from './schemas/employee.schema';
export {
  employeeKeys,
  useEmployees,
  useEmployee,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from './queries/employee.queries';

// Auth schemas, types & queries
export {
  loginSchema,
  loginResponseSchema,
  sessionResponseSchema,
} from './schemas/auth.schema';
export type {
  LoginInput,
  LoginResponse,
  SessionResponse,
} from './schemas/auth.schema';
export { authKeys, useLogin, useSession } from './queries/auth.queries';

// Re-export React Query essentials
export { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
