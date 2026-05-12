// employee-card-actions.tsx

import { Ban, Eye, GitBranch, Settings2, Trash2 } from 'lucide-react';

import type { Employee } from '@erp/data-access';

interface EmployeeCardActionsProps {
  employee: Employee;
  navigate: any;
  onDelete?: (id: string) => void;
  onBlock?: (id: string) => void;
  onOpenTemplate: (id: string, branch?: string) => void;
}

export const getEmployeeCardActions = ({
  employee,
  navigate,
  onDelete,
  onBlock,
  onOpenTemplate,
}: EmployeeCardActionsProps) => {
  return [
    {
      label: (
        <div className="flex gap-1 items-center">
          <Eye className="w-4 h-4" />
          <span>View</span>
        </div>
      ),
      onClick: () =>
        navigate({
          to: '/employee/employee-details/$id',
          params: { id: employee.id },
        }),
    },

    {
      label: (
        <div className="flex gap-1 items-center">
          <Settings2 className="w-4 h-4" />
          <span>Access Template</span>
        </div>
      ),
      onClick: () => onOpenTemplate(employee.id, employee.branch),
    },

    {
      label: (
        <div className="flex gap-1 items-center">
          <GitBranch className="w-4 h-4" />
          <span>Approver</span>
        </div>
      ),
      onClick: () =>
        navigate({
          to: '/employee/assign-approval/$id',
          params: { id: employee.id },
        }),
    },

    {
      label: (
        <div className="flex gap-1 items-center">
          <Ban className="w-4 h-4" />
          <span>Block</span>
        </div>
      ),
      onClick: () => onBlock?.(employee.id),
    },

    {
      label: (
        <div className="flex gap-1 items-center">
          <Trash2 className="w-4 h-4 text-red-500" />
          <span className="text-red-500">Delete</span>
        </div>
      ),
      onClick: () => onDelete?.(employee.id),
      className: ' border-t border-t-border',
    },
  ];
};
