import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createDocumentTemplateSchema,
  documentTemplateSchema,
  updateDocumentTemplateSchema,
  type CreateDocumentTemplateInput,
  type DocumentTemplate,
  type DocumentTemplateFilters,
  type UpdateDocumentTemplateInput,
} from '../schemas/document-template.schema';

const documentTemplateListResponseSchema = paginatedSchema(
  documentTemplateSchema
);

export const documentTemplateKeys = {
  all: ['document-templates'] as const,
  lists: () => [...documentTemplateKeys.all, 'list'] as const,
  list: (params?: ListParams & DocumentTemplateFilters) =>
    [...documentTemplateKeys.lists(), params] as const,
  details: () => [...documentTemplateKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentTemplateKeys.details(), id] as const,
};

export function useDocumentTemplates(
  params?: ListParams & DocumentTemplateFilters
) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<DocumentTemplate>>({
    queryKey: documentTemplateKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.kind) searchParams.set('kind', params.kind);

      const query = searchParams.toString();
      const path = `/document-templates${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return documentTemplateListResponseSchema.parse(response.data);
    },
  });
}

export function useDocumentTemplate(id: string) {
  const client = useApiClient();
  return useQuery<DocumentTemplate>({
    queryKey: documentTemplateKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/document-templates/${id}`, {
        signal,
      });
      return documentTemplateSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateDocumentTemplate() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DocumentTemplate, Error, CreateDocumentTemplateInput>({
    mutationFn: async (input) => {
      const body = createDocumentTemplateSchema.parse(input);
      const response = await client.post('/document-templates', body);
      return documentTemplateSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentTemplateKeys.lists() });
    },
  });
}

export function useUpdateDocumentTemplate(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<DocumentTemplate, Error, UpdateDocumentTemplateInput>({
    mutationFn: async (input) => {
      const body = updateDocumentTemplateSchema.parse(input);
      const response = await client.patch(`/document-templates/${id}`, body);
      return documentTemplateSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: documentTemplateKeys.lists() });
      queryClient.setQueryData(documentTemplateKeys.detail(id), data);
    },
  });
}

export function useDeleteDocumentTemplate() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/document-templates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentTemplateKeys.lists() });
    },
  });
}
