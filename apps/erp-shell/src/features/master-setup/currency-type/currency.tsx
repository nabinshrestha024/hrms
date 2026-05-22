import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  Currency,
  useCurrencies,
  useDeleteCurrency,
  type Currency as CurrencyType,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { AddCurrencyForm } from './add-currency-form';
import { CurrencyTable } from './table/currency-table';
import { MasterSetupBody } from '../body';
import { EditCurrencyForm } from './edit-currency-form';
import { useState } from 'react';

export const CurrencyManagement = () => {
  const { data: response } = useCurrencies({ pageSize: 100 });
  const data: CurrencyType[] = response?.data ?? [];
  const deleteCurrency = useDeleteCurrency();

  const [editTarget, setEditTarget] = useState<Currency | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Currency | null>(null);
  const handleEdit = (currency: Currency) => setEditTarget(currency);
  const handleDelete = (id: string) => {
    const currency = data.find((b) => b.id === id);
    if (currency) setDeleteTarget(currency);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteCurrency.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Currency deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete Currency' });
      },
    });
  };
  return (
    <>
      <ListPage<CurrencyType>
        title="Currencies"
        search
        data={data}
        filterFn={(rows, { search }) =>
          rows.filter((row) => {
            const q = search.toLowerCase();
            return (
              row.code.toLowerCase().includes(q) ||
              row.name.toLowerCase().includes(q)
            );
          })
        }
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.MASTER_CURRENCIES}>
            <FormDialog
              trigger={
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="text-[14px] font-medium leading-5 text-white"
                >
                  Add Currency Type
                </Button>
              }
              title="Add New Currency Type"
              size="lg"
              formId="currency-form"
              okText="Add"
              cancelText="Cancel"
            >
              {({ close }: { close: () => void }) => (
                <AddCurrencyForm onSuccess={close} />
              )}
            </FormDialog>
          </Can>
        }
        renderTable={(rows) => (
          <MasterSetupBody
            component={
              <CurrencyTable
                data={rows}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            }
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
        title="Edit Currency Details"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
      >
        <EditCurrencyForm selectedCurrency={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete the Currency?"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
