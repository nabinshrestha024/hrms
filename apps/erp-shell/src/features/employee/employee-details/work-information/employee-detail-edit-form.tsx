import { Controller, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  employeeDetailsSchema,
  type EmployeeDetailsFormValue,
} from './EmployeeDetailsZod';
import { useUpdateEmployee, type Employee } from '@erp/data-access';
import { HRDateField, HRInput, toast } from '@erp/ui';

const toIso = (d: Date | string | undefined): string | undefined => {
  if (!d) return undefined;
  return d instanceof Date ? d.toISOString().split('T')[0] : String(d);
};

interface EmployeeDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}

export const EmployeeDetailEditForm = ({
  employee,
  onSuccess,
}: EmployeeDetailEditFormProps) => {
  const updateEmployee = useUpdateEmployee(employee.id);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeDetailsFormValue>({
    resolver: zodResolver(
      employeeDetailsSchema
    ) as Resolver<EmployeeDetailsFormValue>,
    mode: 'onChange',
    defaultValues: {
      // Form schema coerces employeeId to a number; keep that for now —
      // schema cleanup belongs in a separate change.
      employeeId: Number(employee.employeeId) || 0,
      branch: employee.branch ?? '',
      department: employee.department,
      jobLevel: employee.jobLevel ?? '',
      designation: employee.designation,
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
    },
  });
  const onsubmit = (data: EmployeeDetailsFormValue) => {
    updateEmployee.mutate(
      {
        employeeId: String(data.employeeId),
        branch: data.branch,
        department: data.department,
        jobLevel: data.jobLevel,
        designation: data.designation,
        managerId: data.reportingManager,
        shift: data.shift,
        workType: data.workType,
        employeeType: data.employeeType,
        workEmail: data.workEmail,
        workPhone: data.workPhoneNumber,
        startDate: toIso(data.joiningDate),
        contractStartDate: toIso(data.contractStartDate),
        contractEndDate: toIso(data.contractEndDate),
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Work details updated' });
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
    <>
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(onsubmit)} id="employee">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
            <HRInput
              Label="Employee ID"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.employeeId?.message as string}
              {...register('employeeId')}
            />
            <HRInput
              Label="Branch"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.branch?.message as string}
              {...register('branch')}
            />
            <HRInput
              Label="Department"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.department?.message as string}
              {...register('department')}
            />

            <HRInput
              Label="Job Levell"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.jobLevel?.message as string}
              {...register('jobLevel')}
            />
            <HRInput
              Label="Designation"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.designation?.message as string}
              {...register('designation')}
            />
            <HRInput
              Label="Manager"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.reportingManager?.message as string}
              {...register('reportingManager')}
            />
            <HRInput
              Label="Shift"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.shift?.message as string}
              {...register('shift')}
            />
            <HRInput
              Label="Work Type"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.workType?.message as string}
              {...register('workType')}
            />
            <HRInput
              Label="Employee Type"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.employeeType?.message as string}
              {...register('employeeType')}
            />
            <HRInput
              Label="Work Email"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.workEmail?.message as string}
              {...register('workEmail')}
            />

            <HRInput
              Label="Work Phone"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.workPhoneNumber?.message as string}
              {...register('workPhoneNumber')}
            />
            <Controller
              name="joiningDate"
              control={control}
              render={({ field }) => (
                <HRDateField
                  Label="Joining"
                  labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
                  error={errors.joiningDate?.message as string}
                  date={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />
            <Controller
              name="contractStartDate"
              control={control}
              render={({ field }) => (
                <HRDateField
                  Label="Contract Start Date"
                  labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
                  error={errors.contractStartDate?.message as string}
                  date={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />
            <Controller
              name="contractEndDate"
              control={control}
              render={({ field }) => (
                <HRDateField
                  Label="Contract End Date"
                  labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
                  error={errors.contractEndDate?.message as string}
                  date={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />
          </div>
        </form>
      </div>
    </>
  );
};
