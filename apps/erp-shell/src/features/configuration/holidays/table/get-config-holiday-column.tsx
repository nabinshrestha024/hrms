import { DataTableColumnHeader } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { IconButton } from '../../../../components/icon-button';
import { Edit, Trash2 } from 'lucide-react';
import { HolidayTableType } from '../../schema/HolidayData';

export function getConfigurationHolidayColumn(): ColumnDef<HolidayTableType>[] {
  return [
    {
      id: 'name',
      accessorFn: (row) => `${row.name} ${row.description}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Holiday" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.original.name}
          <span className="truncate text-[12px] font-normal leading-4">
            {row.original.description}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => <>{row.getValue('date')}</>,
    },
    {
      accessorKey: 'day',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Days" />
      ),
      cell: ({ row }) => <>{row.getValue('day')}</>,
    },

    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Types" />
      ),
      cell: ({ row }) => <>{row.getValue('type')}</>,
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
