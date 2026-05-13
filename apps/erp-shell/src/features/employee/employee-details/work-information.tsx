import type { Employee } from '@erp/data-access';
import { useState } from 'react';
import { EditableSection } from './editable-section';
import { EmployeeDetailDisplay } from './work-information/employee-detail-display';
import { FinancialDetailDisplay } from './work-information/financial-detail-display';
import { FinancialDetailEditForm } from './work-information/financial-detail-edit-form';
import { EmployeeDetailEditForm } from './work-information/employee-detail-edit-form';

export const WorkInformation = ({ employee }: { employee: Employee }) => {
  const [editEmployee, setEditEmployee] = useState(false);
  const [editFinance, setEditFinance] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="text-[18px] font-medium leading-7 text-foreground">
          Work Information
        </div>
        <EditableSection
          title="Employee Details"
          edit={editEmployee}
          setEdit={setEditEmployee}
          formId="employee-detail-edit-form"
          DisplayComponent={EmployeeDetailDisplay}
          EditComponent={EmployeeDetailEditForm}
          employee={employee}
        />

        <EditableSection
          title="Financial Details"
          edit={editFinance}
          setEdit={setEditFinance}
          formId="financial-data-edit-form"
          DisplayComponent={FinancialDetailDisplay}
          EditComponent={FinancialDetailEditForm}
          employee={employee}
        />
      </div>
    </>
  );
};
