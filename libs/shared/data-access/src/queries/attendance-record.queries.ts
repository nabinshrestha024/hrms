import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  attendanceRecordSchema,
  createAttendanceRecordSchema,
  updateAttendanceRecordSchema,
  type AttendanceRecord,
  type AttendanceRecordFilters,
  type CreateAttendanceRecordInput,
  type UpdateAttendanceRecordInput,
} from '../schemas/attendance-record.schema';

const attendanceRecordListResponseSchema = paginatedSchema(
  attendanceRecordSchema
);

export const attendanceRecordKeys = {
  all: ['attendance-records'] as const,
  lists: () => [...attendanceRecordKeys.all, 'list'] as const,
  list: (params?: ListParams & AttendanceRecordFilters) =>
    [...attendanceRecordKeys.lists(), params] as const,
  details: () => [...attendanceRecordKeys.all, 'detail'] as const,
  detail: (id: string) => [...attendanceRecordKeys.details(), id] as const,
};

export function useAttendanceRecords(
  params?: ListParams & AttendanceRecordFilters
) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<AttendanceRecord>>({
    queryKey: attendanceRecordKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.employeeId) searchParams.set('employeeId', params.employeeId);
      if (params?.branch) searchParams.set('branch', params.branch);
      if (params?.status) searchParams.set('status', params.status);
      if (params?.month) searchParams.set('month', params.month);

      const query = searchParams.toString();
      const path = `/attendance-records${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return attendanceRecordListResponseSchema.parse(response.data);
    },
  });
}

export function useAttendanceRecord(id: string) {
  const client = useApiClient();
  return useQuery<AttendanceRecord>({
    queryKey: attendanceRecordKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/attendance-records/${id}`, {
        signal,
      });
      return attendanceRecordSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateAttendanceRecord() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<AttendanceRecord, Error, CreateAttendanceRecordInput>({
    mutationFn: async (input) => {
      const body = createAttendanceRecordSchema.parse(input);
      const response = await client.post('/attendance-records', body);
      return attendanceRecordSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceRecordKeys.lists() });
    },
  });
}

export function useUpdateAttendanceRecord(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<AttendanceRecord, Error, UpdateAttendanceRecordInput>({
    mutationFn: async (input) => {
      const body = updateAttendanceRecordSchema.parse(input);
      const response = await client.patch(`/attendance-records/${id}`, body);
      return attendanceRecordSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: attendanceRecordKeys.lists() });
      queryClient.setQueryData(attendanceRecordKeys.detail(id), data);
    },
  });
}

export function useDeleteAttendanceRecord() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/attendance-records/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceRecordKeys.lists() });
    },
  });
}
