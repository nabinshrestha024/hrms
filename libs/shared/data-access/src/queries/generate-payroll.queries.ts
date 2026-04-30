import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  GeneratePayroll,
  GeneratePayrollFilters,
  generatePayrollSchema,
} from '../schemas/generate-payroll.schema';

const generatePayrollListResponseSchema = paginatedSchema(
  generatePayrollSchema
);

export const generatePayrollKeys = {
  all: ['generate-payrolls'] as const,
  lists: () => [...generatePayrollKeys.all, 'list'] as const,
  list: (params?: ListParams & GeneratePayrollFilters) =>
    [...generatePayrollKeys.lists(), params] as const,
  details: () => [...generatePayrollKeys.all, 'detail'] as const,
  detail: (id: string) => [...generatePayrollKeys.details(), id] as const,
};

export function useGeneratePayroll(
  params?: ListParams & GeneratePayrollFilters
) {
  const client = useApiClient();

  return useQuery<PaginatedResponse<GeneratePayroll>>({
    queryKey: generatePayrollKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();

      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/generate-payrolls${query ? `?${query}` : ''}`;

      const response = await client.get(path, { signal });

      console.warn('Generate Payroll data:', response.data);

      return generatePayrollListResponseSchema.parse(response.data);
    },
  });
}
