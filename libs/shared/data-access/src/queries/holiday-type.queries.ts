import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createHolidayTypeSchema,
  holidayTypeSchema,
  updateHolidayTypeSchema,
  type CreateHolidayTypeInput,
  type HolidayType,
  type HolidayTypeFilters,
  type UpdateHolidayTypeInput,
} from '../schemas/holiday-type.schema';

const holidayTypeListResponseSchema = paginatedSchema(holidayTypeSchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const holidayTypeKeys = {
  all: ['holiday-types'] as const,
  lists: () => [...holidayTypeKeys.all, 'list'] as const,
  list: (params?: ListParams & HolidayTypeFilters) =>
    [...holidayTypeKeys.lists(), params] as const,
  details: () => [...holidayTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...holidayTypeKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useHolidayTypes(params?: ListParams & HolidayTypeFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<HolidayType>>({
    queryKey: holidayTypeKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/holiday-types${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return holidayTypeListResponseSchema.parse(response.data);
    },
  });
}

export function useHolidayType(id: string) {
  const client = useApiClient();
  return useQuery<HolidayType>({
    queryKey: holidayTypeKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/holiday-types/${id}`, { signal });
      return holidayTypeSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateHolidayType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<HolidayType, Error, CreateHolidayTypeInput>({
    mutationFn: async (input) => {
      const body = createHolidayTypeSchema.parse(input);
      const response = await client.post('/holiday-types', body);
      return holidayTypeSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: holidayTypeKeys.lists() });
    },
  });
}

export function useUpdateHolidayType(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<HolidayType, Error, UpdateHolidayTypeInput>({
    mutationFn: async (input) => {
      const body = updateHolidayTypeSchema.parse(input);
      const response = await client.patch(`/holiday-types/${id}`, body);
      return holidayTypeSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: holidayTypeKeys.lists() });
      queryClient.setQueryData(holidayTypeKeys.detail(id), data);
    },
  });
}

export function useDeleteHolidayType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/holiday-types/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: holidayTypeKeys.lists() });
    },
  });
}
