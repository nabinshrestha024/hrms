import { Can, PERM_SUBJECTS } from '@erp/auth';
import { Badge, DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import type { Branch } from '@erp/data-access';
import { IconButton } from '../../../../components/icon-button';

interface ColumnActions {
  onEdit?: (branch: Branch) => void;
  onDelete?: (id: string) => void;
}

export function getBranchColumns(
  actions?: ColumnActions
): ColumnDef<Branch, unknown>[] {
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
      cell: ({ row }) => <>{row.getValue('createdDate')}</>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('status');
        return value === 'Active' ? (
          <Badge variant="secondary">Active</Badge>
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
      cell: ({ row }) => (
        <div className="flex gap-2 items-center justify-center">
          <Can action="update" subject={PERM_SUBJECTS.HR_BRANCHES}>
            <IconButton
              type="button"
              aria-label="Edit branch"
              variant="default"
              onClick={() => actions?.onEdit?.(row.original)}
            >
              <Edit className="w-4 h-4 text-black font-bold" />
            </IconButton>
          </Can>
          <Can action="delete" subject={PERM_SUBJECTS.HR_BRANCHES}>
            <IconButton
              type="button"
              variant="destructive"
              aria-label="Delete branch"
              onClick={() => actions?.onDelete?.(row.original.id)}
            >
              <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
            </IconButton>
          </Can>
        </div>
      ),
    },
  ];
}
