import { AddressInformationForm } from '../../../features/employee/EmployeeForm/BasicDetails/AddressInformationForm';
import { EmergencyForm } from '../../../features/employee/EmployeeForm/BasicDetails/EmergencyContactForm';
import { PersonalInformationForm } from '../../../features/employee/EmployeeForm/BasicDetails/PersonalInformationForm';

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
