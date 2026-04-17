import type { FieldDefinition } from '../types';
import type { WidgetRegistry } from '../registry/widget-registry';
import type { UseFormReturn } from 'react-hook-form';

interface FieldRendererProps {
  field: FieldDefinition;
  form: UseFormReturn<Record<string, unknown>>;
  widgetRegistry: WidgetRegistry;
  disabled?: boolean;
}

export function FieldRenderer({
  field,
  form,
  widgetRegistry,
  disabled,
}: FieldRendererProps) {
  // Subscribe to this field's error so React re-renders when validation state changes
  void form.formState.errors[field.name];

  const Widget = widgetRegistry.resolve(field);

  if (!Widget) {
    return (
      <div className="rounded border border-dashed border-muted-foreground/30 p-2 text-xs text-muted-foreground">
        No widget registered for type &quot;{field.type}&quot;
      </div>
    );
  }

  return <Widget field={field} form={form} disabled={disabled} />;
}
