import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { AddCurrencyForm } from './add-currency-form';
import { CurrencyTable } from './table/currency-table';
import { MasterSetupBody } from '../body';
import { currencyData } from '../schema/CurrencyData';

export const Currency = () => {
  return (
    <DocumentHeader
      title="Currencies"
      isSearch={true}
      data={currencyData}
      actionComponent={
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
      }
      renderTable={(filteredData) => (
        <MasterSetupBody component={<CurrencyTable data={filteredData} />} />
      )}
    />
  );
};
