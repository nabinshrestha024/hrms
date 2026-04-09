import { useState } from 'react';
import { EditableSection } from './editable-section';
import { EmployeeDetailDisplay } from './work-information/employee-detail-display';
import { EmployeeDetailEditForm } from './work-information/employee-detail-edit-form';
import { FinancialDetailDisplay } from './work-information/financial-detail-display';
import { FinancialDetailEditForm } from './work-information/financial-detail-edit-form';

export const WorkInformation = ({ employeeId }: { employeeId: string }) => {
  const [editEmployee, setEditEmployee] = useState(false);
  const [editFinance, setEditFinance] = useState(false);

  // const { data: employee } = useGetEmployeeById(employeeId)
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="text-[18px] font-medium leading-7 text-[#09090B]">
          Work Information
        </div>
        <EditableSection
          title="Personal Details"
          edit={editEmployee}
          setEdit={setEditEmployee}
          formId="employee"
          DisplayComponent={EmployeeDetailDisplay}
          EditComponent={EmployeeDetailEditForm}
          employeeId={employeeId}
        />

        <EditableSection
          title="Financial Details"
          edit={editFinance}
          setEdit={setEditFinance}
          formId="finance"
          DisplayComponent={FinancialDetailDisplay}
          EditComponent={FinancialDetailEditForm}
          employeeId={employeeId}
        />
      </div>
    </>
  );
};
