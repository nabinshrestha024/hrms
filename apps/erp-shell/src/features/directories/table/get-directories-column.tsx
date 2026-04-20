import { DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { DirectoriesType } from '../schema/Directories';

export function getDirectoriesColumns(): ColumnDef<DirectoriesType, unknown>[] {
  return [
    {
      accessorKey: 'employeeID',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Id" />
      ),
      cell: ({ row }) => <>{row.original.employeeID}</>,
    },
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => <>{row.original.employeeName}</>,
    },

    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <>{row.original.branch ?? '-'}</>,
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => <>{row.getValue('department')}</>,
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
      accessorKey: 'jobLevel',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Level" />
      ),
      cell: ({ row }) => <>{row.original.jobLevel ?? '-'}</>,
    },
    {
      accessorKey: 'contact',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact" />
      ),
      cell: ({ row }) => <>{row.original.contact ?? '-'}</>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="w-30 truncate">{row.original.email ?? '-'}</div>
      ),
    },
  ];
}
