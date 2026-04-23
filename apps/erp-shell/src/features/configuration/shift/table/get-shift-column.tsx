import { Badge, DataTableColumnHeader, Switch } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { IconButton } from '../../../../components/icon-button';
import { Edit, Trash2 } from 'lucide-react';
import { ShiftDataType } from '../../schema/ShiftData';

export function getShiftColumn(): ColumnDef<ShiftDataType>[] {
  return [
    {
      id: 'title',
      accessorFn: (row) => `${row.title} ${row.code} ${row.icon}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Holiday" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <IconButton variant="shift">
            <row.original.icon className="w-4 h-4" />
          </IconButton>
          <div className="flex flex-col items-start">
            {row.original.title}
            <span className="text-[12px] font-normal leading-4">
              {row.original.code}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'timing',
      accessorFn: (row) => `${row.time} ${row.graceTime}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Holiday" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          {row.original.time}
          <span className="text-[12px] font-normal leading-4">
            {row.original.graceTime}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'break',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Break" />
      ),
      cell: ({ row }) => <>{row.getValue('break')}</>,
    },

    {
      accessorKey: 'workingHours',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Working Hours" />
      ),
      cell: ({ row }) => <>{row.getValue('workingHours')}</>,
    },
    {
      accessorKey: 'days',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Days" />
      ),
      cell: ({ row }) => {
        const days = row.getValue('days') as string[];

        return (
          <div className="grid grid-cols-3 gap-1">
            {days.map((day, index) => (
              <Badge
                key={index}
                variant="default"
                className="px-2 py-0.5 w-10.5 flex justify-center items-center"
              >
                {day}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="status" />
      ),
      cell: ({ row }) => {
        const value = Boolean(row.getValue('status'));

        return (
          <div className="cursor-pointer flex items-center justify-center gap-1">
            <Switch checked={value} />
          </div>
        );
      },
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
