import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createWorkTypeSchema,
  updateWorkTypeSchema,
  workTypeSchema,
  type CreateWorkTypeInput,
  type UpdateWorkTypeInput,
  type WorkType,
  type WorkTypeFilters,
} from '../schemas/work-type.schema';

const workTypeListResponseSchema = paginatedSchema(workTypeSchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const workTypeKeys = {
  all: ['work-types'] as const,
  lists: () => [...workTypeKeys.all, 'list'] as const,
  list: (params?: ListParams & WorkTypeFilters) =>
    [...workTypeKeys.lists(), params] as const,
  details: () => [...workTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...workTypeKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useWorkTypes(params?: ListParams & WorkTypeFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<WorkType>>({
    queryKey: workTypeKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/work-types${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return workTypeListResponseSchema.parse(response.data);
    },
  });
}

export function useWorkType(id: string) {
  const client = useApiClient();
  return useQuery<WorkType>({
    queryKey: workTypeKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/work-types/${id}`, { signal });
      return workTypeSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateWorkType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<WorkType, Error, CreateWorkTypeInput>({
    mutationFn: async (input) => {
      const body = createWorkTypeSchema.parse(input);
      const response = await client.post('/work-types', body);
      return workTypeSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workTypeKeys.lists() });
    },
  });
}

export function useUpdateWorkType(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<WorkType, Error, UpdateWorkTypeInput>({
    mutationFn: async (input) => {
      const body = updateWorkTypeSchema.parse(input);
      const response = await client.patch(`/work-types/${id}`, body);
      return workTypeSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: workTypeKeys.lists() });
      queryClient.setQueryData(workTypeKeys.detail(id), data);
    },
  });
}

export function useDeleteWorkType() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/work-types/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workTypeKeys.lists() });
    },
  });
}
