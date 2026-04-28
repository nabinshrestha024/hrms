import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  paginatedSchema,
  type ListParams,
  type PaginatedResponse,
} from '../schemas/common.schema';
import {
  assetCategorySchema,
  createAssetCategorySchema,
  updateAssetCategorySchema,
  type AssetCategory,
  type AssetCategoryFilters,
  type CreateAssetCategoryInput,
  type UpdateAssetCategoryInput,
} from '../schemas/asset-category.schema';

const assetCategoryListResponseSchema = paginatedSchema(assetCategorySchema);

export const assetCategoryKeys = {
  all: ['asset-categories'] as const,
  lists: () => [...assetCategoryKeys.all, 'list'] as const,
  list: (params?: ListParams & AssetCategoryFilters) =>
    [...assetCategoryKeys.lists(), params] as const,
  details: () => [...assetCategoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...assetCategoryKeys.details(), id] as const,
};

export function useAssetCategories(params?: ListParams & AssetCategoryFilters) {
  const client = useApiClient();
  return useQuery<PaginatedResponse<AssetCategory>>({
    queryKey: assetCategoryKeys.list(params),
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.pageSize)
        searchParams.set('pageSize', String(params.pageSize));
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
      if (params?.search) searchParams.set('search', params.search);

      const query = searchParams.toString();
      const path = `/asset-categories${query ? `?${query}` : ''}`;
      const response = await client.get(path, { signal });
      return assetCategoryListResponseSchema.parse(response.data);
    },
  });
}

export function useAssetCategory(id: string) {
  const client = useApiClient();
  return useQuery<AssetCategory>({
    queryKey: assetCategoryKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await client.get(`/asset-categories/${id}`, { signal });
      return assetCategorySchema.parse(response.data);
    },
    enabled: !!id,
  });
}

export function useCreateAssetCategory() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<AssetCategory, Error, CreateAssetCategoryInput>({
    mutationFn: async (input) => {
      const body = createAssetCategorySchema.parse(input);
      const response = await client.post('/asset-categories', body);
      return assetCategorySchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assetCategoryKeys.lists() });
    },
  });
}

export function useUpdateAssetCategory(id: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<AssetCategory, Error, UpdateAssetCategoryInput>({
    mutationFn: async (input) => {
      const body = updateAssetCategorySchema.parse(input);
      const response = await client.patch(`/asset-categories/${id}`, body);
      return assetCategorySchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: assetCategoryKeys.lists() });
      queryClient.setQueryData(assetCategoryKeys.detail(id), data);
    },
  });
}

export function useDeleteAssetCategory() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await client.delete(`/asset-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assetCategoryKeys.lists() });
    },
  });
}
