import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useCurrencies, type Currency as CurrencyType } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { AddCurrencyForm } from './add-currency-form';
import { CurrencyTable } from './table/currency-table';
import { MasterSetupBody } from '../body';

export const Currency = () => {
  const { data: response } = useCurrencies({ pageSize: 100 });
  const data: CurrencyType[] = response?.data ?? [];

  return (
    <ListPage<CurrencyType>
      title="Currencies"
      search
      data={data}
      filterFn={(rows, { search }) =>
        rows.filter((row) => {
          const q = search.toLowerCase();
          return (
            row.code.toLowerCase().includes(q) ||
            row.name.toLowerCase().includes(q)
          );
        })
      }
      actionComponent={
        <Can action="create" subject={PERM_SUBJECTS.MASTER_CURRENCIES}>
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Currency Type
              </Button>
            }
            title="Add New Currency Type"
            size="lg"
            formId="currency-form"
            okText="Add"
            cancelText="Cancel"
          >
            {({ close }: { close: () => void }) => (
              <AddCurrencyForm onSuccess={close} />
            )}
          </FormDialog>
        </Can>
      }
      renderTable={(rows) => (
        <MasterSetupBody component={<CurrencyTable data={rows} />} />
      )}
    />
  );
};
