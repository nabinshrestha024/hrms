import { type ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader, Badge } from '@erp/ui';
import { formatDate } from '@erp/utils';
import type { Employee } from '@erp/data-access';

export const statusConfig: Record<
  Employee['status'],
  { label: string; variant: 'success' | 'secondary' | 'warning' }
> = {
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'secondary' },
  on_leave: { label: 'On Leave', variant: 'warning' },
};

export const columns: ColumnDef<Employee, unknown>[] = [
  {
    accessorKey: 'employeeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee ID" />
    ),
    size: 90,
    enableSorting: true,
  },
  {
    id: 'name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
    cell: ({ row }) => (
      <span className="font-medium truncate block">
        {row.original.firstName} {row.original.lastName}
      </span>
    ),
    size: 140,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'department',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <span className="truncate block">{row.original.department}</span>
    ),
    size: 110,
    enableSorting: true,
  },
  {
    accessorKey: 'branch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    size: 100,
    enableSorting: true,
  },
  {
    accessorKey: 'jobLevel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Level" />
    ),
    size: 80,
    enableSorting: true,
  },
  {
    accessorKey: 'designation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => (
      <span className="truncate block">{row.original.designation}</span>
    ),
    size: 120,
    enableSorting: true,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joining Date" />
    ),
    cell: ({ row }) => formatDate(row.original.startDate, { format: 'medium' }),
    size: 100,
    enableSorting: true,
  },
  {
    id: 'contact',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => (
      <div className="min-w-0">
        <div className="text-sm truncate">{row.original.phone ?? '—'}</div>
        <div className="text-xs text-muted-foreground truncate">
          {row.original.email}
        </div>
      </div>
    ),
    size: 130,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const config = statusConfig[row.original.status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    size: 80,
    enableSorting: true,
  },
];
