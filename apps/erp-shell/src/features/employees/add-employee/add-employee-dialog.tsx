import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MultiStepForm, type StepConfig, toast } from '@erp/ui';
import { useCreateEmployee } from '@erp/data-access';
import { addEmployeeSchema, stepFields, type AddEmployeeInput } from './schema';
import { BasicDetailsStep } from './step-basic-details';
import { WorkInformationStep } from './step-work-info';
import { FinancialInfoStep } from './step-financial';

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEmployeeDialog({
  open,
  onOpenChange,
}: AddEmployeeDialogProps) {
  const createMutation = useCreateEmployee();

  const form = useForm<AddEmployeeInput>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: { gender: 'Female', maritalStatus: 'Single' },
    mode: 'onTouched',
  });

  const steps: StepConfig[] = [
    { label: 'Basic Details', content: <BasicDetailsStep form={form} /> },
    { label: 'Work Information', content: <WorkInformationStep form={form} /> },
    {
      label: 'Financial Information',
      content: <FinancialInfoStep form={form} />,
    },
  ];

  const handleValidateStep = async (stepIndex: number): Promise<boolean> => {
    return form.trigger(stepFields[stepIndex]);
  };

  const handleSubmit = () => {
    const data = form.getValues();

    createMutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.workEmail || data.personalEmail,
        phone: data.phone,
        department: data.department,
        designation: data.designation,
        status: 'active' as const,
        salary: Number(data.grossSalary) || 0,
        startDate: data.joiningDate,
        managerId: data.reportingManager || null,
        avatar: null,
      },
      {
        onSuccess: () => {
          toast({ title: 'Employee created successfully', variant: 'success' });
          form.reset();
          onOpenChange(false);
        },
        onError: (err: Error) => {
          toast({
            title: 'Failed to create employee',
            description: err.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <MultiStepForm
      open={open}
      onOpenChange={onOpenChange}
      title="Employee Information"
      steps={steps}
      onSubmit={handleSubmit}
      onValidateStep={handleValidateStep}
      onReset={() => form.reset()}
      isSubmitting={createMutation.isPending}
      submitLabel="Add"
      size="lg"
    />
  );
}
