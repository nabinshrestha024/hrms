import { HRSelect } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import {
  employeeTypeData,
  shiftData,
  workTypeData,
} from '../../schema/employee-schema';

export const WorkScheduleTypeForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[16px] font-semibold leading-6">
        WORK SCHEDULE & TYPE
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2gap-4">
        <Controller
          name="shift"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Shift"
              isRequired
              selectData={shiftData}
              placeholder="Select shift"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.shift?.message as string}
              disabled={false}
            />
          )}
        />

        <Controller
          name="workType"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Work Type"
              isRequired
              selectData={workTypeData}
              placeholder="Select work type"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.workType?.message as string}
              disabled={false}
            />
          )}
        />

        <Controller
          name="employeeType"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Employee Type"
              isRequired={true}
              selectData={employeeTypeData}
              placeholder="Select employee type"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.employeeType?.message as string}
              disabled={false}
            />
          )}
        />
      </div>
    </div>
  );
};
