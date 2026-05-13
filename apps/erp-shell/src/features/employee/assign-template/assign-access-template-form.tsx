import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { Form, HRInput, RadioTab, toast } from '@erp/ui';
import {
  AssignAccessTemplateFormValue,
  assignAccessTemplateSchema,
} from './AssignAccessTemplateForm.Zod';

interface AssignAccessTemplateFormProps {
  onSuccess?: () => void;
  employeeBranch?: string;
}

export const AssignAccessTemplateForm = ({
  onSuccess,
  employeeBranch,
}: AssignAccessTemplateFormProps = {}) => {
  const form = useForm<AssignAccessTemplateFormValue>({
    resolver: zodResolver(assignAccessTemplateSchema),
    mode: 'onChange',
    defaultValues: {
      assignRole: '',
      dataScope: {
        type: 'global',
        branches: [],
      },
    },
  });

  const { register, setValue, watch } = form;

  const onsubmit = (_data: AssignAccessTemplateFormValue) => {
    console.warn(_data);
    toast({ variant: 'success', title: 'Assign access template' });
    onSuccess?.();
  };

  const roles = [
    { role: 'Super Admin', description: 'Full system privileges' },
    { role: 'HR Manager', description: '3 action privileges' },
    { role: 'Branch Admin', description: '1 action privileges' },
    { role: 'Finance Lead', description: '2 action privileges' },
    { role: 'Employee', description: '0 action privileges' },
  ];

  const dataScope = [
    { id: 0, value: 'global', content: 'Global', branch: [] },
    {
      id: 1,
      value: 'limited',
      content: 'Limited',
      branch: [
        { label: 'New York HQ', val: 'ny' },
        { label: 'London Office', val: 'london' },
        { label: 'Tokyo Office', val: 'tokyo' },
        { label: 'San Francisco', val: 'sf' },
        { label: 'Berlin Office', val: 'berlin' },
      ],
    },
    { id: 2, value: 'self', content: 'Self', branch: [] },
  ];

  const [selectedAssignAccess, setSelectedAssignAccess] = useState('');
  const [selectedDataScope, setSelectedDataScope] = useState('global');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  // const assignRole = watch('assignRole');
  // const dataScopes = watch('dataScope');

  return (
    <div className="w-full flex flex-col gap-4">
      <Form form={form} onSubmit={onsubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="text-[14px] font-medium leading-5 text-secondary-foreground">
              Step 1: Assign role template
            </div>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((item, index) => {
                const isSelected = selectedAssignAccess === item.role;
                return (
                  <label
                    key={index}
                    className={`border rounded-[6px] p-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary-foreground'
                        : 'border-border'
                    }`}
                    onClick={() => {
                      setSelectedAssignAccess(item.role);
                      setValue('assignRole', item.role, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-[14px] leading-5 text-foreground">
                          {item.role}
                        </span>
                        {isSelected && (
                          <CheckIcon className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <span className="text-[12px] text-secondary-foreground font-normal leading-4">
                        {item.description}
                      </span>
                    </div>
                    <HRInput
                      type="radio"
                      value={item.role}
                      {...register('assignRole')}
                      className="hidden"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-[14px] font-medium leading-5 text-secondary-foreground">
              Step 2: Define data scope (branches)
            </div>

            <RadioTab
              employeeBranch={employeeBranch}
              defaultValue="global"
              tabClassName="flex flex-col gap-2"
              tabListClassName="flex justify-center py-2 px-0 bg-muted rounded-[6px]"
              tabList={dataScope}
              tabTriggerClassName="h-8 px-4 md:px-[44.83px] py-[6px] text-[14px] font-medium leading-5 text-secondary-foreground"
              selectedDataScope={selectedDataScope}
              setSelectedDataScope={(val) => {
                setSelectedDataScope(val);
                if (val === 'global') {
                  setValue(
                    'dataScope',
                    { type: 'global', branches: [] },
                    { shouldValidate: true }
                  );
                }

                if (val === 'limited') {
                  setValue(
                    'dataScope',
                    { type: 'limited', branches: selectedBranches },
                    { shouldValidate: true }
                  );
                }

                if (val === 'self') {
                  setValue(
                    'dataScope',
                    { type: 'self', branches: [employeeBranch || ''] },
                    { shouldValidate: true }
                  );
                }
              }}
              selectedBranches={selectedBranches}
              setSelectedBranches={(branches) => {
                setSelectedBranches(branches);
                setValue(
                  'dataScope',
                  { type: 'limited', branches },
                  { shouldValidate: true }
                );
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};
