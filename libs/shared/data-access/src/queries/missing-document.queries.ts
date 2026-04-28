import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createMissingDocumentSchema,
  missingDocumentSchema,
  updateMissingDocumentSchema,
  type CreateMissingDocumentInput,
  type MissingDocument,
  type MissingDocumentFilters,
  type UpdateMissingDocumentInput,
} from '../schemas/missing-document.schema';

const missingDocumentListResponseSchema = paginatedSchema(
  missingDocumentSchema
);

export const missingDocumentKeys = {
  all: ['missing-documents'] as const,
  lists: () => [...missingDocumentKeys.all, 'list'] as const,
  list: (params?: ListParams & MissingDocumentFilters) =>
    [...missingDocumentKeys.lists(), params] as const,
  details: () => [...missingDocumentKeys.all, 'detail'] as const,
  detail: (id: string) => [...missingDocumentKeys.details(), id] as const,
};

export function useMissingDocuments(
  params?: ListParams & MissingDocumentFilters
) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<MissingDocument>>({
    queryKey: missingDocumentKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.department) searchParams.set('department', params.department);
      if (params?.branch) searchParams.set('branch', params.branch);
      if (params?.priority) searchParams.set('priority', params.priority);

      const query = searchParams.toString();
      const path = `/missing-documents${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return missingDocumentListResponseSchema.parse(response.data);
    },
  });
}

export function useMissingDocument(id: string) {
  const client = useApiClient();
  return useQuery<MissingDocument>({
    queryKey: missingDocumentKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/missing-documents/${id}`, { signal });
      return missingDocumentSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateMissingDocument() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<MissingDocument, Error, CreateMissingDocumentInput>({
    mutationFn: async (input) => {
      const body = createMissingDocumentSchema.parse(input);
      const response = await client.post('/missing-documents', body);
      return missingDocumentSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: missingDocumentKeys.lists() });
    },
  });
}

export function useUpdateMissingDocument(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<MissingDocument, Error, UpdateMissingDocumentInput>({
    mutationFn: async (input) => {
      const body = updateMissingDocumentSchema.parse(input);
      const response = await client.patch(`/missing-documents/${id}`, body);
      return missingDocumentSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: missingDocumentKeys.lists() });
      queryClient.setQueryData(missingDocumentKeys.detail(id), data);
    },
  });
}

export function useDeleteMissingDocument() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/missing-documents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: missingDocumentKeys.lists() });
    },
  });
}
