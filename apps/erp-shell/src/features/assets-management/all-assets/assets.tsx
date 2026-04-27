import { Button, FormDialog, ListPage } from '@erp/ui';
import { AssetsTable } from './table/all-assets-table';
import { assetsData } from '../schema/AllAssetsData';
import { AssetsForm } from './assets-form';

export const Assets = () => {
  return (
    <ListPage
      title="All Assets"
      search
      data={assetsData}
      renderTable={(rows) => <AssetsTable data={rows} />}
      filterFn={(data, { search }) =>
        data.filter((item) =>
          item.assetName.toLowerCase().includes(search.toLowerCase())
        )
      }
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
