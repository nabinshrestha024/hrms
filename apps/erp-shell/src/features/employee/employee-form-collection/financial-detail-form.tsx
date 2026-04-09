import { BankDetailForm } from './financial-details/bank-detail-form';
import { SalaryForm } from './financial-details/salary-detail-form';

export const FinancialDetailForm = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <SalaryForm />
        <BankDetailForm />
      </div>
    </>
  );
};
