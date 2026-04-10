import { useBranches, useDeleteBranch, type Branch } from '@erp/data-access';
import { toast } from '@erp/ui';
import { PageHeader } from '../../../components/page-header';
import { BranchCard } from './branch-card';
import { BranchForm } from './branch-form';
import { BranchTable } from './branch-table/branch-table';

type ModalSize = 'sm' | 'md' | 'lg';

interface GetColumnsProps {
  onOpen: <T extends string>(config: {
    title: T;
    modalTitle: string | null;
    okText: React.ReactNode;
    component: React.ReactNode;
    cancelText?: string | React.ReactNode;
    size?: ModalSize;
    formId?: string;
    onCancel?: () => void;
  }) => void;
}

export const BranchManagement = ({ onOpen }: GetColumnsProps) => {
  const { data: branchResponse } = useBranches({ pageSize: 100 });
  const data: Branch[] = branchResponse?.data ?? [];
  const deleteBranch = useDeleteBranch();

  const handleEdit = (branch: Branch) => {
    onOpen({
      modalTitle: 'Edit Branch',
      title: 'Edit Branch',
      okText: 'Save',
      size: 'lg',
      cancelText: 'Cancel',
      formId: 'branch',
      component: <BranchForm />,
    });
  };

  const handleDelete = (id: string) => {
    deleteBranch.mutate(id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Branch deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete branch' });
      },
    });
  };

  return (
    <>
      <PageHeader
        title="Branch Management"
        buttonName="Add Branch"
        isTabs={true}
        data={data}
        dropdownKey="branch"
        dropdownLabel="Branch"
        onAdd={() =>
          onOpen({
            modalTitle: 'Branch Details',
            title: 'Branch Details',
            okText: 'Add',
            size: 'lg',
            cancelText: 'Cancel',
            formId: 'branch',
            component: <BranchForm />,
          })
        }
        renderCard={(filtered) => (
          <BranchCard
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        renderTable={(filtered) => (
          <BranchTable
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        filterFn={(data, search, dropdown) => {
          return data.filter((item: Branch) => {
            const matchesSearch = item.branch
              ?.toLowerCase()
              .includes(search.toLowerCase());
            const matchesDropdown = dropdown ? item.branch === dropdown : true;
            return matchesSearch && matchesDropdown;
          });
        }}
      />
    </>
  );
};
