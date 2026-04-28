import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  createCurrencySchema,
  currencySchema,
  updateCurrencySchema,
  type CreateCurrencyInput,
  type Currency,
  type CurrencyFilters,
  type UpdateCurrencyInput,
} from '../schemas/currency.schema';

const currencyListResponseSchema = paginatedSchema(currencySchema);

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------

export const currencyKeys = {
  all: ['currencies'] as const,
  lists: () => [...currencyKeys.all, 'list'] as const,
  list: (params?: ListParams & CurrencyFilters) =>
    [...currencyKeys.lists(), params] as const,
  details: () => [...currencyKeys.all, 'detail'] as const,
  detail: (id: string) => [...currencyKeys.details(), id] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useCurrencies(params?: ListParams & CurrencyFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<Currency>>({
    queryKey: currencyKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/currencies${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return currencyListResponseSchema.parse(response.data);
    },
  });
}

export function useCurrency(id: string) {
  const client = useApiClient();
  return useQuery<Currency>({
    queryKey: currencyKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/currencies/${id}`, { signal });
      return currencySchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateCurrency() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Currency, Error, CreateCurrencyInput>({
    mutationFn: async (input) => {
      const body = createCurrencySchema.parse(input);
      const response = await client.post('/currencies', body);
      return currencySchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.lists() });
    },
  });
}

export function useUpdateCurrency(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<Currency, Error, UpdateCurrencyInput>({
    mutationFn: async (input) => {
      const body = updateCurrencySchema.parse(input);
      const response = await client.patch(`/currencies/${id}`, body);
      return currencySchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.lists() });
      queryClient.setQueryData(currencyKeys.detail(id), data);
    },
  });
}

export function useDeleteCurrency() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/currencies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.lists() });
    },
  });
}
