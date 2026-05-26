import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useAssetCategories,
  useDeleteAssetCategory,
  type AssetCategory,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  HRCard,
  ListPage,
  toast,
} from '@erp/ui';
import { CategoryCard } from './category-card';
import { AssetsCategoryForm } from './assets-category-form';
import { useState } from 'react';
import { EditAssetsCategoryForm } from './edit-asset-category-form';

export const Category = () => {
  const { data: response } = useAssetCategories({ pageSize: 100 });
  const data: AssetCategory[] = response?.data ?? [];
  const deleteAssetCategory = useDeleteAssetCategory();

  // Edit & delete need parent-owned state because they target a specific row.
  const [editTarget, setEditTarget] = useState<AssetCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AssetCategory | null>(null);
  const handleEdit = (assetCategory: AssetCategory) =>
    setEditTarget(assetCategory);
  const handleDelete = (id: string) => {
    const assetCategory = data.find((b) => b.id === id);
    if (assetCategory) setDeleteTarget(assetCategory);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteAssetCategory.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Asset Category deleted successfully',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to delete Asset Category',
        });
      },
    });
  };

  return (
    <>
      <HRCard
        cardClassName="p-6 border border-border bg-white shadow-none rounded-xl"
        cardContentClassName="p-0 flex flex-col"
      >
        <ListPage<AssetCategory>
          flat
          title="Asset Category"
          data={data}
          renderTable={(rows) => (
            <CategoryCard
              data={rows}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
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
      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditTarget(null);
          }
        }}
        title="Edit Asset Category Details"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
      >
        <EditAssetsCategoryForm selectedCategory={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete the asset category?"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
