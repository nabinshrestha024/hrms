import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateLeaveRequest } from '@erp/data-access';
import { toast } from '@erp/ui';
import { CloudUpload } from 'lucide-react';
import { BalanceDetails } from './balance-details';

const toIso = (v: unknown): string => {
  if (v instanceof Date) return v.toISOString().split('T')[0];
  return String(v ?? '');
};

const daysBetween = (startIso: string, endIso: string): number => {
  const s = new Date(startIso).getTime();
  const e = new Date(endIso).getTime();
  if (isNaN(s) || isNaN(e) || e < s) return 1;
  return Math.floor((e - s) / 86_400_000) + 1;
};

export const addLeaveRequestFormConfig: FormViewConfig = {
  entity: 'leave-request',
  fields: [
    {
      name: 'employeeName',
      type: 'text',
      label: 'Employee Name',
      placeholder: 'Employee Name',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      placeholder: 'YYYY-MM-DD',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      placeholder: 'YYYY-MM-DD',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'leaveType',
      type: 'select',
      label: 'Leave Type',
      isRequired: true,
      options: ['Annual Leave', 'Sick Leave', 'Unpaid'],
      validation: { required: true },
    },
    {
      name: 'durationType',
      type: 'select',
      label: 'Duration Type',
      isRequired: true,
      options: ['Full', 'First Half', 'Second Half'],
      validation: { required: true },
    },
    {
      name: 'substitutionColleague',
      type: 'text',
      label: 'Substitution Colleague',
      placeholder: 'Enter name of colleague',
    },
    {
      name: 'image',
      type: 'file',
      label: 'Attachment (Image/File)',
      icon: CloudUpload,
      subLabel: 'Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)',
    },
    {
      name: 'reasonforLeave',
      type: 'textarea',
      label: 'Reason for Leave',
      placeholder: 'Explain the reason for request',
      isRequired: true,
      subLabel: 'Maximum 100 words',
      validation: {
        required: true,
        max: 100,
      },
    },
  ],

  layout: {
    type: 'section',
    header: <BalanceDetails />,
    children: [
      { type: 'field', name: 'employeeName' },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'startDate' },
          { type: 'field', name: 'endDate' },
        ],
      },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'leaveType' },
          { type: 'field', name: 'durationType' },
        ],
      },

      { type: 'field', name: 'substitutionColleague' },
      { type: 'field', name: 'image' },
      { type: 'field', name: 'reasonforLeave' },
    ],
  },
};
interface AddLeaveRequestFormProps {
  onSuccess?: () => void;
}

export function AddLeaveRequestFormByAdmin({
  onSuccess,
}: AddLeaveRequestFormProps = {}) {
  const createLeaveRequest = useCreateLeaveRequest();

  const onsubmit = (data: Record<string, unknown>) => {
    const fromDate = toIso(data.startDate);
    const toDate = toIso(data.endDate);
    const employeeName = String(data.employeeName ?? '');

    createLeaveRequest.mutate(
      {
        // employeeId derived once Phase 5 wires the employee picker; for
        // now mirror the typed name so the request lands on something.
        employeeId: employeeName,
        employeeName,
        type: String(data.leaveType ?? ''),
        fromDate,
        toDate,
        totalDays: daysBetween(fromDate, toDate),
        reason: String(data.reasonforLeave ?? ''),
        status: 'pending',
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Leave request created' });
          onSuccess?.();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to create leave request',
          });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={addLeaveRequestFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto pr-2"
      isDialogForm={true}
    />
  );
}
