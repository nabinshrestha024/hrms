import { WidgetRegistry } from '../registry/widget-registry';
import { TextWidget } from './text-widget';
import { SelectWidget } from './select-widget';
import { DateWidget } from './date-widget';
import { BooleanWidget } from './boolean-widget';
import { TextareaWidget } from '../widgets/textarea-widget';
import { FileWidget } from '../widgets/file-widget';
import { TimeWidget } from './time-widget';
import { ColorRadioWidget } from './color-radio-widget';

export function registerDefaultWidgets(registry: WidgetRegistry): void {
  registry.registerDefault('text', TextWidget);
  registry.registerDefault('textarea', TextareaWidget);
  registry.registerDefault('number', TextWidget);
  registry.registerDefault('select', SelectWidget);
  registry.registerDefault('date', DateWidget);
  registry.registerDefault('boolean', BooleanWidget);
  registry.registerDefault('file', FileWidget);
  registry.registerDefault('time', TimeWidget);
  registry.registerDefault('colorRadio', ColorRadioWidget);
}
