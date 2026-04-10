import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  documentCategoryOptions,
  documetTempelate,
  statusOption,
} from '../../schema/assign-document-data';
import {
  assignDocumentSchema,
  type AssignDocumentFormValue,
} from './AssignDocumentForm.Zod';
import {
  Form,
  HRDateField,
  HRSelect,
  HRTextarea,
  useDialogFormStore,
} from '@erp/ui';

export const AssignDocumentForm = () => {
  const form = useForm<AssignDocumentFormValue>({
    resolver: zodResolver(assignDocumentSchema),
    mode: 'onChange',
  });
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

  const [text, setText] = useState('');
  const closeDialog = useDialogFormStore((state) => state.onClose);

  const onsubmit = (data: AssignDocumentFormValue) => {
    console.warn('Save Changes: ', data);
    closeDialog();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const words = newText.trim().split(/\s+/);

    if (words.length <= 200) {
      setText(newText);
      setValue('note', newText);
    }
  };

  return (
    <>
      <div className="relative w-full flex flex-col gap-4">
        <Form form={form} onSubmit={onsubmit}>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-4">
              <Controller
                name="documentTemplate"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Select Document Template"
                    isRequired={true}
                    triggerClassName="w-full px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
                    selectData={documetTempelate}
                    placeholder="Document Template"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.documentTemplate?.message}
                    disabled={false}
                  />
                )}
              />

              <Controller
                name="documentCategory"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Documnet Category"
                    isRequired={true}
                    triggerClassName="w-full px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
                    selectData={documentCategoryOptions}
                    placeholder="Select"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.documentCategory?.message}
                    disabled={false}
                  />
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Status"
                    isRequired={true}
                    triggerClassName="w-full px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
                    selectData={statusOption}
                    placeholder="Select"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.status?.message}
                    disabled={false}
                  />
                )}
              />
              <HRDateField
                Label="Expiry Date"
                placeholder="YYYY-MM-DD"
                className=" py-5 rounded-[6px] border border-[#E4E4E7] bg-white"
                error={errors.date?.message as string}
                {...register('date')}
              />

              <HRTextarea
                Label="Note for Employee"
                placeholder="Type here"
                subLabel="Less than 200 words"
                textAreaClassName="px-3 py-[10px] rounded-[6px] border  border-[#E4E4E7]"
                value={text}
                onChange={handleChange}
                error={errors.note?.message}
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
