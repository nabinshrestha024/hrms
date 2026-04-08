import { BranchTable } from '../../../features/company-setup/Branch/BranchTable/BranchTAble';
import { PageHeader } from '../../../components/PageHeader';
import { BranchCard } from '../../../features/company-setup/Branch/BranchCard';
import { BranchForm } from '../../../features/company-setup/Branch/BranchForm';
import {
  Branch,
  BranchData,
} from '../../../features/company-setup/Branch/BranchTable/BranchData';

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
