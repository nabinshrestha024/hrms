import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { Employee, useUpdateEmployee } from '@erp/data-access';
const toIso = (d: Date | string | undefined): string | undefined => {
  if (!d) return undefined;

  return d instanceof Date ? d.toISOString().split('T')[0] : String(d);
};
export const employeeDetailFormConfig: FormViewConfig = {
  entity: 'employee-detail-edit',

  fields: [
    {
      name: 'employeeId',
      type: 'text',
      label: 'Employee ID',
      validation: { required: true },
    },
    {
      name: 'branch',
      type: 'text',
      label: 'Branch',
      validation: { required: true },
    },
    {
      name: 'department',
      type: 'text',
      label: 'Department',
      validation: { required: true },
    },
    {
      name: 'jobLevel',
      type: 'text',
      label: 'Job Level',
      validation: { required: true },
    },
    {
      name: 'designation',
      type: 'text',
      label: 'Designation',
      validation: { required: true },
    },
    {
      name: 'reportingManager',
      type: 'text',
      label: 'Manager',
      validation: { required: true },
    },
    {
      name: 'shift',
      type: 'text',
      label: 'Shift',
      validation: { required: true },
    },
    {
      name: 'workType',
      type: 'text',
      label: 'Work Type',
      validation: { required: true },
    },
    {
      name: 'employeeType',
      type: 'text',
      label: 'Employee Type',
      validation: { required: true },
    },
    {
      name: 'workEmail',
      type: 'text',
      label: 'Work Email',
      validation: { required: true },
    },
    {
      name: 'workPhoneNumber',
      type: 'text',
      label: 'Work Phone',
      validation: { required: true },
    },
    {
      name: 'joiningDate',
      type: 'date',
      label: 'Joining Date',
      validation: { required: true },
    },
    {
      name: 'contractStartDate',
      type: 'date',
      label: 'Contract Start Date',
      validation: { required: true },
    },
    {
      name: 'contractEndDate',
      type: 'date',
      label: 'Contract End Date',
      validation: { required: true },
    },
  ],

  layout: {
    type: 'section',

    children: [
      {
        type: 'columns',
        classname:
          'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4',

        children: [
          { type: 'field', name: 'employeeId' },
          { type: 'field', name: 'branch' },
          { type: 'field', name: 'department' },
          { type: 'field', name: 'jobLevel' },
          { type: 'field', name: 'designation' },
          { type: 'field', name: 'reportingManager' },
          { type: 'field', name: 'shift' },
          { type: 'field', name: 'workType' },
          { type: 'field', name: 'employeeType' },
          { type: 'field', name: 'workEmail' },
          { type: 'field', name: 'workPhoneNumber' },
          { type: 'field', name: 'joiningDate' },
          { type: 'field', name: 'contractStartDate' },
          { type: 'field', name: 'contractEndDate' },
        ],
      },
    ],
  },
};

interface EmployeeDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}

export function EmployeeDetailEditForm({
  employee,
  onSuccess,
}: EmployeeDetailEditFormProps) {
  const updateEmployee = useUpdateEmployee(employee.id);

  const onSubmit = (data: Record<string, unknown>) => {
    updateEmployee.mutate(
      {
        employeeId: String(data.employeeId),
        branch: String(data.branch),
        department: String(data.department),
        jobLevel: String(data.jobLevel),
        designation: String(data.designation),
        managerId: String(data.reportingManager),
        shift: String(data.shift),
        workType: String(data.workType),
        employeeType: String(data.employeeType),
        workEmail: String(data.workEmail),
        workPhone: String(data.workPhoneNumber),
        startDate: toIso(data.joiningDate as Date | string | undefined),
        contractStartDate: toIso(
          data.contractStartDate as Date | string | undefined
        ),
        contractEndDate: toIso(
          data.contractEndDate as Date | string | undefined
        ),
      },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Work details updated',
          });

          onSuccess();
        },

        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to update work details',
          });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={employeeDetailFormConfig}
      onSubmit={onSubmit}
      submitLabel="Save Details"
      isDialogForm={false}
      defaultValues={{
        employeeId: employee.employeeId,
        branch: employee.branch ?? '',
        department: employee.department ?? '',
        jobLevel: employee.jobLevel ?? '',
        designation: employee.designation ?? '',
        reportingManager: employee.managerId ?? '',
        shift: employee.shift ?? '',
        workType: employee.workType ?? '',
        employeeType: employee.employeeType ?? '',
        workEmail: employee.workEmail ?? '',
        workPhoneNumber: employee.workPhone ?? '',
        joiningDate: employee.startDate
          ? new Date(employee.startDate)
          : undefined,
        contractStartDate: employee.contractStartDate
          ? new Date(employee.contractStartDate)
          : undefined,
        contractEndDate: employee.contractEndDate
          ? new Date(employee.contractEndDate)
          : undefined,
      }}
    />
  );
}
