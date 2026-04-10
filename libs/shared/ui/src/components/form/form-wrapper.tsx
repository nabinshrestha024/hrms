import { FormProvider } from 'react-hook-form';
import { type ComponentProps } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
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

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        data-test={props.id}
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
