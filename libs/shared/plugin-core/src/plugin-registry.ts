import type { ComponentType } from 'react';
import type { SlotName, SlotRegistration, RouteRegistration, PluginDefinition, PluginRegistryAPI } from './types';

export class PluginRegistry {
  private slots = new Map<SlotName, SlotRegistration[]>();
  private routes: RouteRegistration[] = [];
  private widgets = new Map<string, ComponentType<any>>();
  private plugins = new Map<string, PluginDefinition>();

  registerPlugin(plugin: PluginDefinition): void {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin "${plugin.id}" is already registered`);
    }
    this.plugins.set(plugin.id, plugin);

    const api: PluginRegistryAPI = {
      addToSlot: (slot, reg) => {
        if (!this.slots.has(slot)) this.slots.set(slot, []);
        this.slots.get(slot)!.push({ ...reg, pluginId: plugin.id } as SlotRegistration);
      },
      addRoutes: (routes) => {
        this.routes.push(...routes);
      },
      addWidget: (name, component) => {
        this.widgets.set(name, component);
      },
    };

    plugin.register(api);
  }

  bootstrapAll(): void {
    for (const plugin of this.plugins.values()) {
      const api: PluginRegistryAPI = {
        addToSlot: (slot, reg) => {
          if (!this.slots.has(slot)) this.slots.set(slot, []);
          this.slots.get(slot)!.push({ ...reg, pluginId: plugin.id } as SlotRegistration);
        },
        addRoutes: (routes) => { this.routes.push(...routes); },
        addWidget: (name, component) => { this.widgets.set(name, component); },
      };
      plugin.bootstrap?.(api);
    }
  }

  getSlotComponents<T extends SlotName>(slot: T): SlotRegistration<T>[] {
    const registrations = (this.slots.get(slot) ?? []) as SlotRegistration<T>[];
    return [...registrations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  getRoutes(): RouteRegistration[] {
    return [...this.routes];
  }

  getWidget(name: string): ComponentType<any> | undefined {
    return this.widgets.get(name);
  }
}
