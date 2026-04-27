import { Controller, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  personalInformationSchema,
  type PersonalInfromationFormValue,
} from './PersonalInfromationZod';
import { useUpdateEmployee, type Employee } from '@erp/data-access';
import { HRDateField, HRInput, toast } from '@erp/ui';

interface PersonalDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}

export const PersonalDetailEditForm = ({
  employee,
  onSuccess,
}: PersonalDetailEditFormProps) => {
  const updateEmployee = useUpdateEmployee(employee.id);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfromationFormValue>({
    resolver: zodResolver(
      personalInformationSchema
    ) as Resolver<PersonalInfromationFormValue>,
    mode: 'onChange',
    defaultValues: {
      firstName: employee.firstName,
      middleName: employee.middleName ?? '',
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phone ?? '',
      dateOfBirth: employee.dateOfBirth
        ? new Date(employee.dateOfBirth)
        : undefined,
      gender: employee.gender ?? '',
      maritalStatus: employee.maritalStatus ?? '',
      country: employee.country ?? '',
      province: employee.province ?? '',
      city: employee.city ?? '',
      municipality: employee.municipality ?? '',
      ward: employee.ward ?? '',
    },
  });
  const onsubmit = (data: PersonalInfromationFormValue) => {
    updateEmployee.mutate(
      {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phoneNumber,
        dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        country: data.country,
        province: data.province,
        city: data.city,
        municipality: data.municipality,
        ward: data.ward,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Personal details updated' });
          onSuccess();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to update details' });
        },
      }
    );
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(onsubmit)} id="personal">
          <div className="grid grid-cols-5 gap-4">
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
        </form>
      </div>
    </>
  );
};
