import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  assetSchema,
  createAssetSchema,
  updateAssetSchema,
  type Asset,
  type AssetFilters,
  type CreateAssetInput,
  type UpdateAssetInput,
} from '../schemas/asset.schema';

const assetListResponseSchema = paginatedSchema(assetSchema);

export const assetKeys = {
  all: ['assets'] as const,
  lists: () => [...assetKeys.all, 'list'] as const,
  list: (params?: ListParams & AssetFilters) =>
    [...assetKeys.lists(), params] as const,
  details: () => [...assetKeys.all, 'detail'] as const,
  detail: (id: string) => [...assetKeys.details(), id] as const,
};

export function useAssets(params?: ListParams & AssetFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<Asset>>({
    queryKey: assetKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.category) searchParams.set('category', params.category);
      if (params?.status) searchParams.set('status', params.status);
      if (params?.condition) searchParams.set('condition', params.condition);

      const query = searchParams.toString();
      const path = `/assets${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return assetListResponseSchema.parse(response.data);
    },
  });
}

export function useAsset(id: string) {
  const client = useApiClient();
  return useQuery<Asset>({
    queryKey: assetKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/assets/${id}`, { signal });
      return assetSchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateAsset() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<Asset, Error, CreateAssetInput>({
    mutationFn: async (input) => {
      const body = createAssetSchema.parse(input);
      const response = await client.post('/assets', body);
      return assetSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assetKeys.lists() });
    },
  });
}

export function useUpdateAsset(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<Asset, Error, UpdateAssetInput>({
    mutationFn: async (input) => {
      const body = updateAssetSchema.parse(input);
      const response = await client.patch(`/assets/${id}`, body);
      return assetSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: assetKeys.lists() });
      queryClient.setQueryData(assetKeys.detail(id), data);
    },
  });
}

export function useDeleteAsset() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/assets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assetKeys.lists() });
    },
  });
}
