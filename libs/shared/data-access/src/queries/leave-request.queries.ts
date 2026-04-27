import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createLeaveRequestSchema,
  leaveRequestSchema,
  updateLeaveRequestSchema,
  type CreateLeaveRequestInput,
  type LeaveRequest,
  type LeaveRequestFilters,
  type UpdateLeaveRequestInput,
} from '../schemas/leave-request.schema';

const leaveRequestListResponseSchema = paginatedSchema(leaveRequestSchema);

export const leaveRequestKeys = {
  all: ['leave-requests'] as const,
  lists: () => [...leaveRequestKeys.all, 'list'] as const,
  list: (params?: ListParams & LeaveRequestFilters) =>
    [...leaveRequestKeys.lists(), params] as const,
  details: () => [...leaveRequestKeys.all, 'detail'] as const,
  detail: (id: string) => [...leaveRequestKeys.details(), id] as const,
};

export function useLeaveRequests(params?: ListParams & LeaveRequestFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<LeaveRequest>>({
    queryKey: leaveRequestKeys.list(params),
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
      if (params?.type) searchParams.set('type', params.type);
      if (params?.status) searchParams.set('status', params.status);

      const query = searchParams.toString();
      const path = `/leave-requests${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return leaveRequestListResponseSchema.parse(response.data);
    },
  });
}

export function useLeaveRequest(id: string) {
  const client = useApiClient();
  return useQuery<LeaveRequest>({
    queryKey: leaveRequestKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/leave-requests/${id}`, { signal });
      return leaveRequestSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateLeaveRequest() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<LeaveRequest, Error, CreateLeaveRequestInput>({
    mutationFn: async (input) => {
      const body = createLeaveRequestSchema.parse(input);
      const response = await client.post('/leave-requests', body);
      return leaveRequestSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveRequestKeys.lists() });
    },
  });
}

export function useUpdateLeaveRequest(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<LeaveRequest, Error, UpdateLeaveRequestInput>({
    mutationFn: async (input) => {
      const body = updateLeaveRequestSchema.parse(input);
      const response = await client.patch(`/leave-requests/${id}`, body);
      return leaveRequestSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: leaveRequestKeys.lists() });
      queryClient.setQueryData(leaveRequestKeys.detail(id), data);
    },
  });
}

export function useDeleteLeaveRequest() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/leave-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveRequestKeys.lists() });
    },
  });
}
