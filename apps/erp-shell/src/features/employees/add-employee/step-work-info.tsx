import type { UseFormReturn } from 'react-hook-form';
import {
  Input,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@erp/ui';
import type { AddEmployeeInput } from './schema';

interface StepProps {
  form: UseFormReturn<AddEmployeeInput>;
}

export function WorkInformationStep({ form }: StepProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
    <div className="space-y-6 pb-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
        Employee & Organizational Details
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Branch"
          htmlFor="branch"
          error={errors.branch?.message}
          required
        >
          <Select
            value={watch('branch')}
            onValueChange={(v: string) =>
              setValue('branch', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              {['Baneshwor', 'Naxal', 'Kalanki', 'Pulchowk', 'Lalitpur'].map(
                (b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label="Department"
          htmlFor="department"
          error={errors.department?.message}
          required
        >
          <Select
            value={watch('department')}
            onValueChange={(v: string) =>
              setValue('department', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {[
                'Engineering',
                'HR',
                'Finance',
                'Marketing',
                'Operations',
                'Legal',
                'Design',
                'Product',
                'Sales',
                'Support',
              ].map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Employee ID"
          htmlFor="employeeId"
          error={errors.employeeId?.message}
          required
        >
          <Input
            id="employeeId"
            placeholder="Employee ID"
            {...register('employeeId')}
          />
        </FormField>
        <FormField
          label="Designation"
          htmlFor="designation"
          error={errors.designation?.message}
          required
        >
          <Input
            id="designation"
            placeholder="Designation"
            {...register('designation')}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Job Level"
          htmlFor="jobLevel"
          error={errors.jobLevel?.message}
          required
        >
          <Select
            value={watch('jobLevel')}
            onValueChange={(v: string) =>
              setValue('jobLevel', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Job Level" />
            </SelectTrigger>
            <SelectContent>
              {['Junior', 'Mid', 'Senior', 'Lead', 'Principal'].map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Reporting Manager" htmlFor="reportingManager">
          <Select
            value={watch('reportingManager') || ''}
            onValueChange={(v: string) => setValue('reportingManager', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Reporting Manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emp-001">James Anderson</SelectItem>
              <SelectItem value="emp-002">Sarah Mitchell</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground pt-4">
        Work Schedule & Type
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Shift"
          htmlFor="shift"
          error={errors.shift?.message}
          required
        >
          <Select
            value={watch('shift')}
            onValueChange={(v: string) =>
              setValue('shift', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Morning">Morning</SelectItem>
              <SelectItem value="Day">Day</SelectItem>
              <SelectItem value="Night">Night</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label="Work Type"
          htmlFor="workType"
          error={errors.workType?.message}
          required
        >
          <Select
            value={watch('workType')}
            onValueChange={(v: string) =>
              setValue('workType', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="WFH" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WFH">WFH</SelectItem>
              <SelectItem value="Onsite">Onsite</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField
        label="Employee Type"
        htmlFor="employeeType"
        error={errors.employeeType?.message}
        required
      >
        <Select
          value={watch('employeeType')}
          onValueChange={(v: string) =>
            setValue('employeeType', v, { shouldValidate: true })
          }
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Full Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Part Time">Part Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Intern">Intern</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground pt-4">
        Contact Information
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Work Phone" htmlFor="workPhone">
          <Input
            id="workPhone"
            placeholder="XXX-XXXXXXX"
            {...register('workPhone')}
          />
        </FormField>
        <FormField
          label="Work Email"
          htmlFor="workEmail"
          error={errors.workEmail?.message}
          required
        >
          <Input
            id="workEmail"
            type="email"
            placeholder="Work Email"
            {...register('workEmail')}
          />
        </FormField>
      </div>

      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground pt-4">
        Employment Dates
      </h3>

      <FormField
        label="Joining Date"
        htmlFor="joiningDate"
        error={errors.joiningDate?.message}
        required
      >
        <Input
          id="joiningDate"
          type="date"
          {...register('joiningDate')}
          className="w-1/2"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Contract Start Date" htmlFor="contractStartDate">
          <Input
            id="contractStartDate"
            type="date"
            {...register('contractStartDate')}
          />
        </FormField>
        <FormField label="Contract End Date" htmlFor="contractEndDate">
          <Input
            id="contractEndDate"
            type="date"
            {...register('contractEndDate')}
          />
        </FormField>
      </div>
    </div>
  );
}
