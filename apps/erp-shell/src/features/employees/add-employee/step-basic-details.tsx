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

export function BasicDetailsStep({ form }: StepProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const gender = watch('gender');
  const maritalStatus = watch('maritalStatus');

  return (
    <div className="space-y-6 pb-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
        Personal Information
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="First Name"
          htmlFor="firstName"
          error={errors.firstName?.message}
          required
        >
          <Input
            id="firstName"
            placeholder="First Name"
            {...register('firstName')}
          />
        </FormField>
        <FormField label="Middle Name" htmlFor="middleName">
          <Input
            id="middleName"
            placeholder="Middle Name"
            {...register('middleName')}
          />
        </FormField>
        <FormField
          label="Last Name"
          htmlFor="lastName"
          error={errors.lastName?.message}
          required
        >
          <Input
            id="lastName"
            placeholder="Last Name"
            {...register('lastName')}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Personal Email"
          htmlFor="personalEmail"
          error={errors.personalEmail?.message}
          required
        >
          <Input
            id="personalEmail"
            type="email"
            placeholder="Personal Email"
            {...register('personalEmail')}
          />
        </FormField>
        <FormField
          label="Phone Number"
          htmlFor="phone"
          error={errors.phone?.message}
          required
        >
          <Input id="phone" placeholder="XXX-XXXXXXX" {...register('phone')} />
        </FormField>
      </div>

      <FormField
        label="Date of Birth"
        htmlFor="dateOfBirth"
        error={errors.dateOfBirth?.message}
        required
      >
        <Input
          id="dateOfBirth"
          type="date"
          {...register('dateOfBirth')}
          className="w-1/2"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Gender"
          htmlFor="gender"
          error={errors.gender?.message}
          required
        >
          <div className="flex items-center gap-4 pt-1">
            {['Male', 'Female', 'Others'].map((g) => (
              <label
                key={g}
                className="flex items-center gap-1.5 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  value={g}
                  checked={gender === g}
                  onChange={() =>
                    setValue('gender', g, { shouldValidate: true })
                  }
                  className="accent-primary size-4"
                />
                {g}
              </label>
            ))}
          </div>
        </FormField>
        <FormField
          label="Marital Status"
          htmlFor="maritalStatus"
          error={errors.maritalStatus?.message}
          required
        >
          <div className="flex items-center gap-4 pt-1">
            {['Married', 'Single', 'Divorced', 'Widowed'].map((s) => (
              <label
                key={s}
                className="flex items-center gap-1.5 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  value={s}
                  checked={maritalStatus === s}
                  onChange={() =>
                    setValue('maritalStatus', s, { shouldValidate: true })
                  }
                  className="accent-primary size-4"
                />
                {s}
              </label>
            ))}
          </div>
        </FormField>
      </div>

      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground pt-4">
        Address Information
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Country"
          htmlFor="country"
          error={errors.country?.message}
          required
        >
          <Select
            value={watch('country')}
            onValueChange={(v) =>
              setValue('country', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nepal">Nepal</SelectItem>
              <SelectItem value="India">India</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label="Province"
          htmlFor="province"
          error={errors.province?.message}
          required
        >
          <Select
            value={watch('province')}
            onValueChange={(v) =>
              setValue('province', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bagmati">Bagmati</SelectItem>
              <SelectItem value="Gandaki">Gandaki</SelectItem>
              <SelectItem value="Lumbini">Lumbini</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="City"
          htmlFor="city"
          error={errors.city?.message}
          required
        >
          <Select
            value={watch('city')}
            onValueChange={(v) => setValue('city', v, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kathmandu">Kathmandu</SelectItem>
              <SelectItem value="Lalitpur">Lalitpur</SelectItem>
              <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label="Municipality/VDC"
          htmlFor="municipality"
          error={errors.municipality?.message}
          required
        >
          <Select
            value={watch('municipality')}
            onValueChange={(v) =>
              setValue('municipality', v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kathmandu Metro">Kathmandu Metro</SelectItem>
              <SelectItem value="Lalitpur Metro">Lalitpur Metro</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Ward" htmlFor="ward">
          <Input id="ward" placeholder="Ward" {...register('ward')} />
        </FormField>
        <FormField
          label="Address"
          htmlFor="address"
          error={errors.address?.message}
          required
        >
          <Input id="address" placeholder="Address" {...register('address')} />
        </FormField>
      </div>

      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground pt-4">
        Emergency Contact
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Emergency Contact" htmlFor="emergencyContact">
          <Input
            id="emergencyContact"
            placeholder="XXX-XXXXXXX"
            {...register('emergencyContact')}
          />
        </FormField>
        <FormField
          label="Emergency Contact Name"
          htmlFor="emergencyContactName"
        >
          <Input
            id="emergencyContactName"
            placeholder="Emergency Contact Name"
            {...register('emergencyContactName')}
          />
        </FormField>
      </div>

      <FormField
        label="Emergency Contact Relation"
        htmlFor="emergencyContactRelation"
      >
        <Input
          id="emergencyContactRelation"
          placeholder="Emergency Contact Relation"
          {...register('emergencyContactRelation')}
          className="w-1/2"
        />
      </FormField>
    </div>
  );
}
