import { DocumentHeader } from '../../../components/document-management-header';
import { Button, FormDialog } from '@erp/ui';
import { AssetsTable } from './table/all-assets-table';
import { assetsData } from '../schema/AllAssetsData';
import { AssetsForm } from './assets-form';

export const Assets = () => {
  return (
    <DocumentHeader
      data={assetsData}
      title="All Assets"
      isSearch={true}
      renderTable={(filteredData) => <AssetsTable data={filteredData} />}
      filterFn={(data, search) => {
        return data.filter((item) => {
          const matchesSearch = item.assetName
            .toLowerCase()
            .includes(search.toLowerCase());

          return matchesSearch;
        });
      }}
      actionComponent={
        <FormDialog
          trigger={
            <Button variant="secondary" className="h-10">
              <span>Add Assets</span>
            </Button>
          }
          title="Assets  Details"
          okText="Add"
          size="lg"
          cancelText="Cancel"
          formId="assets-form"
          componentClassName="py-4 pl-4 pr-2"
        >
          {({ close }: { close: () => void }) => (
            <AssetsForm onSuccess={close} />
          )}
        </FormDialog>
      }
    />
  );
};
