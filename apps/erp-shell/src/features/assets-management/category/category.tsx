import { Button, FormDialog, HRCard, ListPage } from '@erp/ui';
import { categoryData } from '../schema/CategoryData';
import { CategoryCard } from './category-card';
import { AssetsCategoryForm } from './assets-category-form';

export const Category = () => {
  return (
    <HRCard
      cardClassName="p-6 border border-border bg-white shadow-none rounded-xl"
      cardContentClassName="p-0 flex flex-col gap-8"
    >
      <ListPage
        flat
        title="Asset Category"
        data={categoryData}
        renderTable={(rows) => <CategoryCard data={rows} />}
        actionComponent={
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
        }
      />
    </HRCard>
  );
};
