import type { Employee } from '@erp/data-access';
import { ActionDropdown, ControlledFormDialog, HRCard } from '@erp/ui';
import { Dot, EllipsisVertical } from 'lucide-react';

import { InitialsCard } from '../../components/initial-avatar';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AssignAccessTemplateForm } from './assign-template/assign-access-template-form';
import { getEmployeeCardActions } from './schema/employee-card-action-data';

interface EmployeeCardProps {
  data: Employee[];
  onDelete?: (id: string) => void;
  onBlock?: (id: string) => void;
}

export const EmployeeCard = ({
  data,
  onDelete,
  onBlock,
}: EmployeeCardProps) => {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedEmployeeBranch, setSelectedEmployeeBranch] =
    useState<string>();

  const handleOpenTemplate = (id: string, branch?: string) => {
    setSelectedEmployeeBranch(branch);
    setTemplateDialogOpen(true);
  };

  return (
    <>
      <div className="px-3 xl:px-6 pb-19.5 bg-background">
        <HRCard
          cardClassName="border-none p-3 xl:p-6 rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          cardContentClassName="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-0"
        >
          {data.length > 0 ? (
            <>
              {data.map((employee, index) => {
                const fullName = `${employee.firstName} ${employee.lastName}`;
                const isActive = employee.status === 'active';

                return (
                  <HRCard
                    key={employee.id}
                    cardClassName="relative p-4 border border-border rounded-xl bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                    cardContentClassName="flex flex-col gap-4 p-0"
                  >
                    <div className="flex gap-2 items-center">
                      <InitialsCard name={fullName} className="w-12 h-12" />

                      <div className="flex-1">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-foreground text-[16px] font-medium leading-5">
                              {fullName}
                            </span>

                            <ActionDropdown
                              open={openDropdown === index}
                              onOpenChange={(isOpen) =>
                                setOpenDropdown(isOpen ? index : null)
                              }
                              trigger={
                                <div className="flex items-center text-[14px] font-normal cursor-pointer">
                                  <EllipsisVertical className="w-4 h-4 text-secondary-foreground" />
                                </div>
                              }
                              dropdownClassName="px-0"
                              actions={getEmployeeCardActions({
                                employee,
                                navigate,
                                onDelete,
                                onBlock,
                                onOpenTemplate: handleOpenTemplate,
                              })}
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-secondary-foreground text-[16px] font-medium leading-5 whitespace-nowrap line-clamp-1">
                              {employee.email}
                            </span>

                            <span className="text-secondary-foreground text-[16px] font-medium leading-5">
                              {employee.designation}
                            </span>

                            <span
                              className={`flex items-center text-secondary-foreground text-[16px] font-medium leading-5 ${
                                isActive ? 'text-badge-text-2' : ''
                              }`}
                            >
                              <Dot
                                className={`w-6 h-6 ${
                                  isActive
                                    ? 'text-badge-text-2'
                                    : 'text-foreground'
                                }`}
                              />
                              {isActive ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </HRCard>
                );
              })}
            </>
          ) : (
            <div className="text-[14px] text-secondary-foreground flex items-center justify-center">
              Employee Not found
            </div>
          )}
        </HRCard>
      </div>

      <ControlledFormDialog
        open={templateDialogOpen}
        onOpenChange={setTemplateDialogOpen}
        title="Assign Access Template"
        size="lg"
        formId="assign-role-form"
        cancelText="Cancel"
        okText="Save Changes"
        dialogClassName="sm:max-w-[465px]"
      >
        <AssignAccessTemplateForm
          onSuccess={() => {
            setTemplateDialogOpen(false);
          }}
          employeeBranch={selectedEmployeeBranch}
        />
      </ControlledFormDialog>
    </>
  );
};
