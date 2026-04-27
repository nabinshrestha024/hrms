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

// Dashboard schemas, types & queries
export {
  companyProfileKeys,
  dashboardKeys,
  useCompanyProfile,
  useCreateNotice,
  useEvents,
  useMyAttendance,
  useMyRequests,
  useNotices,
  usePersonalInfo,
  useTeamRequests,
  useUpdateCompanyProfile,
} from './queries/dashboard.queries';
export {
  attendanceSchema,
  companyProfileSchema,
  eventSchema,
  myRequestSchema,
  noticeSchema,
  personalInfoSchema,
  teamRequestSchema,
} from './schemas/dashboard.schema';
export type {
  Attendance,
  CompanyProfile,
  Event,
  MyRequest,
  Notice,
  PersonalInfo,
  TeamRequest,
} from './schemas/dashboard.schema';

// Company setup schemas, types & queries
export {
  branchKeys,
  departmentKeys,
  useBranch,
  useBranches,
  useCreateBranch,
  useCreateDepartment,
  useDeleteBranch,
  useDeleteDepartment,
  useDepartment,
  useDepartments,
  useUpdateBranch,
  useUpdateDepartment,
} from './queries/company-setup.queries';
export {
  branchFiltersSchema,
  branchSchema,
  branchStatusEnum,
  createBranchSchema,
  createDepartmentSchema,
  departmentSchema,
  updateBranchSchema,
  updateDepartmentSchema,
} from './schemas/company-setup.schema';
export type {
  Branch,
  BranchFilters,
  BranchStatus,
  CreateBranchInput,
  CreateDepartmentInput,
  Department,
  UpdateBranchInput,
  UpdateDepartmentInput,
} from './schemas/company-setup.schema';

// Master setup — Holiday types
export {
  holidayTypeKeys,
  useCreateHolidayType,
  useDeleteHolidayType,
  useHolidayType,
  useHolidayTypes,
  useUpdateHolidayType,
} from './queries/holiday-type.queries';
export {
  createHolidayTypeSchema,
  holidayTypeFiltersSchema,
  holidayTypeSchema,
  updateHolidayTypeSchema,
} from './schemas/holiday-type.schema';
export type {
  CreateHolidayTypeInput,
  HolidayType,
  HolidayTypeFilters,
  UpdateHolidayTypeInput,
} from './schemas/holiday-type.schema';

// Master setup — Currencies
export {
  currencyKeys,
  useCreateCurrency,
  useCurrencies,
  useCurrency,
  useDeleteCurrency,
  useUpdateCurrency,
} from './queries/currency.queries';
export {
  createCurrencySchema,
  currencyFiltersSchema,
  currencySchema,
  updateCurrencySchema,
} from './schemas/currency.schema';
export type {
  CreateCurrencyInput,
  Currency,
  CurrencyFilters,
  UpdateCurrencyInput,
} from './schemas/currency.schema';
