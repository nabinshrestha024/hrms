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

// Configuration — Work-week config (tenant-scoped singleton settings)
export {
  useUpdateWorkWeekConfig,
  useWorkWeekConfig,
  workWeekConfigKeys,
} from './queries/work-week-config.queries';
export {
  overtimeMultipliersSchema,
  updateWorkWeekConfigSchema,
  weekendPolicyEnum,
  workingDayEntrySchema,
  workWeekConfigSchema,
} from './schemas/work-week-config.schema';
export type {
  OvertimeMultipliers,
  UpdateWorkWeekConfigInput,
  WeekendPolicy,
  WorkingDayEntry,
  WorkWeekConfig,
} from './schemas/work-week-config.schema';

// Configuration — Leave types (Annual / Sick / Maternity ...).
// Distinct from master-setup's leave-pay-types resource (Fully Paid /
// Half Paid / Not Paid pay-status categorisation).
export {
  leaveTypeKeys,
  useCreateLeaveType,
  useDeleteLeaveType,
  useLeaveType,
  useLeaveTypes,
  useUpdateLeaveType,
} from './queries/leave-type.queries';
export {
  createLeaveTypeSchema,
  leaveApplicableToEnum,
  leavePolicySchema,
  leaveTypeFiltersSchema,
  leaveTypeSchema,
  updateLeaveTypeSchema,
} from './schemas/leave-type.schema';
export type {
  CreateLeaveTypeInput,
  LeaveApplicableTo,
  LeavePolicy,
  LeaveType,
  LeaveTypeFilters,
  UpdateLeaveTypeInput,
} from './schemas/leave-type.schema';

// Document management — Missing documents (per-employee gap list)
export {
  missingDocumentKeys,
  useCreateMissingDocument,
  useDeleteMissingDocument,
  useMissingDocument,
  useMissingDocuments,
  useUpdateMissingDocument,
} from './queries/missing-document.queries';
export {
  createMissingDocumentSchema,
  documentPriorityEnum,
  missingDocumentFiltersSchema,
  missingDocumentSchema,
  updateMissingDocumentSchema,
} from './schemas/missing-document.schema';
export type {
  CreateMissingDocumentInput,
  DocumentPriority,
  MissingDocument,
  MissingDocumentFilters,
  UpdateMissingDocumentInput,
} from './schemas/missing-document.schema';

// Document management — Review/approval queue
export {
  documentReviewKeys,
  useCreateDocumentReview,
  useDeleteDocumentReview,
  useDocumentReview,
  useDocumentReviews,
  useUpdateDocumentReview,
} from './queries/document-review.queries';
export {
  createDocumentReviewSchema,
  documentReviewFiltersSchema,
  documentReviewSchema,
  documentReviewStatusEnum,
  updateDocumentReviewSchema,
} from './schemas/document-review.schema';
export type {
  CreateDocumentReviewInput,
  DocumentReview,
  DocumentReviewFilters,
  DocumentReviewStatus,
  UpdateDocumentReviewInput,
} from './schemas/document-review.schema';

// Document management — Employee document records (with visibility flag)
export {
  employeeDocumentKeys,
  useCreateEmployeeDocument,
  useDeleteEmployeeDocument,
  useEmployeeDocument,
  useEmployeeDocuments,
  useUpdateEmployeeDocument,
} from './queries/employee-document.queries';
export {
  createEmployeeDocumentSchema,
  employeeDocumentFiltersSchema,
  employeeDocumentSchema,
  updateEmployeeDocumentSchema,
} from './schemas/employee-document.schema';
export type {
  CreateEmployeeDocumentInput,
  EmployeeDocument,
  EmployeeDocumentFilters,
  UpdateEmployeeDocumentInput,
} from './schemas/employee-document.schema';

// Document management — Categories
export {
  documentCategoryKeys,
  useCreateDocumentCategory,
  useDeleteDocumentCategory,
  useDocumentCategories,
  useDocumentCategory,
  useUpdateDocumentCategory,
} from './queries/document-category.queries';
export {
  createDocumentCategorySchema,
  documentCategoryFiltersSchema,
  documentCategorySchema,
  updateDocumentCategorySchema,
} from './schemas/document-category.schema';
export type {
  CreateDocumentCategoryInput,
  DocumentCategory,
  DocumentCategoryFilters,
  UpdateDocumentCategoryInput,
} from './schemas/document-category.schema';

