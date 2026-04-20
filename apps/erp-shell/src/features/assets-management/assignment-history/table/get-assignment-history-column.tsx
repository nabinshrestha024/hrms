import { Badge, DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { AssetType } from '../../schema/AllAssetsData';

export function getAssignmentHistoryColumns(): ColumnDef<AssetType, unknown>[] {
  return [
    {
      accessorKey: 'assetName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Asssets Name" />
      ),
      cell: ({ row }) => <>{row.getValue('assetName')}</>,
    },
    {
      accessorKey: 'assignedTo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assigned To" />
      ),
      cell: ({ row }) => <>{row.getValue('assignedTo')}</>,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => <>{row.getValue('date')}</>,
    },

    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('status');
        return (
          value === 'Assigned' && <Badge variant="primary">Assigned</Badge>
        );
      },
    },
  ];
}
