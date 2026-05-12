import type { Employee } from '@erp/data-access';
import { useState } from 'react';
import { EditableSection } from './editable-section';
import { CombinedForm } from './personal-information/combined-form';
import { CombinedDisplay } from './personal-information/combined-display';

export const PersonalInformation = ({ employee }: { employee: Employee }) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-1.5 lg:pr-3">
        <div className="text-[18px] font-medium leading-7 text-foreground">
          Personal Information
        </div>
        <EditableSection
          title="Personal Details"
          edit={edit}
          setEdit={setEdit}
          formId="personal-form"
          DisplayComponent={CombinedDisplay}
          EditComponent={CombinedForm}
          employee={employee}
        />
      </div>
    </>
  );
};
