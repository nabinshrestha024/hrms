import { HRInput } from '@erp/ui';
import { useFormContext } from 'react-hook-form';

export const ContactInformationForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[16px] font-semibold leading-6">
        CONTACT INFORMATION
      </div>

      <div className="grid grid-cols-2 gap-4">
        <HRInput
          Label="Work Phone Number"
          type="text"
          placeholder="XXX-XXXXXXX"
          error={errors.workPhoneNumber?.message as string}
          {...register('workPhoneNumber')}
        />

        <HRInput
          Label="Work Email"
          type="email"
          isRequired
          placeholder="Work Email"
          error={errors.workEmail?.message as string}
          {...register('workEmail')}
        />
      </div>
    </div>
  );
};
