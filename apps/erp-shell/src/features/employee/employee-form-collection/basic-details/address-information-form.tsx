import { HRInput, HRSelect } from '@erp/ui';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { addressData, municipalityData } from '../../schema/employee-schema';

export const AddressInformationForm = () => {
  const [country, setCountry] = useState<string>();
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleCountrySelector = (val: string) => {
    setCountry(val);
    setProvince('');
    setDistrict('');
    setValue('country', val);
    setValue('province', '');
    setValue('district', '');
  };

  const handleProvinceSelector = (val: string) => {
    setProvince(val);
    setDistrict('');
    setValue('province', val);
    setValue('district', '');
  };

  const handleCitySelector = (val: string) => {
    setDistrict(val);
    setValue('district', val);
  };

  const countryOptions = addressData.map((coun) => ({
    id: coun.id,
    content: coun.country,
    value: coun.country,
  }));

  const provinces =
    addressData.find((coun) => coun.country === country)?.provinces || [];

  const provinceOptions = provinces.map((prov) => ({
    id: prov.id,
    content: prov.province,
    value: prov.province,
  }));

  const districts =
    provinces.find((prov) => prov.province === province)?.districts?.district ||
    [];

  const cityOptions = districts.map((dist, index) => ({
    id: index,
    content: dist,
    value: dist,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[16px] font-semibold leading-6">
        ADDRESS INFORMATION
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Country"
              isRequired
              selectData={countryOptions}
              placeholder="Select Country"
              value={field.value}
              onValueChange={handleCountrySelector}
              error={errors.country?.message as string}
              disabled={false}
            />
          )}
        />

        <Controller
          name="province"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Province"
              isRequired
              selectData={provinceOptions}
              placeholder="Select Province"
              value={field.value}
              onValueChange={handleProvinceSelector}
              error={errors.province?.message as string}
              disabled={!country || provinceOptions.length === 0}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="District"
              isRequired
              selectData={cityOptions}
              placeholder="Select district"
              value={field.value}
              onValueChange={handleCitySelector}
              error={errors.city?.message as string}
              disabled={!province || cityOptions.length === 0}
            />
          )}
        />

        <Controller
          name="municipality"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Municipality/VDC"
              isRequired
              selectData={municipalityData}
              placeholder="State"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.municipality?.message as string}
              disabled={false}
            />
          )}
        />

        <HRInput
          Label="Ward"
          type="text"
          isRequired
          placeholder="Ward"
          error={errors.ward?.message as string}
          {...register('ward')}
        />

        <HRInput
          Label="Address"
          type="text"
          isRequired
          placeholder="Address"
          error={errors.address?.message as string}
          {...register('address')}
        />
      </div>
    </div>
  );
};
