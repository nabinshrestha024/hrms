import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createDocumentReviewSchema,
  documentReviewSchema,
  updateDocumentReviewSchema,
  type CreateDocumentReviewInput,
  type DocumentReview,
  type DocumentReviewFilters,
  type UpdateDocumentReviewInput,
} from '../schemas/document-review.schema';

const documentReviewListResponseSchema = paginatedSchema(documentReviewSchema);

export const documentReviewKeys = {
  all: ['document-reviews'] as const,
  lists: () => [...documentReviewKeys.all, 'list'] as const,
  list: (params?: ListParams & DocumentReviewFilters) =>
    [...documentReviewKeys.lists(), params] as const,
  details: () => [...documentReviewKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentReviewKeys.details(), id] as const,
};

export function useDocumentReviews(
  params?: ListParams & DocumentReviewFilters
) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<DocumentReview>>({
    queryKey: documentReviewKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.type) searchParams.set('type', params.type);
      if (params?.status) searchParams.set('status', params.status);

      const query = searchParams.toString();
      const path = `/document-reviews${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return documentReviewListResponseSchema.parse(response.data);
    },
  });
}

export function useDocumentReview(id: string) {
  const client = useApiClient();
  return useQuery<DocumentReview>({
    queryKey: documentReviewKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/document-reviews/${id}`, { signal });
      return documentReviewSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateDocumentReview() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DocumentReview, Error, CreateDocumentReviewInput>({
    mutationFn: async (input) => {
      const body = createDocumentReviewSchema.parse(input);
      const response = await client.post('/document-reviews', body);
      return documentReviewSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentReviewKeys.lists() });
    },
  });
}

export function useUpdateDocumentReview(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DocumentReview, Error, UpdateDocumentReviewInput>({
    mutationFn: async (input) => {
      const body = updateDocumentReviewSchema.parse(input);
      const response = await client.patch(`/document-reviews/${id}`, body);
      return documentReviewSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: documentReviewKeys.lists() });
      queryClient.setQueryData(documentReviewKeys.detail(id), data);
    },
  });
}

export function useDeleteDocumentReview() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/document-reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentReviewKeys.lists() });
    },
  });
}
