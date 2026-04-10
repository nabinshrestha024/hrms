import { HRDateField, HRInput, OptionRadioGroup } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { genderList, marriageList } from '../../schema/employee-schema';
import { FileUpload } from '../../../../components/file-upload';

export const PersonalInformationForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="text-[16px] font-semibold leading-6 ">
            PERSONAL INFORMATION
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span>Profile Picture</span>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    className="w-41 h-41 border border-background-foreground bg-background-foreground rounded-[400px] flex flex-col justify-center items-center"
                    label="Drag and drop"
                    subLable=""
                    buttonClassName="text-black"
                    browseText="Add Image"
                    previewClassName="rounded-full"
                    drag
                    onChange={(file) => field.onChange(file)}
                  />
                )}
              />
              <span>Accepts JPG, PNG, JPEG under 5MB.</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <HRInput
                Label="First Name"
                isRequired={true}
                type="text"
                placeholder="First Name"
                error={errors.firstName?.message as string}
                {...register('firstName')}
              />
              <HRInput
                Label="Middle Name"
                isRequired={true}
                type="text"
                placeholder="Middle Name"
                error={errors.middleName?.message as string}
                {...register('middleName')}
              />
              <HRInput
                Label="Last Name"
                isRequired={true}
                type="text"
                placeholder="Last Name"
                error={errors.lastName?.message as string}
                {...register('lastName')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <HRInput
                Label="Personal Email"
                isRequired={true}
                type="text"
                placeholder="Personal Email"
                error={errors.email?.message as string}
                {...register('email')}
              />
              <HRInput
                Label="Phone Number"
                isRequired={true}
                type="text"
                placeholder="XXX-XXXXXXX"
                error={errors.phoneNumber?.message as string}
                {...register('phoneNumber')}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <HRDateField
                    Label="Date of Birth"
                    isRequired={true}
                    error={errors.dateOfBirth?.message as string}
                    date={field.value}
                    onDateChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <OptionRadioGroup
                    isRequired={true}
                    Label="Gender"
                    options={genderList}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-3"
                    itemClassName="border-[#A1A1AA]"
                    error={errors.gender?.message as string}
                  />
                )}
              />
              <Controller
                control={control}
                name="maritalStatus"
                render={({ field }) => (
                  <OptionRadioGroup
                    isRequired={true}
                    Label="Marital Status"
                    options={marriageList}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-3"
                    itemClassName="border-[#A1A1AA]"
                    error={errors.maritalStatus?.message as string}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
