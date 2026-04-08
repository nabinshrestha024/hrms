import {
  departmentData,
  DepartmentType,
} from '../../../features/company-setup/Branch/DepartmentData';
import { PageHeader } from '../../../components/PageHeader';
import { DepartmentCard } from '../../../features/company-setup/Department/DepartmentCard';
import { DepartmentForm } from '../../../features/company-setup/Department/DepartmentForm';

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
  const data: DepartmentType[] = departmentData;
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
        renderCard={(filtered) => <DepartmentCard data={filtered} />}
        renderTable={(filtered) => <></>}
        filterFn={(data, search, dropdown) => {
          return data.filter((item: DepartmentType) => {
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
