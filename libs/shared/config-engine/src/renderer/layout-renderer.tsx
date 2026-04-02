import type { LayoutNode, FieldDefinition } from '../types';
import type { WidgetRegistry } from '../registry/widget-registry';
import type { UseFormReturn } from 'react-hook-form';
import { FieldRenderer } from './field-renderer';
import { Separator } from '@erp/ui';

interface LayoutRendererProps {
  node: LayoutNode;
  fields: FieldDefinition[];
  form: UseFormReturn<any>;
  widgetRegistry: WidgetRegistry;
  disabled?: boolean;
}

export function LayoutRenderer({ node, fields, form, widgetRegistry, disabled }: LayoutRendererProps) {
  switch (node.type) {
    case 'section':
      return (
        <fieldset className="space-y-4">
          {node.title && (
            <legend className="text-lg font-semibold">{node.title}</legend>
          )}
          {node.children.map((child, i) => (
            <LayoutRenderer
              key={i}
              node={child}
              fields={fields}
              form={form}
              widgetRegistry={widgetRegistry}
              disabled={disabled}
            />
          ))}
        </fieldset>
      );

    case 'columns': {
      const cols = node.columns;
      return (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {node.children.map((child, i) => (
            <LayoutRenderer
              key={i}
              node={child}
              fields={fields}
              form={form}
              widgetRegistry={widgetRegistry}
              disabled={disabled}
            />
          ))}
        </div>
      );
    }

    case 'field': {
      const fieldDef = fields.find((f) => f.name === node.name);
      if (!fieldDef) return null;
      const merged = node.overrides ? { ...fieldDef, ...node.overrides } : fieldDef;
      return (
        <FieldRenderer
          field={merged}
          form={form}
          widgetRegistry={widgetRegistry}
          disabled={disabled}
        />
      );
    }

    case 'divider':
      return <Separator />;

    default:
      return null;
  }
}
