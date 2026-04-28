import type { Employee } from '@erp/data-access';
import { useState } from 'react';
import { EditableSection } from './editable-section';
import { EmergencyDetailDisplay } from './personal-information/emergency-detail-display';
import { EmergencyDetailEditForm } from './personal-information/emergency-detail-edit-form';
import { PersonalDetailDisplay } from './personal-information/personal-detail-display';
import { PersonalDetailEditForm } from './personal-information/personal-detail-edit-form';

export const PersonalInformation = ({ employee }: { employee: Employee }) => {
  const [edit, setEdit] = useState(false);
  const [editEmergency, setEditEmergency] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="text-[18px] font-medium leading-7 text-foreground">
          Personal Information
        </div>
        <EditableSection
          title="Personal Details"
          edit={edit}
          setEdit={setEdit}
          formId="personal"
          DisplayComponent={PersonalDetailDisplay}
          EditComponent={PersonalDetailEditForm}
          employee={employee}
        />

        <EditableSection
          title="Emergency Contact"
          edit={editEmergency}
          setEdit={setEditEmergency}
          formId="emergency"
          DisplayComponent={EmergencyDetailDisplay}
          EditComponent={EmergencyDetailEditForm}
          employee={employee}
        />
      </div>
    </>
  );
};
