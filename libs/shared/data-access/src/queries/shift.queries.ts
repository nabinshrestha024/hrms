import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createShiftSchema,
  shiftSchema,
  updateShiftSchema,
  type CreateShiftInput,
  type Shift,
  type ShiftFilters,
  type UpdateShiftInput,
} from '../schemas/shift.schema';

const shiftListResponseSchema = paginatedSchema(shiftSchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const shiftKeys = {
  all: ['shifts'] as const,
  lists: () => [...shiftKeys.all, 'list'] as const,
  list: (params?: ListParams & ShiftFilters) =>
    [...shiftKeys.lists(), params] as const,
  details: () => [...shiftKeys.all, 'detail'] as const,
  detail: (id: string) => [...shiftKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useShifts(params?: ListParams & ShiftFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<Shift>>({
    queryKey: shiftKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.shiftType) searchParams.set('shiftType', params.shiftType);
      if (params?.isActive !== undefined)
        searchParams.set('isActive', String(params.isActive));

      const query = searchParams.toString();
      const path = `/shifts${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return shiftListResponseSchema.parse(response.data);
    },
  });
}

export function useShift(id: string) {
  const client = useApiClient();
  return useQuery<Shift>({
    queryKey: shiftKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/shifts/${id}`, { signal });
      return shiftSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateShift() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Shift, Error, CreateShiftInput>({
    mutationFn: async (input) => {
      const body = createShiftSchema.parse(input);
      const response = await client.post('/shifts', body);
      return shiftSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.lists() });
    },
  });
}

export function useUpdateShift(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Shift, Error, UpdateShiftInput>({
    mutationFn: async (input) => {
      const body = updateShiftSchema.parse(input);
      const response = await client.patch(`/shifts/${id}`, body);
      return shiftSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.lists() });
      queryClient.setQueryData(shiftKeys.detail(id), data);
    },
  });
}

export function useDeleteShift() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/shifts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.lists() });
    },
  });
}
