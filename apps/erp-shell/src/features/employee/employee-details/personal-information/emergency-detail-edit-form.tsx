import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emergencySchema, type EmergencyFormValue } from './EmergencyDetailZod';
import { useUpdateEmployee, type Employee } from '@erp/data-access';
import { HRInput, toast } from '@erp/ui';

interface EmergencyDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}

export const EmergencyDetailEditForm = ({
  employee,
  onSuccess,
}: EmergencyDetailEditFormProps) => {
  const updateEmployee = useUpdateEmployee(employee.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmergencyFormValue>({
    resolver: zodResolver(emergencySchema) as Resolver<EmergencyFormValue>,
    mode: 'onChange',
    defaultValues: {
      emergencyContact: employee.emergencyContact ?? '',
      emergencyContactName: employee.emergencyContactName ?? '',
      emergencyContactRelation: employee.emergencyContactRelation ?? '',
    },
  });
  const onsubmit = (data: EmergencyFormValue) => {
    updateEmployee.mutate(
      {
        emergencyContact: data.emergencyContact,
        emergencyContactName: data.emergencyContactName,
        emergencyContactRelation: data.emergencyContactRelation,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Emergency details updated' });
          onSuccess();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to update emergency details',
          });
        },
      }
    );
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(onsubmit)} id="emergency">
          <div className="grid grid-cols-5 gap-4">
            <HRInput
              Label="Emergency Contact"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.emergencyContact?.message as string}
              {...register('emergencyContact')}
            />
            <HRInput
              Label="Emergency Contact Name"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.emergencyContactName?.message as string}
              {...register('emergencyContactName')}
            />
            <HRInput
              Label="Emergency Contact Relation"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.emergencyContactRelation?.message as string}
              {...register('emergencyContactRelation')}
            />
          </div>
        </form>
      </div>
    </>
  );
};
