import { FormProvider } from 'react-hook-form';
import { type ComponentProps } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { cn } from '@erp/utils';
import { useFormId } from '../dialog/form-id-context';

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  fieldsetClassName?: string;
}

/**
 * Wraps `<form>` with react-hook-form's `FormProvider` and a disabled
 * `<fieldset>` while submitting.
 *
 * If rendered inside a `<FormDialog>` or `<ControlledFormDialog>`, the form
 * id is automatically picked up from `FormIdContext` — no need to pass an
 * `id` prop. The dialog's submit button (which uses `form="<id>"`) will
 * automatically wire to this form.
 *
 * For standalone forms (rendered on a page, not in a dialog), pass `id`
 * explicitly.
 */
const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  fieldsetClassName,
  ...props
}: Props<T>) => {
  const { formState } = form;
  const isSubmitting = formState.isSubmitting;

  // Pick up form id from the enclosing dialog if no explicit id was passed.
  const dialogFormId = useFormId();
  const resolvedId = props.id ?? dialogFormId;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        id={resolvedId}
        data-test={resolvedId}
        className={cn(className, 'w-full')}
      >
        <fieldset disabled={isSubmitting} className={fieldsetClassName}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};

export { Form };
