import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { PluginRegistry } from './plugin-registry';
import type { PluginDefinition } from './types';

const PluginRegistryContext = createContext<PluginRegistry | null>(null);

export function usePluginRegistry(): PluginRegistry {
  const ctx = useContext(PluginRegistryContext);
  if (!ctx)
    throw new Error('usePluginRegistry must be used within PluginProvider');
  return ctx;
}

interface PluginProviderProps {
  plugins: PluginDefinition[];
  children: ReactNode;
}

export function PluginProvider({ plugins, children }: PluginProviderProps) {
  const registry = useMemo(() => {
    const reg = new PluginRegistry();
    for (const plugin of plugins) {
      reg.registerPlugin(plugin);
    }
    reg.bootstrapAll();
    return reg;
  }, [plugins]);

  return (
    <PluginRegistryContext.Provider value={registry}>
      {children}
    </PluginRegistryContext.Provider>
  );
}
