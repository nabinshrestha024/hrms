import { ContactInformationForm } from './WorkDetails/ContactInformation';
import { EmployeeDateForm } from './WorkDetails/EmployeeDateForm';
import { WorkOrganizationForm } from './WorkDetails/WorkOrganizationForm';
import { WorkScheduleTypeForm } from './WorkDetails/WorkScheduleForm';

export const WorkInformationForm = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <WorkOrganizationForm />
        <WorkScheduleTypeForm />
        <ContactInformationForm />
        <EmployeeDateForm />
      </div>
    </>
  );
};
