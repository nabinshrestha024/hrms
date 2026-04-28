import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useAssetCategories, type AssetCategory } from '@erp/data-access';
import { Button, FormDialog, HRCard, ListPage } from '@erp/ui';
import { CategoryCard } from './category-card';
import { AssetsCategoryForm } from './assets-category-form';

export const Category = () => {
  const { data: response } = useAssetCategories({ pageSize: 100 });
  const data: AssetCategory[] = response?.data ?? [];

  return (
    <HRCard
      cardClassName="p-6 border border-border bg-white shadow-none rounded-xl"
      cardContentClassName="p-0 flex flex-col gap-8"
    >
      <ListPage<AssetCategory>
        flat
        title="Asset Category"
        data={data}
        renderTable={(rows) => <CategoryCard data={rows} />}
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.ASSETS_CATEGORIES}>
            <FormDialog
              trigger={
                <Button variant="secondary" className="h-10">
                  <span>Add Category</span>
                </Button>
              }
              title="Category Details"
              okText="Add"
              size="lg"
              cancelText="Cancel"
              formId="assets-category-form"
              componentClassName="py-4 pl-4 pr-2"
            >
              {({ close }: { close: () => void }) => (
                <AssetsCategoryForm onSuccess={close} />
              )}
            </FormDialog>
          </Can>
        }
      />
    </HRCard>
  );
};
