import { Suspense } from 'react';
import type { SlotName, SlotPropsMap } from './types';
import { usePluginRegistry } from './plugin-provider';
import { PluginErrorBoundary } from './plugin-error-boundary';
import { Skeleton } from '@erp/ui';

type ExtensionSlotProps<T extends SlotName> = {
  name: T;
  fallback?: React.ReactNode;
} & SlotPropsMap[T];

export function ExtensionSlot<T extends SlotName>({
  name,
  fallback,
  ...slotProps
}: ExtensionSlotProps<T>) {
  const registry = usePluginRegistry();
  const registrations = registry.getSlotComponents(name);

  if (registrations.length === 0) return <>{fallback}</>;

  return (
    <>
      {registrations.map((reg) => {
        const Component = reg.component as React.ComponentType<SlotPropsMap[T]>;
        return (
          <PluginErrorBoundary key={reg.pluginId} pluginId={reg.pluginId}>
            <Suspense fallback={<Skeleton className="h-8 w-full" />}>
              <Component {...(slotProps as unknown as SlotPropsMap[T])} />
            </Suspense>
          </PluginErrorBoundary>
        );
      })}
    </>
  );
}
