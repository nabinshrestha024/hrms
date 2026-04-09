import { HRInput, HRSelect } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import {
  branchData,
  departmentData,
  jobLevelData,
  reportingManagerData,
} from '../../schema/EmployeeSchema';

export const WorkOrganizationForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[16px] font-semibold leading-6">
        EMPLOYEE & ORGANIZATION DETAILS
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="branch"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Branch"
              isRequired
              selectData={branchData}
              placeholder="Select branch"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.branch?.message as string}
              disabled={false}
            />
          )}
        />

        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Department"
              isRequired
              selectData={departmentData}
              placeholder="Select department"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.department?.message as string}
              disabled={false}
            />
          )}
        />
        <HRInput
          Label="Employee ID"
          type="text"
          isRequired
          placeholder="Employee ID"
          error={errors.employeeId?.message as string}
          {...register('employeeId')}
        />

        <HRInput
          Label="Designation"
          type="text"
          isRequired
          placeholder="Designation"
          error={errors.designation?.message as string}
          {...register('designation')}
        />
        <Controller
          name="jobLevel"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Job Level"
              isRequired={true}
              selectData={jobLevelData}
              placeholder="Select jobLevel"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.jobLevel?.message as string}
              disabled={false}
            />
          )}
        />

        <Controller
          name="reportingManager"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Reporting Manager"
              isRequired
              selectData={reportingManagerData}
              placeholder="Select Reporting Manager"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.reportingManager?.message as string}
              disabled={false}
            />
          )}
        />
      </div>
    </div>
  );
};
