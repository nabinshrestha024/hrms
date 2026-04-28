import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { assignLeaveSchema, type AssignLeaveFormValue } from './AssignLeaveZod';
import { Badge, CustomAlert, Form, HRLabel, OptionRadioGroup } from '@erp/ui';
import { UserCard } from '../../../../components/user-card';
import { Info } from 'lucide-react';

interface AssignLeaveFormProps {
  onSuccess?: () => void;
}

export const AssignLeaveForm = ({ onSuccess }: AssignLeaveFormProps = {}) => {
  const form = useForm<AssignLeaveFormValue>({
    resolver: zodResolver(assignLeaveSchema),
    mode: 'onChange',
  });

  const {
    formState: { errors },
  } = form;

  const onsubmit = (_data: AssignLeaveFormValue) => {
    onSuccess?.();
  };

  const leave = [
    { type: 'Mourning Leave', days: 5 },
    { type: 'Maternity Leave', days: 98 },
    { type: 'Paternity Leave', days: 15 },
    { type: 'Marriage Leave', days: 7 },
    { type: 'Study Leave', days: 14 },
    { type: 'Bereavement Leave', days: 3 },
  ];

  const leaveOptions = leave.map((val) => ({
    value: val.type,
    label: (
      <div className="relative flex justify-between items-center">
        <span className="text-[14px] font-medium leading-5 text-foreground">
          {val.type}
        </span>
        <Badge
          variant="default"
          className="absolute -top-1 left-138 w-16 text-foreground px-2 py-1 flex items-center justify-center"
        >
          {val.days} Days
        </Badge>
      </div>
    ),
  }));

  return (
    <div className="w-full flex flex-col gap-4">
      <UserCard
        employeeId="EID 012 "
        employeeName="John Doe"
        department="Technical"
      />

      <Form form={form} onSubmit={onsubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <HRLabel labelClassName="text-[14px] font-medium leading-5 text-foreground">
              Leave Category
            </HRLabel>
            <Controller
              control={form.control}
              name="leaveCategory"
              render={({ field }) => (
                <OptionRadioGroup
                  options={leaveOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col gap-3"
                  optionClassName="border border-border rounded-[6px] px-3 py-2.5"
                  itemClassName="border-muted-foreground shadow-none"
                  error={errors.leaveCategory?.message}
                />
              )}
            />
          </div>

          <CustomAlert
            icon={<Info className="text-[24px] text-muted-foreground" />}
            description=" Entitlement days for these categories are fixed by company policy
              and will be credited to the employee's balance immediately upon
              assignment."
          />
        </div>
      </Form>
    </div>
  );
};
