import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useDocumentCategories, type DocumentCategory } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { CategoryManagementCard } from './category-card';
import { CategoryTable } from './table/category-table';
import { CategoryForm } from './category-form';

export const CategoryManagement = () => {
  const { data: response } = useDocumentCategories({ pageSize: 100 });
  const data: DocumentCategory[] = response?.data ?? [];

  return (
    <>
      <ListPage
        title="Category Management"
        data={data}
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.DOCUMENTS_CATEGORIES}>
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
          </Can>
        }
        renderCard={(filtered) => <CategoryManagementCard data={filtered} />}
        renderTable={(filtered) => <CategoryTable data={filtered} />}
      />
    </>
  );
};
