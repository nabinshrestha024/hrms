import type { ComponentType } from 'react';
import type { FieldDefinition, FieldType, WidgetProps } from '../types';

export class WidgetRegistry {
  private defaults = new Map<FieldType, ComponentType<WidgetProps>>();
  private custom = new Map<string, ComponentType<WidgetProps>>();

  registerDefault(type: FieldType, component: ComponentType<WidgetProps>): void {
    this.defaults.set(type, component);
  }

  register(name: string, component: ComponentType<WidgetProps>): void {
    this.custom.set(name, component);
  }

  resolve(field: Pick<FieldDefinition, 'type' | 'name' | 'widget'>): ComponentType<WidgetProps> | undefined {
    if (field.widget && this.custom.has(field.widget)) {
      return this.custom.get(field.widget)!;
    }
    return this.defaults.get(field.type);
  }
}
