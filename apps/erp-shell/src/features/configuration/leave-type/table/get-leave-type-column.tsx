import { DataTableColumnHeader } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ConfigurationLeaveType } from '../../schema/LeaveTypeData';
import { IconButton } from '../../../../components/icon-button';
import { Edit, Trash2 } from 'lucide-react';

export function getConfigurationLeaveTypeColumn(): ColumnDef<ConfigurationLeaveType>[] {
  return [
    {
      accessorKey: 'leaveType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Leave Type" />
      ),
      cell: ({ row }) => <>{row.getValue('leaveType')}</>,
    },
    {
      accessorKey: 'days',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Days" />
      ),
      cell: ({ row }) => <>{row.getValue('days')}</>,
    },
    {
      accessorKey: 'applicableTo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Applicable To" />
      ),
      cell: ({ row }) => <>{row.getValue('applicableTo')}</>,
    },
    {
      accessorKey: 'carryOver',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Carry Over" />
      ),
      cell: ({ row }) => <>{row.getValue('carryOver')}</>,
    },
    {
      accessorKey: 'encashable',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Encashable" />
      ),
      cell: ({ row }) => <>{row.getValue('encashable')}</>,
    },
    {
      accessorKey: 'paid',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paid" />
      ),
      cell: ({ row }) => <>{row.getValue('paid')}</>,
    },

    {
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="flex items-center gap-2 justify-center">
          <IconButton variant="default">
            <Edit className="w-4 h-4" />
          </IconButton>
          <IconButton variant="destructive">
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </div>
      ),
    },
  ];
}
