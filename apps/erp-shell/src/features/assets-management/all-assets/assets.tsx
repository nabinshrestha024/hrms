import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useAssets, type Asset } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { AssetsTable } from './table/all-assets-table';
import { AssetsForm } from './assets-form';

export const Assets = () => {
  const { data: response } = useAssets({ pageSize: 100 });
  const data: Asset[] = response?.data ?? [];

  return (
    <ListPage<Asset>
      title="All Assets"
      search
      data={data}
      renderTable={(rows) => <AssetsTable data={rows} />}
      filterFn={(rows, { search }) =>
        rows.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      }
      actionComponent={
        <Can action="create" subject={PERM_SUBJECTS.ASSETS_ITEMS}>
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
        </Can>
      }
    />
  );
};
