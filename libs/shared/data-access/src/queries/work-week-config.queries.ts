import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import {
  updateWorkWeekConfigSchema,
  workWeekConfigSchema,
  type UpdateWorkWeekConfigInput,
  type WorkWeekConfig,
} from '../schemas/work-week-config.schema';

// ---------------------------------------------------------------------------
// Query keys (singleton — only one logical "record")
// ---------------------------------------------------------------------------

export const workWeekConfigKeys = {
  all: ['work-week-config'] as const,
  current: () => [...workWeekConfigKeys.all, 'current'] as const,
};

// ---------------------------------------------------------------------------
// Hooks — only GET + PATCH. Singletons don't expose list/create/delete.
// ---------------------------------------------------------------------------

export function useWorkWeekConfig() {
  const client = useApiClient();
  return useQuery<WorkWeekConfig>({
    queryKey: workWeekConfigKeys.current(),
    queryFn: async ({ signal }) => {
      const response = await client.get('/work-week-config', { signal });
      return workWeekConfigSchema.parse(response.data);
    },
  });
}

export function useUpdateWorkWeekConfig() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<WorkWeekConfig, Error, UpdateWorkWeekConfigInput>({
    mutationFn: async (input) => {
      const body = updateWorkWeekConfigSchema.parse(input);
      const response = await client.patch('/work-week-config', body);
      return workWeekConfigSchema.parse(response.data);
    },
    onSuccess: (data) => {
      // Singleton — write directly to the cache rather than invalidating
      // a list, so the UI updates without a refetch.
      queryClient.setQueryData(workWeekConfigKeys.current(), data);
    },
  });
}
