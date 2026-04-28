import { DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';
import { IconButton } from '../../../../../../components/icon-button';
import { TaxConfigurationType } from '../../../../schema/TaxSlabsData';

export function getTaxConfigurationColumns(): ColumnDef<TaxConfigurationType>[] {
  return [
    {
      accessorKey: 'minAmount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Min Amount" />
      ),
      cell: ({ row }) => <>{row.getValue('minAmount')}</>,
    },
    {
      accessorKey: 'maxAmount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Max Amount" />
      ),
      cell: ({ row }) => <>{row.getValue('maxAmount')}</>,
    },
    {
      accessorKey: 'rate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tax Rate" />
      ),
      cell: ({ row }) => <>{row.getValue('rate')}</>,
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => <>{row.getValue('description')}</>,
    },

    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        return (
          <IconButton variant="destructive">
            <Trash2 className="w-4 h-4" />
          </IconButton>
        );
      },
    },
  ];
}
