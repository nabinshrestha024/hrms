import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createLeavePayTypeSchema,
  leavePayTypeSchema,
  updateLeavePayTypeSchema,
  type CreateLeavePayTypeInput,
  type LeavePayType,
  type LeavePayTypeFilters,
  type UpdateLeavePayTypeInput,
} from '../schemas/leave-pay-type.schema';

const leavePayTypeListResponseSchema = paginatedSchema(leavePayTypeSchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const leavePayTypeKeys = {
  all: ['leave-pay-types'] as const,
  lists: () => [...leavePayTypeKeys.all, 'list'] as const,
  list: (params?: ListParams & LeavePayTypeFilters) =>
    [...leavePayTypeKeys.lists(), params] as const,
  details: () => [...leavePayTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...leavePayTypeKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useLeavePayTypes(params?: ListParams & LeavePayTypeFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<LeavePayType>>({
    queryKey: leavePayTypeKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/leave-pay-types${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return leavePayTypeListResponseSchema.parse(response.data);
    },
  });
}

export function useLeavePayType(id: string) {
  const client = useApiClient();
  return useQuery<LeavePayType>({
    queryKey: leavePayTypeKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/leave-pay-types/${id}`, { signal });
      return leavePayTypeSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateLeavePayType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<LeavePayType, Error, CreateLeavePayTypeInput>({
    mutationFn: async (input) => {
      const body = createLeavePayTypeSchema.parse(input);
      const response = await client.post('/leave-pay-types', body);
      return leavePayTypeSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leavePayTypeKeys.lists() });
    },
  });
}

export function useUpdateLeavePayType(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<LeavePayType, Error, UpdateLeavePayTypeInput>({
    mutationFn: async (input) => {
      const body = updateLeavePayTypeSchema.parse(input);
      const response = await client.patch(`/leave-pay-types/${id}`, body);
      return leavePayTypeSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: leavePayTypeKeys.lists() });
      queryClient.setQueryData(leavePayTypeKeys.detail(id), data);
    },
  });
}

export function useDeleteLeavePayType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/leave-pay-types/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leavePayTypeKeys.lists() });
    },
  });
}
