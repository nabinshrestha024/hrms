import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createJobLevelSchema,
  jobLevelSchema,
  updateJobLevelSchema,
  type CreateJobLevelInput,
  type JobLevel,
  type JobLevelFilters,
  type UpdateJobLevelInput,
} from '../schemas/job-level.schema';

const jobLevelListResponseSchema = paginatedSchema(jobLevelSchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const jobLevelKeys = {
  all: ['job-levels'] as const,
  lists: () => [...jobLevelKeys.all, 'list'] as const,
  list: (params?: ListParams & JobLevelFilters) =>
    [...jobLevelKeys.lists(), params] as const,
  details: () => [...jobLevelKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobLevelKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useJobLevels(params?: ListParams & JobLevelFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<JobLevel>>({
    queryKey: jobLevelKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/job-levels${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return jobLevelListResponseSchema.parse(response.data);
    },
  });
}

export function useJobLevel(id: string) {
  const client = useApiClient();
  return useQuery<JobLevel>({
    queryKey: jobLevelKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/job-levels/${id}`, { signal });
      return jobLevelSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateJobLevel() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<JobLevel, Error, CreateJobLevelInput>({
    mutationFn: async (input) => {
      const body = createJobLevelSchema.parse(input);
      const response = await client.post('/job-levels', body);
      return jobLevelSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobLevelKeys.lists() });
    },
  });
}

export function useUpdateJobLevel(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<JobLevel, Error, UpdateJobLevelInput>({
    mutationFn: async (input) => {
      const body = updateJobLevelSchema.parse(input);
      const response = await client.patch(`/job-levels/${id}`, body);
      return jobLevelSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: jobLevelKeys.lists() });
      queryClient.setQueryData(jobLevelKeys.detail(id), data);
    },
  });
}

export function useDeleteJobLevel() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/job-levels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobLevelKeys.lists() });
    },
  });
}
