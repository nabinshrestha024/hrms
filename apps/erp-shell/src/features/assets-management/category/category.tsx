import { DocumentHeader } from '../../../components/document-management-header';
import { Button, FormDialog, HRCard } from '@erp/ui';
import { categoryData } from '../schema/CategoryData';
import { CategoryCard } from './category-card';
import { AssetsCategoryForm } from './assets-category-form';

export const Category = () => {
  return (
    <HRCard
      cardClassName="p-6 border border-border bg-white shadow-none rounded-xl"
      cardContentClassName="p-0 flex flex-col gap-8"
    >
      <DocumentHeader
        className="px-0 py-0"
        data={categoryData}
        title="Asset Category"
        renderTable={(filteredData) => <CategoryCard data={filteredData} />}
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
