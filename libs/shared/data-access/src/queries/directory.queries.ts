import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createDirectoryEntrySchema,
  directoryEntrySchema,
  updateDirectoryEntrySchema,
  type CreateDirectoryEntryInput,
  type DirectoryEntry,
  type DirectoryEntryFilters,
  type UpdateDirectoryEntryInput,
} from '../schemas/directory.schema';

const directoryEntryListResponseSchema = paginatedSchema(directoryEntrySchema);

export const directoryEntryKeys = {
  all: ['directory-entries'] as const,
  lists: () => [...directoryEntryKeys.all, 'list'] as const,
  list: (params?: ListParams & DirectoryEntryFilters) =>
    [...directoryEntryKeys.lists(), params] as const,
  details: () => [...directoryEntryKeys.all, 'detail'] as const,
  detail: (id: string) => [...directoryEntryKeys.details(), id] as const,
};

export function useDirectoryEntries(
  params?: ListParams & DirectoryEntryFilters
) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<DirectoryEntry>>({
    queryKey: directoryEntryKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.branch) searchParams.set('branch', params.branch);
      if (params?.department) searchParams.set('department', params.department);

      const query = searchParams.toString();
      const path = `/directory-entries${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return directoryEntryListResponseSchema.parse(response.data);
    },
  });
}

export function useDirectoryEntry(id: string) {
  const client = useApiClient();
  return useQuery<DirectoryEntry>({
    queryKey: directoryEntryKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/directory-entries/${id}`, {
        signal,
      });
      return directoryEntrySchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateDirectoryEntry() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DirectoryEntry, Error, CreateDirectoryEntryInput>({
    mutationFn: async (input) => {
      const body = createDirectoryEntrySchema.parse(input);
      const response = await client.post('/directory-entries', body);
      return directoryEntrySchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directoryEntryKeys.lists() });
    },
  });
}

export function useUpdateDirectoryEntry(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DirectoryEntry, Error, UpdateDirectoryEntryInput>({
    mutationFn: async (input) => {
      const body = updateDirectoryEntrySchema.parse(input);
      const response = await client.patch(`/directory-entries/${id}`, body);
      return directoryEntrySchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: directoryEntryKeys.lists() });
      queryClient.setQueryData(directoryEntryKeys.detail(id), data);
    },
  });
}

export function useDeleteDirectoryEntry() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/directory-entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directoryEntryKeys.lists() });
    },
  });
}
