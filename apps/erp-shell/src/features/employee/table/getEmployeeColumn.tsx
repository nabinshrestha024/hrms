import { Badge, Button, DataTableColumnHeader } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { Ban, Eye, GitBranch, Settings2, Trash2 } from 'lucide-react';
import { Employee } from '../schema/EmployeeData';
import { AssignAccessTemplateForm } from '../assign-template/assign-access-template-form';

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
    dialogClassName?: string;
    onCancel?: () => void;
  }) => void;
}

interface ColumnsProps {
  onOpen: GetColumnsProps['onOpen'];
  navigate: ReturnType<typeof useNavigate>;
}

export function getEmployeeColumns({
  onOpen,
  navigate,
}: ColumnsProps): ColumnDef<Employee>[] {
  return [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Id" />
      ),
      cell: ({ row }) => <>{row.getValue('employeeId')}</>,
    },

    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => {
        const employeeId = row.original.employeeId;

        return (
          <div
            className="cursor-pointer hover:underline"
            onClick={() =>
              navigate({
                to: `/employee/personalInformation/${employeeId}`,
              })
            }
          >
            {row.getValue('name')}
          </div>
        );
      },
    },

    {
      accessorKey: 'department',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer">{row.getValue('department')}</div>
      ),
    },

    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer ">{row.getValue('branch')}</div>
      ),
    },

    {
      accessorKey: 'jobLevel',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Level" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer text-left">
          {row.getValue('jobLevel')}
        </div>
      ),
    },

    {
      accessorKey: 'designation',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Designation" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer truncate">
          {row.getValue('designation')}
        </div>
      ),
    },

    {
      accessorKey: 'joiningDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joining Date" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer">
          {row.getValue('joiningDate') ?? '-'}
        </div>
      ),
    },

    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer ">{row.getValue('phone')}</div>
      ),
    },

    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('status');

        return (
          <div className={`px-3 py-0.5 text-center rounded-[400px]}`}>
            {value ? (
              <Badge variant="secondary">Active</Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )}
          </div>
        );
      },
    },

    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const employeeId = row.original.employeeId;

        return (
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              className="rounded-sm p-1 w-6 h-6"
              onClick={() =>
                navigate({
                  to: '/employee/employee-details/$id',
                  params: { id: employeeId },
                })
              }
            >
              <Eye className="text-[16px]" />
            </Button>

            <Button
              type="button"
              className="rounded-sm p-1 w-6 h-6"
              onClick={() =>
                onOpen({
                  modalTitle: 'Assign Access Template',
                  title: 'Assign Access Template',
                  okText: 'Save Changes',
                  size: 'lg',
                  cancelText: 'Cancel',
                  formId: 'assignTemplate',
                  dialogClassName: 'sm:max-w-[465px]',
                  component: <AssignAccessTemplateForm />,
                })
              }
            >
              <Settings2 className="text-[16px]" />
            </Button>

            <Button
              type="button"
              className="rounded-sm p-1 w-6 h-6"
              onClick={() =>
                navigate({
                  to: `/employee/assign-approval/$id`,
                  params: { id: employeeId },
                })
              }
            >
              <GitBranch className="text-[16px]" />
            </Button>

            <Button type="button" className="rounded-sm p-1 w-6 h-6">
              <Ban className="text-[16px]" />
            </Button>

            <Button type="button" className="rounded-sm p-1 w-6 h-6 bg-chart-3">
              <Trash2 className="text-badge-text-3" />
            </Button>
          </div>
        );
      },
    },
  ];
}
