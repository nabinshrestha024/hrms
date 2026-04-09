import { Badge, DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { Branch } from '../../../../features/company-setup/schema/BranchData';

export function getBranchColumns(): ColumnDef<Branch, unknown>[] {
  return [
    {
      accessorKey: 'branchId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch Id" />
      ),
      cell: ({ row }) => <>{row.getValue('branchId')}</>,
    },

    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <>{row.getValue('branch')}</>,
    },

    {
      accessorKey: 'location',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => <>{row.getValue('location')}</>,
    },
    {
      accessorKey: 'contact',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact" />
      ),
      cell: ({ row }) => <>{row.getValue('contact')}</>,
    },

    {
      accessorKey: 'createdDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => {
        return <>{row.getValue('createdDate')}</>;
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('status');

        return (
          <>
            {value === 'Active' ? (
              <Badge variant="secondary">Active</Badge>
            ) : (
              <Badge variant="destructive">InActive</Badge>
            )}
          </>
        );
      },
    },

    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: () => (
        <div className="flex gap-2 items-center justify-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-muted p-1">
            <Edit className="w-4 h-4 text-black font-bold" />
          </div>

          <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-chart-3 p-1">
            <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
          </div>
        </div>
      ),
    },
  ];
}
