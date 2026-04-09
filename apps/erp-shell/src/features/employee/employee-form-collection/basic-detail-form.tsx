import { AddressInformationForm } from './basic-details/address-information-form';
import { EmergencyForm } from './basic-details/emergency-contact-form';
import { PersonalInformationForm } from './basic-details/personal-information-form';

export const BasicDetailForm = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <PersonalInformationForm />
        <AddressInformationForm />
        <EmergencyForm />
      </div>
    </>
  );
};
