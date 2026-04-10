import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  branchSchema,
  createBranchSchema,
  updateBranchSchema,
  departmentSchema,
  createDepartmentSchema,
  updateDepartmentSchema,
  type Branch,
  type CreateBranchInput,
  type UpdateBranchInput,
  type BranchFilters,
  type Department,
  type CreateDepartmentInput,
  type UpdateDepartmentInput,
} from '../schemas/company-setup.schema';
import type { ListParams, PaginatedResponse } from '../schemas/common.schema';
import { paginatedSchema } from '../schemas/common.schema';

// ---------------------------------------------------------------------------
// Query key factories
// ---------------------------------------------------------------------------

export const branchKeys = {
  all: ['branches'] as const,
  lists: () => [...branchKeys.all, 'list'] as const,
  list: (params?: ListParams & BranchFilters) =>
    [...branchKeys.lists(), params] as const,
  details: () => [...branchKeys.all, 'detail'] as const,
  detail: (id: string) => [...branchKeys.details(), id] as const,
};

export const departmentKeys = {
  all: ['departments'] as const,
  lists: () => [...departmentKeys.all, 'list'] as const,
  list: (params?: ListParams) => [...departmentKeys.lists(), params] as const,
  details: () => [...departmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...departmentKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Branch hooks
// ---------------------------------------------------------------------------

export function useBranches(params?: ListParams & BranchFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<Branch>>({
    queryKey: branchKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.set(key, String(value));
          }
        });
      }
      const query = searchParams.toString();
      const path = query ? `/branches?${query}` : '/branches';
      const response = await client.get(path, { signal });
      return paginatedSchema(branchSchema).parse(response.data);
    },
  });
}

export function useBranch(id: string) {
  const client = useApiClient();
  return useQuery<Branch>({
    queryKey: branchKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/branches/${id}`, { signal });
      return branchSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateBranch() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<Branch, Error, CreateBranchInput>({
    mutationFn: async (input) => {
      const body = createBranchSchema.parse(input);
      const response = await client.post('/branches', body);
      return branchSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
}

export function useUpdateBranch(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<Branch, Error, UpdateBranchInput>({
    mutationFn: async (input) => {
      const body = updateBranchSchema.parse(input);
      const response = await client.patch(`/branches/${id}`, body);
      return branchSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: branchKeys.detail(id) });
    },
  });
}

export function useDeleteBranch() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/branches/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
}

// ---------------------------------------------------------------------------
// Department hooks
// ---------------------------------------------------------------------------

export function useDepartments(params?: ListParams) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<Department>>({
    queryKey: departmentKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.set(key, String(value));
          }
        });
      }
      const query = searchParams.toString();
      const path = query ? `/departments?${query}` : '/departments';
      const response = await client.get(path, { signal });
      return paginatedSchema(departmentSchema).parse(response.data);
    },
  });
}

export function useDepartment(id: string) {
  const client = useApiClient();
  return useQuery<Department>({
    queryKey: departmentKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/departments/${id}`, { signal });
      return departmentSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateDepartment() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<Department, Error, CreateDepartmentInput>({
    mutationFn: async (input) => {
      const body = createDepartmentSchema.parse(input);
      const response = await client.post('/departments', body);
      return departmentSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
}

export function useUpdateDepartment(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<Department, Error, UpdateDepartmentInput>({
    mutationFn: async (input) => {
      const body = updateDepartmentSchema.parse(input);
      const response = await client.patch(`/departments/${id}`, body);
      return departmentSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: departmentKeys.detail(id),
      });
    },
  });
}

export function useDeleteDepartment() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/departments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
}
