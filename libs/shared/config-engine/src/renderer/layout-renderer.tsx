import { Separator } from '@erp/ui';
import type { UseFormReturn } from 'react-hook-form';
import type { WidgetRegistry } from '../registry/widget-registry';
import type { FieldDefinition, LayoutNode } from '../types';
import { FieldRenderer } from './field-renderer';

interface LayoutRendererProps {
  node: LayoutNode;
  fields: FieldDefinition[];
  form: UseFormReturn<Record<string, unknown>>;
  widgetRegistry: WidgetRegistry;
  disabled?: boolean;
  fieldsetClassName?: string;
}

export function LayoutRenderer({
  node,
  fields,
  form,
  widgetRegistry,
  fieldsetClassName,
  disabled,
}: LayoutRendererProps) {
  switch (node.type) {
    case 'section':
      return (
        <fieldset className={`space-y-4 ${fieldsetClassName}`}>
          {node.header && <div>{node.header}</div>}
          {node.title && (
            <div className="text-[14px] leading-5 font-medium">
              {node.title}
            </div>
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
          {node.footer && <div>{node.footer}</div>}
        </fieldset>
      );

    case 'columns': {
      // const cols = node.columns;
      return (
        <div className="flex flex-col gap-4">
          {node.title && (
            <div className="text-[18px] text-foreground font-medium leading-7">
              {node.title}
            </div>
          )}
          <div
            className={`grid gap-4 grid-cols-1 lg:grid-cols-2 ${node.classname}`}
            // style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
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
        </div>
      );
    }

    case 'field': {
      const fieldDef = fields.find((f) => f.name === node.name);
      if (!fieldDef) return null;
      const merged = node.overrides
        ? { ...fieldDef, ...node.overrides }
        : fieldDef;
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
