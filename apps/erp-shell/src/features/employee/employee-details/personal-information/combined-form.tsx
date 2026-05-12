import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { Employee, useUpdateEmployee } from '@erp/data-access';
const toIso = (d: Date | string | undefined): string | undefined => {
  if (!d) return undefined;

  return d instanceof Date ? d.toISOString().split('T')[0] : String(d);
};
export const personalDetailFormConfig: FormViewConfig = {
  entity: 'personal',
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'middleName',
      type: 'text',
      label: 'Middle Name',
      validation: { required: true },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Personal Email',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Contact',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      validation: { required: true },
    },
    {
      name: 'province',
      type: 'text',
      label: 'Province',
      validation: { required: true },
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      validation: { required: true },
    },
    {
      name: 'municipality',
      type: 'text',
      label: 'Municipality/VDC',
      validation: { required: true },
    },
    {
      name: 'ward',
      type: 'text',
      label: 'Ward',
      validation: { required: true },
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      label: 'Date of Birth',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'gender',
      type: 'text',
      label: 'Gender',
      validation: { required: true },
    },
    {
      name: 'maritalStatus',
      type: 'text',
      label: 'Marital Status',
      validation: { required: true },
    },
    {
      name: 'emergencyContact',
      type: 'text',
      label: 'Emergency Contact',
      validation: { required: true },
    },
    {
      name: 'emergencyContactName',
      type: 'text',
      label: 'Emergency Contact Name',
      validation: { required: true },
    },
    {
      name: 'emergencyContactRelation',
      type: 'text',
      label: 'Emergency Contact Relation',
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
          { type: 'field', name: 'firstName' },
          { type: 'field', name: 'middleName' },
          { type: 'field', name: 'lastName' },
          { type: 'field', name: 'email' },
          { type: 'field', name: 'phoneNumber' },
          { type: 'field', name: 'country' },
          { type: 'field', name: 'province' },
          { type: 'field', name: 'city' },
          { type: 'field', name: 'municipality' },
          { type: 'field', name: 'ward' },
          { type: 'field', name: 'dateOfBirth' },
          { type: 'field', name: 'gender' },
          { type: 'field', name: 'maritalStatus' },
        ],
      },
      {
        title: 'Emergency Contact',
        type: 'columns',
        classname:
          'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4',
        children: [
          { type: 'field', name: 'emergencyContact' },
          { type: 'field', name: 'emergencyContactName' },
          { type: 'field', name: 'emergencyContactRelation' },
        ],
      },
    ],
  },
};
interface PersonalDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}
export function CombinedForm({
  employee,
  onSuccess,
}: PersonalDetailEditFormProps) {
  const updateEmployee = useUpdateEmployee(employee.id);
  const onSubmit = (data: Record<string, unknown>) => {
    updateEmployee.mutate(
      {
        firstName: String(data.firstName ?? ''),
        middleName: String(data.middleName ?? ''),
        lastName: String(data.lastName ?? ''),
        email: String(data.email ?? ''),
        phone: String(data.phoneNumber ?? ''),
        dateOfBirth: toIso(data.dateOfBirth as Date | string | undefined),
        gender: String(data.gender ?? ''),
        maritalStatus: String(data.maritalStatus ?? ''),
        country: String(data.country ?? ''),
        province: String(data.province ?? ''),
        city: String(data.city ?? ''),
        municipality: String(data.municipality ?? ''),
        ward: String(data.ward ?? ''),
        emergencyContact: String(data.emergencyContact ?? ''),
        emergencyContactName: String(data.emergencyContactName ?? ''),
        emergencyContactRelation: String(data.emergencyContactRelation ?? ''),
      },

      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Personal details updated' });
          onSuccess();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to update details' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={personalDetailFormConfig}
      onSubmit={onSubmit}
      submitLabel="Save Details"
      isDialogForm={false}
      defaultValues={{
        firstName: employee.firstName,
        middleName: employee.middleName ?? '',
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phone ?? '',
        dateOfBirth: employee.dateOfBirth
          ? new Date(employee.dateOfBirth)
          : undefined,
        gender: employee.gender ?? '',
        maritalStatus: employee.maritalStatus ?? '',
        country: employee.country ?? '',
        province: employee.province ?? '',
        city: employee.city ?? '',
        municipality: employee.municipality ?? '',
        ward: employee.ward ?? '',
        emergencyContact: employee.emergencyContact ?? '',
        emergencyContactName: employee.emergencyContactName ?? '',
        emergencyContactRelation: employee.emergencyContactRelation ?? '',
      }}
    />
  );
}
