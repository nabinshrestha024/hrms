export type {
  SlotName,
  SlotPropsMap,
  SlotRegistration,
  RouteRegistration,
  PluginDefinition,
  PluginRegistryAPI,
} from './types';
export { PluginRegistry } from './plugin-registry';
export { PluginProvider, usePluginRegistry } from './plugin-provider';
export { ExtensionSlot } from './extension-slot';
export { PluginErrorBoundary } from './plugin-error-boundary';
