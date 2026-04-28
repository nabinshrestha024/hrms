import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createHolidaySchema,
  holidaySchema,
  updateHolidaySchema,
  type CreateHolidayInput,
  type Holiday,
  type HolidayFilters,
  type UpdateHolidayInput,
} from '../schemas/holiday.schema';

const holidayListResponseSchema = paginatedSchema(holidaySchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const holidayKeys = {
  all: ['holidays'] as const,
  lists: () => [...holidayKeys.all, 'list'] as const,
  list: (params?: ListParams & HolidayFilters) =>
    [...holidayKeys.lists(), params] as const,
  details: () => [...holidayKeys.all, 'detail'] as const,
  detail: (id: string) => [...holidayKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useHolidays(params?: ListParams & HolidayFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<Holiday>>({
    queryKey: holidayKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.type) searchParams.set('type', params.type);
      if (params?.year) searchParams.set('year', params.year);

      const query = searchParams.toString();
      const path = `/holidays${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return holidayListResponseSchema.parse(response.data);
    },
  });
}

export function useHoliday(id: string) {
  const client = useApiClient();
  return useQuery<Holiday>({
    queryKey: holidayKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/holidays/${id}`, { signal });
      return holidaySchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateHoliday() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Holiday, Error, CreateHolidayInput>({
    mutationFn: async (input) => {
      const body = createHolidaySchema.parse(input);
      const response = await client.post('/holidays', body);
      return holidaySchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: holidayKeys.lists() });
    },
  });
}

export function useUpdateHoliday(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Holiday, Error, UpdateHolidayInput>({
    mutationFn: async (input) => {
      const body = updateHolidaySchema.parse(input);
      const response = await client.patch(`/holidays/${id}`, body);
      return holidaySchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: holidayKeys.lists() });
      queryClient.setQueryData(holidayKeys.detail(id), data);
    },
  });
}

export function useDeleteHoliday() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/holidays/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: holidayKeys.lists() });
    },
  });
}
