import { ContactInformationForm } from './work-details/contact-information-form';
import { EmployeeDateForm } from './work-details/employee-date-form';
import { WorkOrganizationForm } from './work-details/work-organization-form';
import { WorkScheduleTypeForm } from './work-details/work-schedule-form';

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
