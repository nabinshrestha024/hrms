import { Button, FormDialog, HRCard, ListPage } from '@erp/ui';
import { AllowanceTable } from './table/allowance-table';
import { Allowance, useAllowance } from '@erp/data-access';
import { allowancesSeed } from '../../../../../mocks/modules/payroll-setup-allowance/seed';
import { AllowanceForm } from './allowance-form';

export const ConfiguredAllowance = () => {
  const { data: response } = useAllowance({ pageSize: 100 });
  const data: Allowance[] = response?.data ?? allowancesSeed;
  console.warn(data, 'Generate Payroll');
  return (
    <HRCard
      cardClassName="p-6 border border-border shadow-none bg-white rounded-xl"
      cardContentClassName="p-0 flex flex-col"
    >
      <ListPage
        data={data}
        title="Configured Allowances"
        titleClassName="text-[18px] font-medium"
        flat
        actionComponent={
          // <Can action="create" subject={PERM_SUBJECTS.PAYROLL_RUNS}>
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Allowance
              </Button>
            }
            title="Add New Allowance"
            size="lg"
            formId="payroll-allowance-form"
            okText="Add Allowance"
            cancelText="Cancel"
          >
            <AllowanceForm />
          </FormDialog>
          // </Can>
        }
        renderTable={(filtered) => <AllowanceTable data={filtered} />}
      />
    </HRCard>
  );
};
