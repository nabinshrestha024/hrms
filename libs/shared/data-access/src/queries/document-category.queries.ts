import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createDocumentCategorySchema,
  documentCategorySchema,
  updateDocumentCategorySchema,
  type CreateDocumentCategoryInput,
  type DocumentCategory,
  type DocumentCategoryFilters,
  type UpdateDocumentCategoryInput,
} from '../schemas/document-category.schema';

const documentCategoryListResponseSchema = paginatedSchema(
  documentCategorySchema
);

export const documentCategoryKeys = {
  all: ['document-categories'] as const,
  lists: () => [...documentCategoryKeys.all, 'list'] as const,
  list: (params?: ListParams & DocumentCategoryFilters) =>
    [...documentCategoryKeys.lists(), params] as const,
  details: () => [...documentCategoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentCategoryKeys.details(), id] as const,
};

export function useDocumentCategories(
  params?: ListParams & DocumentCategoryFilters
) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<DocumentCategory>>({
    queryKey: documentCategoryKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/document-categories${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return documentCategoryListResponseSchema.parse(response.data);
    },
  });
}

export function useDocumentCategory(id: string) {
  const client = useApiClient();
  return useQuery<DocumentCategory>({
    queryKey: documentCategoryKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/document-categories/${id}`, {
        signal,
      });
      return documentCategorySchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateDocumentCategory() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DocumentCategory, Error, CreateDocumentCategoryInput>({
    mutationFn: async (input) => {
      const body = createDocumentCategorySchema.parse(input);
      const response = await client.post('/document-categories', body);
      return documentCategorySchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentCategoryKeys.lists() });
    },
  });
}

export function useUpdateDocumentCategory(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DocumentCategory, Error, UpdateDocumentCategoryInput>({
    mutationFn: async (input) => {
      const body = updateDocumentCategorySchema.parse(input);
      const response = await client.patch(`/document-categories/${id}`, body);
      return documentCategorySchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: documentCategoryKeys.lists() });
      queryClient.setQueryData(documentCategoryKeys.detail(id), data);
    },
  });
}

export function useDeleteDocumentCategory() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/document-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentCategoryKeys.lists() });
    },
  });
}
