export { ApiClient, apiEnvelopeSchema, ApiError } from './api-client';
export type {
  ApiClientConfig,
  ApiEnvelope,
  ApiErrorDetail,
  ApiResponse,
} from './api-client';
export { ApiProvider, useApiClient } from './api-provider';
export { QueryProvider } from './query-provider';
export {
  apiErrorResponseSchema,
  idSchema,
  listParamsSchema,
  paginatedSchema,
  timestampsSchema,
} from './schemas/common.schema';
export type {
  ApiErrorResponse,
  ListParams,
  PaginatedResponse,
  Timestamps,
} from './schemas/common.schema';

// Employee schemas, types & queries
export {
  employeeKeys,
  useCreateEmployee,
  useDeleteEmployee,
  useEmployee,
  useEmployees,
  useUpdateEmployee,
} from './queries/employee.queries';
export {
  createEmployeeSchema,
  employeeFiltersSchema,
  employeeSchema,
  employeeStatusEnum,
  updateEmployeeSchema,
} from './schemas/employee.schema';
export type {
  CreateEmployeeInput,
  Employee,
  EmployeeFilters,
  EmployeeStatus,
  UpdateEmployeeInput,
} from './schemas/employee.schema';

// Auth schemas, types & queries
export { authKeys, useLogin, useSession } from './queries/auth.queries';
export {
  loginResponseSchema,
  loginSchema,
  sessionResponseSchema,
} from './schemas/auth.schema';
export type {
  LoginInput,
  LoginResponse,
  SessionResponse,
} from './schemas/auth.schema';

// Re-export React Query essentials
export { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//Dashboard Employee
export { useGetEmployee } from './hooks/employee/usegetEmployee';
export { fetchEmployee } from './services/employee/fetchEmployee';
