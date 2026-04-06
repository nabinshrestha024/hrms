import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  CreateAnnouncementFormValue,
  createAnnouncementSchema,
} from '../../../features/dashboard/CreateAnnouncement/CreateAnnouncementForm.Zod';
import {
  Form,
  HRInput,
  HRSelect,
  HRTextarea,
  toast,
  useDialogFormStore,
} from '@erp/ui';
import { FileUpload } from '../../../components/FileUpload';
import { UploadIcon } from 'lucide-react';

export const CreateAnnouncementForm = () => {
  const form = useForm<CreateAnnouncementFormValue>({
    resolver: zodResolver(createAnnouncementSchema),
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

  const onsubmit = (data: CreateAnnouncementFormValue) => {
    console.log('Save Changes: ', data);
    closeDialog();
    toast({ title: 'Notice is created.', variant: 'success' });
  };

  const branchOptions = [
    { id: 0, content: 'Baneshwor', value: 'Baneshwor' },
    { id: 1, content: 'Chabhail', value: 'Chabhail' },
    { id: 2, content: 'Koteshwor', value: 'Koteshwor' },
    { id: 3, content: 'Thamel', value: 'Thamel' },
    { id: 4, content: 'Kalanki', value: 'Kalanki' },
  ];

  const departmentOptions = [
    { id: 0, content: 'HR', value: 'HR' },
    { id: 1, content: 'UI/UX Designer', value: 'UI/UX Designer' },
    { id: 2, content: 'Frontend', value: 'Frontend' },
    { id: 3, content: 'Backend', value: 'Backend' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const words = newText.trim().split(/\s+/);

    if (words.length <= 200) {
      setText(newText);
      setValue('shortDescription', newText);
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Form form={form} onSubmit={onsubmit}>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <HRInput
              Label="Announcement Title"
              isRequired={true}
              type="text"
              placeholder="Holiday"
              inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
              error={errors.announcementTitle?.message}
              {...register('announcementTitle')}
            />

            <Controller
              name="branch"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Branch"
                  isRequired={true}
                  triggerClassName="w-full px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
                  selectData={branchOptions}
                  placeholder="Branch"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.branch?.message}
                  disabled={false}
                />
              )}
            />

            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Department"
                  isRequired={true}
                  triggerClassName="w-full px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
                  selectData={departmentOptions}
                  placeholder="Department"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.department?.message}
                  disabled={false}
                />
              )}
            />

            <HRTextarea
              Label="Short Description"
              isRequired={true}
              placeholder="Type here"
              subLabel="Less than 200 words"
              textAreaClassName="px-3 py-[10px] rounded-[6px] border  border-[#E4E4E7]"
              value={text}
              onChange={handleChange}
              error={errors.shortDescription?.message}
            />
          </div>

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileUpload
                className="border border-dashed rounded-[2px] py-6 text-center cursor-pointer flex flex-col justify-center items-center gap-2"
                cardClassName="flex flex-col gap-2 items-center"
                titleClassName="flex flex-col items-center"
                icon={UploadIcon}
                label="Drag and drop to upload a file"
                subLable="Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)"
                buttonClassName="w-30 px-4 py-2 bg-[#4F39F6] rounded-xl text-[14px] font-medium text-white"
                browseText="Browse Files"
                drag
                onChange={(file) => field.onChange(file)}
              />
            )}
          />
        </div>
      </Form>
    </div>
  );
};
