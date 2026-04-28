import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createLeaveTypeSchema,
  leaveTypeSchema,
  updateLeaveTypeSchema,
  type CreateLeaveTypeInput,
  type LeaveType,
  type LeaveTypeFilters,
  type UpdateLeaveTypeInput,
} from '../schemas/leave-type.schema';

const leaveTypeListResponseSchema = paginatedSchema(leaveTypeSchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const leaveTypeKeys = {
  all: ['leave-types'] as const,
  lists: () => [...leaveTypeKeys.all, 'list'] as const,
  list: (params?: ListParams & LeaveTypeFilters) =>
    [...leaveTypeKeys.lists(), params] as const,
  details: () => [...leaveTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...leaveTypeKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useLeaveTypes(params?: ListParams & LeaveTypeFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<LeaveType>>({
    queryKey: leaveTypeKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.applicableTo)
        searchParams.set('applicableTo', params.applicableTo);
      if (params?.paid !== undefined)
        searchParams.set('paid', String(params.paid));

      const query = searchParams.toString();
      const path = `/leave-types${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return leaveTypeListResponseSchema.parse(response.data);
    },
  });
}

export function useLeaveType(id: string) {
  const client = useApiClient();
  return useQuery<LeaveType>({
    queryKey: leaveTypeKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/leave-types/${id}`, { signal });
      return leaveTypeSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateLeaveType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<LeaveType, Error, CreateLeaveTypeInput>({
    mutationFn: async (input) => {
      const body = createLeaveTypeSchema.parse(input);
      const response = await client.post('/leave-types', body);
      return leaveTypeSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveTypeKeys.lists() });
    },
  });
}

export function useUpdateLeaveType(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<LeaveType, Error, UpdateLeaveTypeInput>({
    mutationFn: async (input) => {
      const body = updateLeaveTypeSchema.parse(input);
      const response = await client.patch(`/leave-types/${id}`, body);
      return leaveTypeSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: leaveTypeKeys.lists() });
      queryClient.setQueryData(leaveTypeKeys.detail(id), data);
    },
  });
}

export function useDeleteLeaveType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/leave-types/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveTypeKeys.lists() });
    },
  });
}
