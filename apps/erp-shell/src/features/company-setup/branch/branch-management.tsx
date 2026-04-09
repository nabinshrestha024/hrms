import { PageHeader } from '../../../components/page-header';
import { BranchCard } from './branch-card';
import { BranchForm } from './branch-form';
import { Branch, BranchData } from './branch-table/branch-data';
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
  const data: Branch[] = BranchData;
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
        renderCard={(filtered) => <BranchCard data={filtered} />}
        renderTable={(filtered) => <BranchTable data={filtered} />}
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
