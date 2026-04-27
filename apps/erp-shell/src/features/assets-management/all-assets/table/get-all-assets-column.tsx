import { type Asset } from '@erp/data-access';
import { Badge, DataTableColumnHeader, FormDialog } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Redo2, Trash2, UserRoundPlus } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
import { ReturnAssetsForm } from '../return-assets-form';
import { AssignAssetsForm } from '../assign-assets-form';

const STATUS_LABEL: Record<Asset['status'], string> = {
  available: 'Available',
  assigned: 'Assigned',
  maintenance: 'Maintenance',
  retired: 'Retired',
};

const CONDITION_LABEL: Record<Asset['condition'], string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
};

export function getAssetsColumns(): ColumnDef<Asset, unknown>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        // Header preserved per the original design (typo "Asssets" preserved).
        <DataTableColumnHeader column={column} title="Asssets Name" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => <>{row.getValue('category')}</>,
    },
    {
      accessorKey: 'serialNumber',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Serial Number" />
      ),
      cell: ({ row }) => <>{row.getValue('serialNumber')}</>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) =>
        row.original.status === 'assigned' ? (
          <Badge variant="primary">Assigned</Badge>
        ) : (
          <Badge variant="secondary">{STATUS_LABEL[row.original.status]}</Badge>
        ),
    },
    {
      accessorKey: 'assignedTo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assigned To" />
      ),
      cell: ({ row }) => <>{row.getValue('assignedTo') ?? '—'}</>,
    },
    {
      accessorKey: 'condition',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Condition" />
      ),
      cell: ({ row }) => <>{CONDITION_LABEL[row.original.condition]}</>,
    },
    {
      accessorKey: 'value',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Value" />
      ),
      cell: ({ row }) => <>{row.getValue('value')}</>,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const isAssigned = row.original.status === 'assigned';
        return (
          <div className="flex gap-2 items-center justify-center">
            <IconButton variant="default">
              <Eye className="w-4 h-4 " />
            </IconButton>
            {isAssigned ? (
              <FormDialog
                trigger={
                  <IconButton variant="default">
                    <Redo2 className="w-4 h-4 " />
                  </IconButton>
                }
                title="Return Assets "
                okText="Add"
                size="lg"
                cancelText="Cancel"
                formId="return-assets-form"
                componentClassName="py-4 pl-4 pr-2"
              >
                {({ close }: { close: () => void }) => (
                  <ReturnAssetsForm
                    assetId={row.original.id}
                    onSuccess={close}
                  />
                )}
              </FormDialog>
            ) : (
              <FormDialog
                trigger={
                  <IconButton variant="default">
                    <UserRoundPlus className="w-4 h-4 " />
                  </IconButton>
                }
                title="Assign Assets "
                okText="Add"
                size="lg"
                cancelText="Cancel"
                formId="assign-assets-form"
                componentClassName="py-4 pl-4 pr-2"
              >
                {({ close }: { close: () => void }) => (
                  <AssignAssetsForm
                    assetId={row.original.id}
                    assetName={row.original.name}
                    onSuccess={close}
                  />
                )}
              </FormDialog>
            )}
            <IconButton variant="destructive">
              <Trash2 className="w-4 h-4 " />
            </IconButton>
          </div>
        );
      },
    },
  ];
}
