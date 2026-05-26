import {
  Form,
  HRCard,
  HRInput,
  HRLabel,
  RichEditor,
  useDialogClose,
} from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from '@erp/ui';
import {
  CreateTemplateFormValue,
  createTemplateSchema,
} from './zod/CreateDocumentForm.zod';

export const CreateTemplateForm = () => {
  const form = useForm<CreateTemplateFormValue>({
    resolver: zodResolver(createTemplateSchema),
    mode: 'onChange',
  });
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const close = useDialogClose();

  const onsubmit = (data: CreateTemplateFormValue) => {
    console.warn('Template Data:', data);
    toast({ title: 'Template Created Successfully.', variant: 'success' });
    close();
  };

  return (
    <Form form={form} onSubmit={onsubmit}>
      <HRCard
        cardClassName="max-h-[600px] overflow-auto p-0 border-none rounded-none shadow-none"
        cardContentClassName="p-0 flex flex-col gap-5"
      >
        <div className="text-[16px] font-medium leading-6 text-foreground ">
          Create Internal Policy
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HRInput
            Label="Document Title"
            isRequired
            type="text"
            placeholder="e.g., Remote Work Policy"
            error={errors.documentTitle?.message as string}
            {...register('documentTitle')}
          />

          <HRInput
            Label="Category"
            isRequired
            type="text"
            placeholder="Others"
            error={errors.category?.message as string}
            {...register('category')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <HRLabel>Document Body (HTML)</HRLabel>
          <Controller
            name="documentBody"
            control={control}
            render={({ field }) => (
              <RichEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </HRCard>
    </Form>
  );
};
