import { PageHeader } from '../../../components/page-header';
import { DepartmentCard } from './department-card';
import { DepartmentForm } from './department-form';
import {
  useDepartments,
  useDeleteDepartment,
  type Department,
} from '@erp/data-access';
import { toast } from '@erp/ui';

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

export const DepartmentManagement = ({ onOpen }: GetColumnsProps) => {
  const { data: deptResponse } = useDepartments({ pageSize: 100 });
  const data: Department[] = deptResponse?.data ?? [];
  const deleteDepartment = useDeleteDepartment();

  const handleEdit = (dept: Department) => {
    onOpen({
      modalTitle: 'Edit Department',
      title: 'Edit Department',
      okText: 'Save',
      size: 'lg',
      cancelText: 'Cancel',
      formId: 'Department',
      component: <DepartmentForm />,
    });
  };

  const handleDelete = (id: string) => {
    deleteDepartment.mutate(id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Department deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete department' });
      },
    });
  };

  return (
    <>
      <PageHeader
        title="Department Management"
        buttonName="Add Department"
        isTabs={false}
        data={data}
        onAdd={() =>
          onOpen({
            modalTitle: 'Department Details',
            title: 'Department Details',
            okText: 'Add',
            size: 'lg',
            cancelText: 'Cancel',
            formId: 'Department',
            component: <DepartmentForm />,
          })
        }
        renderCard={(filtered) => (
          <DepartmentCard
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        renderTable={(filtered) => <></>}
        filterFn={(data, search, dropdown) => {
          return data.filter((item: Department) => {
            const matchesSearch = item.department
              ?.toLowerCase()
              .includes(search.toLowerCase());
            const matchesDropdown = dropdown
              ? item.location === dropdown
              : true;
            return matchesSearch && matchesDropdown;
          });
        }}
      />
    </>
  );
};
