import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormViewConfig } from '../types';
import { WidgetRegistry } from '../registry/widget-registry';
import { registerDefaultWidgets } from '../widgets/register-defaults';
import { buildZodSchema } from '../schema/build-zod-schema';
import { LayoutRenderer } from './layout-renderer';
import { Button } from '@erp/ui';

interface FormRendererProps {
  config: FormViewConfig;
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
  disabled?: boolean;
  widgetRegistry?: WidgetRegistry;
  submitLabel?: string;
}

export function FormRenderer({
  config,
  onSubmit,
  defaultValues,
  disabled,
  widgetRegistry: externalRegistry,
  submitLabel = 'Submit',
}: FormRendererProps) {
  const registry = useMemo(() => {
    const reg = externalRegistry ?? new WidgetRegistry();
    if (!externalRegistry) {
      registerDefaultWidgets(reg);
    }
    return reg;
  }, [externalRegistry]);

  const schema = useMemo(() => buildZodSchema(config.fields), [config.fields]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as Record<string, unknown>,
    mode: 'onTouched',
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <LayoutRenderer
        node={config.layout}
        fields={config.fields}
        form={form}
        widgetRegistry={registry}
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled || form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Submitting...' : submitLabel}
      </Button>
    </form>
  );
}
