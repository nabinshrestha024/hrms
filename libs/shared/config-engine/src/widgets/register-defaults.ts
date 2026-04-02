import { WidgetRegistry } from '../registry/widget-registry';
import { TextWidget } from './text-widget';
import { NumberWidget } from './number-widget';
import { SelectWidget } from './select-widget';
import { DateWidget } from './date-widget';
import { BooleanWidget } from './boolean-widget';

export function registerDefaultWidgets(registry: WidgetRegistry): void {
  registry.registerDefault('text', TextWidget);
  registry.registerDefault('textarea', TextWidget);
  registry.registerDefault('number', NumberWidget);
  registry.registerDefault('select', SelectWidget);
  registry.registerDefault('date', DateWidget);
  registry.registerDefault('boolean', BooleanWidget);
}
