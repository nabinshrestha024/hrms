import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  Allowance,
  AllowanceFilters,
  allowanceSchema,
  CreateAllowanceInput,
  createAllowanceSchema,
} from '../schemas/payroll-setup-allowance.schema';

const allowanceListResponseSchema = paginatedSchema(allowanceSchema);

export const allowanceKeys = {
  all: ['generate-payrolls'] as const,
  lists: () => [...allowanceKeys.all, 'list'] as const,
  list: (params?: ListParams & AllowanceFilters) =>
    [...allowanceKeys.lists(), params] as const,
  details: () => [...allowanceKeys.all, 'detail'] as const,
  detail: (id: string) => [...allowanceKeys.details(), id] as const,
};

export function useAllowance(params?: ListParams & AllowanceFilters) {
  const client = useApiClient();

  return useQuery<PaginatedResponse<Allowance>>({
    queryKey: allowanceKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();

      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/allowances${query ? `?${query}` : ''}`;

      const response = await client.get(path, { signal });

      console.warn('Allowance data:', response.data);

      return allowanceListResponseSchema.parse(response.data);
    },
  });
}

export function useCreateAllowance() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Allowance, Error, CreateAllowanceInput>({
    mutationFn: async (input) => {
      const body = createAllowanceSchema.parse(input);
      const response = await client.post('/allowances', body);
      return allowanceSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allowanceKeys.lists() });
    },
  });
}
