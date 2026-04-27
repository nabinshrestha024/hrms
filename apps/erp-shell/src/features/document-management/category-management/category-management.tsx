import { useDocumentCategories, type DocumentCategory } from '@erp/data-access';
import { Button, FormDialog } from '@erp/ui';
import { PageHeader } from '../../../components/page-header';
import { CategoryManagementCard } from './category-card';
import { CategoryTable } from './table/category-table';
import { CategoryForm } from './category-form';

export const CategoryManagement = () => {
  const { data: response } = useDocumentCategories({ pageSize: 100 });
  const data: DocumentCategory[] = response?.data ?? [];

  return (
    <>
      <PageHeader
        title="Category Management"
        isTabs={true}
        data={data}
        actionComponent={
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Category
              </Button>
            }
            title="Category Management"
            size="lg"
            formId="category-form"
            okText="Add"
            cancelText="Cancel"
          >
            {({ close }: { close: () => void }) => (
              <CategoryForm onSuccess={close} />
            )}
          </FormDialog>
        }
        renderCard={(filtered) => <CategoryManagementCard data={filtered} />}
        renderTable={(filtered) => <CategoryTable data={filtered} />}
      />
    </>
  );
};
