import type { ComponentType } from 'react';

export type SlotName =
  | 'dashboard.widgets'
  | 'sidebar.navigation'
  | 'entity.detail.tabs'
  | 'entity.detail.actions'
  | 'form.field.extensions'
  | 'toolbar.items'
  | 'settings.sections'
  | 'table.row.actions';

export interface SlotPropsMap {
  'dashboard.widgets': { tenantId: string; userId: string };
  'sidebar.navigation': { collapsed: boolean; currentPath: string };
  'entity.detail.tabs': {
    entityType: string;
    entityId: string;
    entity: Record<string, unknown>;
  };
  'entity.detail.actions': {
    entityType: string;
    entityId: string;
    onRefresh: () => void;
  };
  'form.field.extensions': {
    fieldName: string;
    value: unknown;
    onChange: (v: unknown) => void;
  };
  'toolbar.items': { tenantId: string };
  'settings.sections': { tenantId: string };
  'table.row.actions': {
    entityType: string;
    row: Record<string, unknown>;
    onRefresh: () => void;
  };
}

export interface SlotRegistration<T extends SlotName = SlotName> {
  pluginId: string;
  component: ComponentType<SlotPropsMap[T]>;
  order?: number;
}

export interface RouteRegistration {
  path: string;
  component: ComponentType;
}

export interface PluginDefinition {
  id: string;
  name: string;
  version: string;
  register(registry: PluginRegistryAPI): void;
  bootstrap?(registry: PluginRegistryAPI): void;
}

export interface PluginRegistryAPI {
  addToSlot<T extends SlotName>(
    slot: T,
    registration: Omit<SlotRegistration<T>, 'pluginId'>
  ): void;
  addRoutes(routes: RouteRegistration[]): void;
  addWidget(
    name: string,
    component: ComponentType<Record<string, unknown>>
  ): void;
}
