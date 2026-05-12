import { HRCard, toast } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  PersonalInformationInput,
  PersonalInformationOutput,
  personalInformationSchema,
} from './PersonalInformationZod';
import { PersonalDetailEditForm } from './personal-detail-edit-form';
import { Employee, useUpdateEmployee } from '@erp/data-access';
import { EmergencyDetailEditForm } from './emergency-detail-edit-form';
interface PersonalDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}
export const CombinedForm = ({
  employee,
  onSuccess,
}: PersonalDetailEditFormProps) => {
  const updateEmployee = useUpdateEmployee(employee.id);

  const form = useForm<
    PersonalInformationInput,
    unknown,
    PersonalInformationOutput
  >({
    resolver: zodResolver(personalInformationSchema),
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
      emergencyContact: employee.emergencyContact ?? '',
      emergencyContactName: employee.emergencyContactName ?? '',
      emergencyContactRelation: employee.emergencyContactRelation ?? '',
    },
  });

  const onsubmit = (data: PersonalInformationOutput) => {
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
        emergencyContact: data.emergencyContact,
        emergencyContactName: data.emergencyContactName,
        emergencyContactRelation: data.emergencyContactRelation,
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
    <FormProvider {...form}>
      <form id="personal-form" onSubmit={form.handleSubmit(onsubmit)}>
        <HRCard
          cardClassName="p-0 border-none rounded-none shadow-none"
          cardContentClassName="p-0 flex flex-col gap-8"
        >
          <PersonalDetailEditForm />
          <EmergencyDetailEditForm />
        </HRCard>
      </form>
    </FormProvider>
  );
};
