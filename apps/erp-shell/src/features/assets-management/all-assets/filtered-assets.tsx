import { type Asset } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { AssetsForm } from './assets-form';
import { FilteredAssetsTable } from './table/filtered-assets-table';

interface FilteredAssetsProps {
  data: Asset[];
  category: string;
}
export const FilteredAssets = ({ data, category }: FilteredAssetsProps) => {
  const filteredData = data.filter((item) => item.category === category);
  return (
    <ListPage<Asset>
      flat
      title="Asset List"
      data={filteredData}
      renderTable={(rows) => <FilteredAssetsTable data={rows} />}
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
