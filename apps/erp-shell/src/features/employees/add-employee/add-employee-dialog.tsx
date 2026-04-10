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
        // Identity
        employeeId: data.employeeId,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.workEmail || data.personalEmail,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        avatar: null,

        // Address
        country: data.country,
        province: data.province,
        city: data.city,
        municipality: data.municipality,
        ward: data.ward,
        address: data.address,

        // Emergency contact
        emergencyContact: data.emergencyContact,
        emergencyContactName: data.emergencyContactName,
        emergencyContactRelation: data.emergencyContactRelation,

        // Work information
        branch: data.branch,
        department: data.department,
        designation: data.designation,
        jobLevel: data.jobLevel,
        shift: data.shift,
        workType: data.workType,
        employeeType: data.employeeType,
        workPhone: data.workPhone,
        workEmail: data.workEmail,
        managerId: data.reportingManager || null,
        startDate: data.joiningDate,
        contractStartDate: data.contractStartDate,
        contractEndDate: data.contractEndDate,

        // Compensation
        status: 'active' as const,
        salary: Number(data.grossSalary) || 0,
        basicSalary: Number(data.basicSalary) || 0,
        bankName: data.bankName,
        bankAccountNumber: data.bankAccountNumber,
        bankAccountName: data.bankAccountName,
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
