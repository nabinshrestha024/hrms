import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createEmployeeDocumentSchema,
  employeeDocumentSchema,
  updateEmployeeDocumentSchema,
  type CreateEmployeeDocumentInput,
  type EmployeeDocument,
  type EmployeeDocumentFilters,
  type UpdateEmployeeDocumentInput,
} from '../schemas/employee-document.schema';

const employeeDocumentListResponseSchema = paginatedSchema(
  employeeDocumentSchema
);

export const employeeDocumentKeys = {
  all: ['employee-documents'] as const,
  lists: () => [...employeeDocumentKeys.all, 'list'] as const,
  list: (params?: ListParams & EmployeeDocumentFilters) =>
    [...employeeDocumentKeys.lists(), params] as const,
  details: () => [...employeeDocumentKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeDocumentKeys.details(), id] as const,
};

export function useEmployeeDocuments(
  params?: ListParams & EmployeeDocumentFilters
) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<EmployeeDocument>>({
    queryKey: employeeDocumentKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.category) searchParams.set('category', params.category);
      if (params?.visible !== undefined)
        searchParams.set('visible', String(params.visible));

      const query = searchParams.toString();
      const path = `/employee-documents${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return employeeDocumentListResponseSchema.parse(response.data);
    },
  });
}

export function useEmployeeDocument(id: string) {
  const client = useApiClient();
  return useQuery<EmployeeDocument>({
    queryKey: employeeDocumentKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/employee-documents/${id}`, {
        signal,
      });
      return employeeDocumentSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateEmployeeDocument() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<EmployeeDocument, Error, CreateEmployeeDocumentInput>({
    mutationFn: async (input) => {
      const body = createEmployeeDocumentSchema.parse(input);
      const response = await client.post('/employee-documents', body);
      return employeeDocumentSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeDocumentKeys.lists() });
    },
  });
}

export function useUpdateEmployeeDocument(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<EmployeeDocument, Error, UpdateEmployeeDocumentInput>({
    mutationFn: async (input) => {
      const body = updateEmployeeDocumentSchema.parse(input);
      const response = await client.patch(`/employee-documents/${id}`, body);
      return employeeDocumentSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: employeeDocumentKeys.lists() });
      queryClient.setQueryData(employeeDocumentKeys.detail(id), data);
    },
  });
}

export function useDeleteEmployeeDocument() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/employee-documents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeDocumentKeys.lists() });
    },
  });
}
