import { describe, it, expect } from 'vitest';
import { WidgetRegistry } from './widget-registry';

const MockText = () => null;
const MockCustom = () => null;

describe('WidgetRegistry', () => {
  it('registers and resolves a widget by field type', () => {
    const registry = new WidgetRegistry();
    registry.registerDefault('text', MockText as any);
    expect(registry.resolve({ name: 'test', type: 'text' })).toBe(MockText);
  });

  it('resolves custom widget override by name', () => {
    const registry = new WidgetRegistry();
    registry.registerDefault('text', MockText as any);
    registry.register('custom-text', MockCustom as any);
    expect(
      registry.resolve({ name: 'test', type: 'text', widget: 'custom-text' })
    ).toBe(MockCustom);
  });

  it('falls back to type default when custom widget not found', () => {
    const registry = new WidgetRegistry();
    registry.registerDefault('text', MockText as any);
    expect(
      registry.resolve({ name: 'test', type: 'text', widget: 'nonexistent' })
    ).toBe(MockText);
  });

  it('returns undefined for unregistered type', () => {
    const registry = new WidgetRegistry();
    expect(
      registry.resolve({ name: 'test', type: 'currency' })
    ).toBeUndefined();
  });

  it('allows overriding a default widget', () => {
    const registry = new WidgetRegistry();
    registry.registerDefault('text', MockText as any);
    registry.registerDefault('text', MockCustom as any);
    expect(registry.resolve({ name: 'test', type: 'text' })).toBe(MockCustom);
  });
});
