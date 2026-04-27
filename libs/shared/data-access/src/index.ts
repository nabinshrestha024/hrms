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

// Master setup — Job levels
export {
  jobLevelKeys,
  useCreateJobLevel,
  useDeleteJobLevel,
  useJobLevel,
  useJobLevels,
  useUpdateJobLevel,
} from './queries/job-level.queries';
export {
  createJobLevelSchema,
  jobLevelFiltersSchema,
  jobLevelSchema,
  updateJobLevelSchema,
} from './schemas/job-level.schema';
export type {
  CreateJobLevelInput,
  JobLevel,
  JobLevelFilters,
  UpdateJobLevelInput,
} from './schemas/job-level.schema';

// Master setup — Work types
export {
  useCreateWorkType,
  useDeleteWorkType,
  useUpdateWorkType,
  useWorkType,
  useWorkTypes,
  workTypeKeys,
} from './queries/work-type.queries';
export {
  createWorkTypeSchema,
  updateWorkTypeSchema,
  workTypeFiltersSchema,
  workTypeSchema,
} from './schemas/work-type.schema';
export type {
  CreateWorkTypeInput,
  UpdateWorkTypeInput,
  WorkType,
  WorkTypeFilters,
} from './schemas/work-type.schema';

// Master setup — Leave pay types (Fully Paid / Not Paid / etc.)
// Distinct from configuration's leave-types resource (Annual / Sick / ...).
export {
  leavePayTypeKeys,
  useCreateLeavePayType,
  useDeleteLeavePayType,
  useLeavePayType,
  useLeavePayTypes,
  useUpdateLeavePayType,
} from './queries/leave-pay-type.queries';
export {
  createLeavePayTypeSchema,
  leavePayTypeFiltersSchema,
  leavePayTypeSchema,
  updateLeavePayTypeSchema,
} from './schemas/leave-pay-type.schema';
export type {
  CreateLeavePayTypeInput,
  LeavePayType,
  LeavePayTypeFilters,
  UpdateLeavePayTypeInput,
} from './schemas/leave-pay-type.schema';

// Configuration — Holidays (calendar entries; categories live in
// holiday-types under master-setup).
export {
  holidayKeys,
  useCreateHoliday,
  useDeleteHoliday,
  useHoliday,
  useHolidays,
  useUpdateHoliday,
} from './queries/holiday.queries';
export {
  createHolidaySchema,
  holidayFiltersSchema,
  holidaySchema,
  updateHolidaySchema,
} from './schemas/holiday.schema';
export type {
  CreateHolidayInput,
  Holiday,
  HolidayFilters,
  UpdateHolidayInput,
} from './schemas/holiday.schema';

// Configuration — Shifts
export {
  shiftKeys,
  useCreateShift,
  useDeleteShift,
  useShift,
  useShifts,
  useUpdateShift,
} from './queries/shift.queries';
export {
  createShiftSchema,
  shiftFiltersSchema,
  shiftSchema,
  shiftTypeEnum,
  updateShiftSchema,
  weekdayEnum,
} from './schemas/shift.schema';
export type {
  CreateShiftInput,
  Shift,
  ShiftFilters,
  ShiftTypeKind,
  UpdateShiftInput,
  Weekday,
} from './schemas/shift.schema';
