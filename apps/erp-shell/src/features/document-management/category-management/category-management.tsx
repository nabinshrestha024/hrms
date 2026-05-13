import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteDocumentCategory,
  useDocumentCategories,
  type DocumentCategory,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { CategoryManagementCard } from './category-card';
import { CategoryTable } from './table/category-table';
import { CategoryForm } from './category-form';
import { useState } from 'react';
import { EditCategoryForm } from './edit-category-form';

export const CategoryManagement = () => {
  const { data: response } = useDocumentCategories({ pageSize: 100 });
  const deleteDocumnetCategory = useDeleteDocumentCategory();
  const data: DocumentCategory[] = response?.data ?? [];
  const [editTarget, setEditTarget] = useState<DocumentCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DocumentCategory | null>(
    null
  );
  const handleEdit = (documnetCategory: DocumentCategory) =>
    setEditTarget(documnetCategory);
  const handleDelete = (id: string) => {
    const documnetCategory = data.find((b) => b.id === id);
    if (documnetCategory) setDeleteTarget(documnetCategory);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteDocumnetCategory.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Documnet Category deleted successfully',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to delete documnet category',
        });
      },
    });
  };
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
        renderCard={(filtered) => (
          <CategoryManagementCard
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        renderTable={(filtered) => (
          <CategoryTable
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />
      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditTarget(null);
          }
        }}
        title="Edit Category Details"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
      >
        <EditCategoryForm selectedCategory={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this category?"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
