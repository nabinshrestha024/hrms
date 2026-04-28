import {
  Button,
  HRAccordionCard,
  HRCard,
  HRInput,
  HRSelect,
  Switch,
} from '@erp/ui';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IconButton } from '../../../../components/icon-button';
import { SalaryStructureTemplateFormValue } from '../../zod/SalaryStructure.zod';
export const AllowanceCard = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SalaryStructureTemplateFormValue>();
  const [enableDearnessAllowance, setEnableDearnessAllowance] = useState(false);
  const [enableOtherAllowance, setEnableOtherAllowance] = useState(false);

  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none"
      cardContentClassName="p-0 "
    >
      <HRAccordionCard value="allowance" title="Allowance">
        <HRCard
          cardClassName="mt-6 p-0 border-none rounded-[6px] bg-white shadow-none"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          <HRCard
            cardClassName="px-3 py-2.5 border-none rounded-[8px] bg-muted shadow-none"
            cardContentClassName="p-0 flex gap-10 items-center"
          >
            <div className="grid grid-cols-4 gap-2">
              <Controller
                name="dearnessAllowances"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    selectData={[]}
                    placeholder="Dearness Allowance"
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!enableDearnessAllowance}
                  />
                )}
              />
              <Controller
                name="percentage"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    selectData={[]}
                    placeholder="percentage"
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!enableDearnessAllowance}
                  />
                )}
              />
              <HRInput
                placeholder="0"
                error={errors.basicSalary?.message}
                {...register('basicSalary')}
                disabled={!enableDearnessAllowance}
              />
              <Controller
                name="ofbasic"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    selectData={[]}
                    placeholder="of Basic"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.ofbasic?.message}
                    disabled={!enableDearnessAllowance}
                  />
                )}
              />
            </div>
            <div className="flex gap-2">
              <Switch
                checked={enableDearnessAllowance}
                onCheckedChange={setEnableDearnessAllowance}
              />
              <IconButton variant="destructive">
                <Trash2 className="w-4 h-4" />
              </IconButton>
            </div>
          </HRCard>
          <HRCard
            cardClassName="px-3 py-2.5 border-none rounded-[8px] bg-muted shadow-none"
            cardContentClassName="p-0 flex gap-10 items-center"
          >
            <div className="grid grid-cols-3 gap-2">
              <Controller
                name="otherAllowances"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    selectData={[]}
                    placeholder="Other Allowances"
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!enableOtherAllowance}
                  />
                )}
              />
              <Controller
                name="fixed"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    selectData={[]}
                    placeholder="fixed"
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!enableOtherAllowance}
                  />
                )}
              />
              <HRInput
                placeholder="0"
                error={errors.basicSalary?.message}
                {...register('basicSalary')}
                disabled={!enableOtherAllowance}
              />
            </div>
            <div className="flex gap-2">
              <Switch
                checked={enableOtherAllowance}
                onCheckedChange={setEnableOtherAllowance}
              />
              <IconButton variant="destructive">
                <Trash2 className="w-4 h-4" />
              </IconButton>
            </div>
          </HRCard>
          <Button
            variant="outline"
            className="flex gap-1 justify-center items-center"
          >
            <Plus w-4 h-4 />
            Add Allowance
          </Button>
        </HRCard>
      </HRAccordionCard>
    </HRCard>
  );
};
