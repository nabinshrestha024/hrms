import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  documentCategoryOptions,
  documetTempelate,
} from '../../schema/assign-document-data';
import {
  uploadDocumentSchema,
  type UploadDocumentFormValue,
} from './UploadDocumentForm.Zod';
import {
  Form,
  HRDateField,
  HRSelect,
  HRTextarea,
  useDialogFormStore,
} from '@erp/ui';
import { FileUpload } from '../../../../components/file-upload';
import { CloudUpload } from 'lucide-react';

export const UploadDocumentForm = () => {
  const form = useForm<UploadDocumentFormValue>({
    resolver: zodResolver(uploadDocumentSchema),
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

  const onsubmit = (data: UploadDocumentFormValue) => {
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
                    Label="Document Name"
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
                    Label="Category"
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
                name="image"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    className="border border-[#E4E4E7] bg-[#F4F4F5] rounded-[2px] py-6 text-center cursor-pointer flex flex-col justify-center items-center gap-2"
                    cardClassName="flex flex-col gap-2 items-center"
                    iconClassName="w-12 h-12 p-1 flex justify-center items-center rounded-[400px] bg-[#C6D2FF]"
                    titleClassName="flex flex-col items-center"
                    icon={CloudUpload}
                    iconClass="text-indigo-600"
                    label="Drag and drop to upload a file"
                    subLable="Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)"
                    buttonClassName="w-30 px-4 py-2 bg-[#4F39F6] rounded-xl text-[14px] font-medium text-white"
                    browseText="Browse Files"
                    drag
                    onChange={(file) => field.onChange(file)}
                  />
                )}
              />
              <HRDateField
                Label="Due Date"
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
