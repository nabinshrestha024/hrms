import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateLeaveRequest } from '@erp/data-access';
import { toast } from '@erp/ui';
import { CloudUpload } from 'lucide-react';
import { BalanceDetails } from './balance-details';

// Date in / Date out -> ISO yyyy-mm-dd; tolerates Date | string.
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
  entity: 'add-leave-request',
  fields: [
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
      label: 'Drag and drop to upload a file',
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

export function AddLeaveRequestForm({
  onSuccess,
}: AddLeaveRequestFormProps = {}) {
  const createLeaveRequest = useCreateLeaveRequest();

  const onsubmit = (data: Record<string, unknown>) => {
    const fromDate = toIso(data.startDate);
    const toDate = toIso(data.endDate);

    createLeaveRequest.mutate(
      {
        // Phase 5 (RBAC) will pull employeeId/Name from the auth session.
        employeeId: 'SELF',
        employeeName: 'Self',
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
