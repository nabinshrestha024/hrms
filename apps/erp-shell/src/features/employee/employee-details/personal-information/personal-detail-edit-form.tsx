import { Controller, useFormContext } from 'react-hook-form';
import { HRDateField, HRInput } from '@erp/ui';
import { PersonalInformationOutput } from './PersonalInformationZod';

export const PersonalDetailEditForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PersonalInformationOutput>();

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
          <HRInput
            Label="First Name"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.firstName?.message as string}
            {...register('firstName')}
          />
          <HRInput
            Label="Middle Name"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.middleName?.message as string}
            {...register('middleName')}
          />
          <HRInput
            Label="Last Name"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.lastName?.message as string}
            {...register('lastName')}
          />
          <HRInput
            Label="Personal Email"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.email?.message as string}
            {...register('email')}
          />
          <HRInput
            Label="Contact"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.phoneNumber?.message as string}
            {...register('phoneNumber')}
          />
          <HRInput
            Label="Country"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.country?.message as string}
            {...register('country')}
          />
          <HRInput
            Label="Province"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.province?.message as string}
            {...register('province')}
          />
          <HRInput
            Label="City"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.city?.message as string}
            {...register('city')}
          />
          <HRInput
            Label="Municipality/VDC"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.municipality?.message as string}
            {...register('municipality')}
          />
          <HRInput
            Label="Ward"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.ward?.message as string}
            {...register('ward')}
          />
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <HRDateField
                Label="Date of Birth"
                labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
                error={errors.dateOfBirth?.message as string}
                date={field.value}
                onDateChange={field.onChange}
              />
            )}
          />
          <HRInput
            Label="Gender"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.gender?.message as string}
            {...register('gender')}
          />
          <HRInput
            Label="Marital Status"
            labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
            type="text"
            error={errors.maritalStatus?.message as string}
            {...register('maritalStatus')}
          />
        </div>
      </div>
    </>
  );
};
