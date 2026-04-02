import { describe, it, expect } from 'vitest';
import { PluginRegistry } from './plugin-registry';
import type { PluginDefinition } from './types';

const TestComponent = () => null;

const testPlugin: PluginDefinition = {
  id: 'test.plugin',
  name: 'Test Plugin',
  version: '1.0.0',
  register(registry) {
    registry.addToSlot('dashboard.widgets', {
      component: TestComponent as any,
      order: 10,
    });
    registry.addToSlot('sidebar.navigation', {
      component: TestComponent as any,
      order: 5,
    });
  },
};

describe('PluginRegistry', () => {
  it('registers a plugin and retrieves slot components', () => {
    const registry = new PluginRegistry();
    registry.registerPlugin(testPlugin);
    const components = registry.getSlotComponents('dashboard.widgets');
    expect(components).toHaveLength(1);
    expect(components[0].pluginId).toBe('test.plugin');
  });

  it('returns empty array for unregistered slot', () => {
    const registry = new PluginRegistry();
    expect(registry.getSlotComponents('toolbar.items')).toEqual([]);
  });

  it('sorts slot components by order', () => {
    const registry = new PluginRegistry();
    const pluginA: PluginDefinition = {
      id: 'a', name: 'A', version: '1.0.0',
      register(r) { r.addToSlot('dashboard.widgets', { component: TestComponent as any, order: 20 }); },
    };
    const pluginB: PluginDefinition = {
      id: 'b', name: 'B', version: '1.0.0',
      register(r) { r.addToSlot('dashboard.widgets', { component: TestComponent as any, order: 5 }); },
    };
    registry.registerPlugin(pluginA);
    registry.registerPlugin(pluginB);
    const components = registry.getSlotComponents('dashboard.widgets');
    expect(components[0].pluginId).toBe('b');
    expect(components[1].pluginId).toBe('a');
  });

  it('prevents duplicate plugin registration', () => {
    const registry = new PluginRegistry();
    registry.registerPlugin(testPlugin);
    expect(() => registry.registerPlugin(testPlugin)).toThrow('already registered');
  });

  it('runs bootstrap after all plugins are registered', () => {
    const bootstrapOrder: string[] = [];
    const p1: PluginDefinition = {
      id: 'p1', name: 'P1', version: '1.0.0',
      register() {},
      bootstrap() { bootstrapOrder.push('p1'); },
    };
    const p2: PluginDefinition = {
      id: 'p2', name: 'P2', version: '1.0.0',
      register() {},
      bootstrap() { bootstrapOrder.push('p2'); },
    };
    const registry = new PluginRegistry();
    registry.registerPlugin(p1);
    registry.registerPlugin(p2);
    registry.bootstrapAll();
    expect(bootstrapOrder).toEqual(['p1', 'p2']);
  });
});
