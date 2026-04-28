import type { Employee } from '@erp/data-access';
import { Badge, Button, DataTableColumnHeader, FormDialog } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { Ban, Eye, GitBranch, Settings2, Trash2 } from 'lucide-react';
import { AssignAccessTemplateForm } from '../assign-template/assign-access-template-form';

interface ColumnsProps {
  navigate: ReturnType<typeof useNavigate>;
}

export function getEmployeeColumns({
  navigate,
}: ColumnsProps): ColumnDef<Employee>[] {
  return [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Id" />
      ),
      cell: ({ row }) => <>{row.original.employeeId ?? row.original.id}</>,
    },
    {
      id: 'name',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div
            className="cursor-pointer hover:underline"
            onClick={() =>
              navigate({
                to: '/employee/employee-details/$id',
                params: { id },
              })
            }
          >
            {row.original.firstName} {row.original.lastName}
          </div>
        );
      },
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => <div>{row.getValue('department')}</div>,
    },
    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <div>{row.original.branch ?? '-'}</div>,
    },
    {
      accessorKey: 'jobLevel',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Level" />
      ),
      cell: ({ row }) => <div>{row.original.jobLevel ?? '-'}</div>,
    },
    {
      accessorKey: 'designation',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Designation" />
      ),
      cell: ({ row }) => (
        <div className="w-30 truncate">{row.getValue('designation')}</div>
      ),
    },
    {
      accessorKey: 'startDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joining Date" />
      ),
      cell: ({ row }) => <div>{row.original.startDate ?? '-'}</div>,
    },
    {
      id: 'Contact',
      accessorFn: (row) => `${row.phone} ${row.email}`,

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.original.phone}{' '}
          <span className="w-30 truncate text-[12px] font-normal leading-4">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.original.status;
        return value === 'active' ? (
          <Badge variant="secondary">Active</Badge>
        ) : value === 'on_leave' ? (
          <Badge variant="warning">On Leave</Badge>
        ) : (
          <Badge variant="destructive">Inactive</Badge>
        );
      },
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              className="rounded-sm p-1 w-6 h-6"
              onClick={() =>
                navigate({
                  to: '/employee/employee-details/$id',
                  params: { id },
                })
              }
            >
              <Eye className="text-[16px]" />
            </Button>
            <FormDialog
              trigger={
                <Button type="button" className="rounded-sm p-1 w-6 h-6">
                  <Settings2 className="text-[16px]" />
                </Button>
              }
              title="Assign Access Template"
              size="lg"
              formId="assign-role-form"
              cancelText="Cancel"
              okText="Save Changes"
              dialogClassName="sm:max-w-[465px]"
            >
              {({ close }: { close: () => void }) => (
                <AssignAccessTemplateForm onSuccess={close} />
              )}
            </FormDialog>
            <Button
              type="button"
              className="rounded-sm p-1 w-6 h-6"
              onClick={() =>
                navigate({
                  to: '/employee/assign-approval/$id',
                  params: { id },
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
