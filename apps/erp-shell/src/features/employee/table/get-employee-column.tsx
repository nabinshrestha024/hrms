import type { Employee } from '@erp/data-access';
import { Badge, DataTableColumnHeader, FormDialog } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { Ban, Eye, GitBranch, Settings2, Trash2 } from 'lucide-react';
import { AssignAccessTemplateForm } from '../assign-template/assign-access-template-form';
import { IconButton } from '../../../components/icon-button';
interface ColumnActions {
  onBlock?: (id: string) => void;
  onDelete?: (id: string) => void;
}
interface ColumnsProps {
  navigate: ReturnType<typeof useNavigate>;
  actions?: ColumnActions;
}

export function getEmployeeColumns({
  actions,
  navigate,
}: ColumnsProps): ColumnDef<Employee>[] {
  return [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Id" />
      ),
      meta: {
        className: 'sticky left-0 z-20 bg-white',
        headerClassName: 'sticky left-0  z-30 bg-card',
      },
      cell: ({ row }) => <>{row.original.employeeId ?? row.original.id}</>,
    },
    {
      id: 'name',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      meta: {
        className: 'md:sticky left-[143px] z-20 bg-white',
        headerClassName: 'md:sticky left-[143px]  z-30 bg-card',
      },
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
        const branch = row.original.branch;
        return (
          <div className="flex gap-3 items-center">
            <IconButton
              type="button"
              variant="default"
              onClick={() =>
                navigate({
                  to: '/employee/employee-details/$id',
                  params: { id },
                })
              }
            >
              <Eye className="text-[16px]" />
            </IconButton>
            <FormDialog
              trigger={
                <IconButton type="button" variant="default">
                  <Settings2 className="text-[16px]" />
                </IconButton>
              }
              title="Assign Access Template"
              size="lg"
              formId="assign-role-form"
              cancelText="Cancel"
              okText="Save Changes"
              dialogClassName="sm:max-w-[465px]"
            >
              {({ close }: { close: () => void }) => (
                <AssignAccessTemplateForm
                  onSuccess={close}
                  employeeBranch={branch}
                />
              )}
            </FormDialog>
            <IconButton
              type="button"
              variant="default"
              onClick={() =>
                navigate({
                  to: '/employee/assign-approval/$id',
                  params: { id },
                })
              }
            >
              <GitBranch className="text-[16px]" />
            </IconButton>
            <IconButton
              type="button"
              variant="default"
              onClick={() => actions?.onBlock?.(id)}
            >
              <Ban className="text-[16px]" />
            </IconButton>
            <IconButton
              type="button"
              variant="destructive"
              onClick={() => actions?.onDelete?.(id)}
            >
              <Trash2 className="text-badge-text-3" />
            </IconButton>
          </div>
        );
      },
    },
  ];
}
