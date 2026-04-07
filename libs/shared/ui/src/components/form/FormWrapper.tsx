import { FormProvider } from 'react-hook-form';

import { useEffect, type ComponentProps } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { useDialogFormStore } from '../dialog/form-store';
import { cn } from '@erp/utils';

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  fieldsetClassName?: string;
}

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

  const formId = useDialogFormStore((state) => state.formId);

  const setFormState = useDialogFormStore((state) => state.setFormState);

  useEffect(() => {
    if (formState && formId) {
      setFormState(formState);
    }
  }, [formState, setFormState, formId]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={formId}
        {...props}
        data-test={formId}
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
