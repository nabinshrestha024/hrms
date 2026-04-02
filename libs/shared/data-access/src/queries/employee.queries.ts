import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createEmployeeSchema,
  employeeSchema,
  updateEmployeeSchema,
  type CreateEmployeeInput,
  type Employee,
  type EmployeeFilters,
  type UpdateEmployeeInput,
} from '../schemas/employee.schema';

// ---------------------------------------------------------------------------
// Schema for paginated employee response
// ---------------------------------------------------------------------------

const employeeListResponseSchema = paginatedSchema(employeeSchema);

// ---------------------------------------------------------------------------
// Query key factory — consistent keys for caching & invalidation
// ---------------------------------------------------------------------------

export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (params?: ListParams & EmployeeFilters) =>
    [...employeeKeys.lists(), params] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useEmployees(params?: ListParams & EmployeeFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<Employee>>({
    queryKey: employeeKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.department) searchParams.set('department', params.department);
      if (params?.status) searchParams.set('status', params.status);

      const query = searchParams.toString();
      const path = `/employees${query ? `?${query}` : ''}`;
      const response = await client.get(path);
      return employeeListResponseSchema.parse(response.data);
    },
  });
}

export function useEmployee(id: string) {
  const client = useApiClient();
  return useQuery<Employee>({
    queryKey: employeeKeys.detail(id),
    queryFn: async () => {
      const response = await client.get(`/employees/${id}`);
      return employeeSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, CreateEmployeeInput>({
    mutationFn: async (input) => {
      // Validate input before sending
      const body = createEmployeeSchema.parse(input);
      const response = await client.post('/employees', body);
      return employeeSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}

export function useUpdateEmployee(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, UpdateEmployeeInput>({
    mutationFn: async (input) => {
      const body = updateEmployeeSchema.parse(input);
      const response = await client.patch(`/employees/${id}`, body);
      return employeeSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      queryClient.setQueryData(employeeKeys.detail(id), data);
    },
  });
}

export function useDeleteEmployee() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}
