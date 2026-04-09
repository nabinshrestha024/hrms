import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { BasicDetailForm } from './BasicDetailForm';
import { employeeSchema, type EmployeeFormValue } from './EmployeeForm.Zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkInformationForm } from './WorkInformationForm';
import { Button, HRCard } from '@erp/ui';
import { FinancialDetailForm } from './FinancialDetailForm';

type Props = {
  setOpen: (open: boolean) => void;
};

export const EmployeeForm = ({ setOpen }: Props) => {
  const methods = useForm({
    resolver: zodResolver(employeeSchema),
  });
  const { handleSubmit } = methods;

  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const onsubmit = (data: EmployeeFormValue) => {
    console.warn('Employee Details: ', data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col ">
        <div className="text-[24px] font-bold ">Employee Information</div>
        <div className="flex items-center justify-between px-10 py-6">
          {[1, 2, 3].map((s, index) => {
            const isCompleted = step > s;
            const isActive = step === s;

            return (
              <div
                key={s}
                className="flex-1 flex flex-col items-center relative"
              >
                {index !== 0 && (
                  <div
                    className={`absolute top-4 left-[-50%] w-full h-1 ${
                      step > s - 1 ? 'bg-primary' : 'bg-gray-400'
                    }`}
                  />
                )}

                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full z-10 text-sm font-medium
          ${
            isCompleted
              ? 'bg-primary text-white'
              : isActive
              ? 'border-2 border-primary bg-primary text-white'
              : 'bg-gray-400 text-white'
          }`}
                >
                  {isCompleted ? '✓' : s}
                </div>

                <span
                  className={`mt-2 text-xs ${
                    isActive || isCompleted
                      ? 'text-primary'
                      : 'text-secondary-foreground '
                  }`}
                >
                  {s === 1 && 'Basic Details'}
                  {s === 2 && 'Work Information'}
                  {s === 3 && 'Financial Information'}
                </span>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col gap-3">
            <HRCard
              cardClassName="max-h-[600px] overflow-auto p-4 border border-border shadow-none bg-background "
              cardContentClassName="p-0"
            >
              {step === 1 && <BasicDetailForm />}
              {step === 2 && <WorkInformationForm />}
              {step === 3 && <FinancialDetailForm />}
            </HRCard>
            <div className="flex justify-between">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="text-[14px] font-medium leading-5  text-muted-foreground "
                >
                  Cancel
                </Button>
              )}
              <div className="flex justify-end gap-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="text-[14px] font-medium  text-muted-foreground "
                  >
                    Previous
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={nextStep}
                    className="text-[14px] font-medium text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="secondary"
                    className="text-[14px] font-medium text-white"
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
