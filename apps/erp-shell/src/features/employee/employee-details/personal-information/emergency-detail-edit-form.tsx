import { useFormContext } from 'react-hook-form';
import { HRInput } from '@erp/ui';
import { PersonalInformationOutput } from './PersonalInformationZod';

export const EmergencyDetailEditForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PersonalInformationOutput>();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-[16px] font-medium leading-6 text-foreground">
          Emergency Contact
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
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
      </div>
    </>
  );
};