// Document management — Templates
export {
  documentTemplateKeys,
  useCreateDocumentTemplate,
  useDeleteDocumentTemplate,
  useDocumentTemplate,
  useDocumentTemplates,
  useUpdateDocumentTemplate,
} from './queries/document-template.queries';
export {
  createDocumentTemplateSchema,
  documentTemplateFiltersSchema,
  documentTemplateKindEnum,
  documentTemplateSchema,
  updateDocumentTemplateSchema,
} from './schemas/document-template.schema';
export type {
  CreateDocumentTemplateInput,
  DocumentTemplate,
  DocumentTemplateFilters,
  DocumentTemplateKind,
  UpdateDocumentTemplateInput,
} from './schemas/document-template.schema';

// Assets management — Assets
export {
  assetKeys,
  useAsset,
  useAssets,
  useCreateAsset,
  useDeleteAsset,
  useUpdateAsset,
} from './queries/asset.queries';
export {
  assetConditionEnum,
  assetFiltersSchema,
  assetSchema,
  assetStatusEnum,
  createAssetSchema,
  updateAssetSchema,
} from './schemas/asset.schema';
export type {
  Asset,
  AssetCondition,
  AssetFilters,
  AssetStatus,
  CreateAssetInput,
  UpdateAssetInput,
} from './schemas/asset.schema';

// Assets management — Categories
export {
  assetCategoryKeys,
  useAssetCategories,
  useAssetCategory,
  useCreateAssetCategory,
  useDeleteAssetCategory,
  useUpdateAssetCategory,
} from './queries/asset-category.queries';
export {
  assetCategoryFiltersSchema,
  assetCategoryIconKeyEnum,
  assetCategorySchema,
  createAssetCategorySchema,
  updateAssetCategorySchema,
} from './schemas/asset-category.schema';
export type {
  AssetCategory,
  AssetCategoryFilters,
  AssetCategoryIconKey,
  CreateAssetCategoryInput,
  UpdateAssetCategoryInput,
} from './schemas/asset-category.schema';

// Attendance — Attendance records
export {
  attendanceRecordKeys,
  useAttendanceRecord,
  useAttendanceRecords,
  useCreateAttendanceRecord,
  useDeleteAttendanceRecord,
  useUpdateAttendanceRecord,
} from './queries/attendance-record.queries';
export {
  attendanceRecordFiltersSchema,
  attendanceRecordSchema,
  attendanceStatusEnum,
  createAttendanceRecordSchema,
  updateAttendanceRecordSchema,
} from './schemas/attendance-record.schema';
export type {
  AttendanceRecord,
  AttendanceRecordFilters,
  AttendanceStatus,
  CreateAttendanceRecordInput,
  UpdateAttendanceRecordInput,
} from './schemas/attendance-record.schema';

// Leave management — Leave requests
export {
  leaveRequestKeys,
  useCreateLeaveRequest,
  useDeleteLeaveRequest,
  useLeaveRequest,
  useLeaveRequests,
  useUpdateLeaveRequest,
} from './queries/leave-request.queries';
export {
  createLeaveRequestSchema,
  leaveRequestFiltersSchema,
  leaveRequestSchema,
  leaveRequestStatusEnum,
  updateLeaveRequestSchema,
} from './schemas/leave-request.schema';
export type {
  CreateLeaveRequestInput,
  LeaveRequest,
  LeaveRequestFilters,
  LeaveRequestStatus,
  UpdateLeaveRequestInput,
} from './schemas/leave-request.schema';

// Directories
export {
  directoryEntryKeys,
  useCreateDirectoryEntry,
  useDeleteDirectoryEntry,
  useDirectoryEntries,
  useDirectoryEntry,
  useUpdateDirectoryEntry,
} from './queries/directory.queries';
export {
  createDirectoryEntrySchema,
  directoryEntryFiltersSchema,
  directoryEntrySchema,
  updateDirectoryEntrySchema,
} from './schemas/directory.schema';
export type {
  CreateDirectoryEntryInput,
  DirectoryEntry,
  DirectoryEntryFilters,
  UpdateDirectoryEntryInput,
} from './schemas/directory.schema';
