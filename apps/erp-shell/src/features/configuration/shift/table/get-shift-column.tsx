import { type Shift } from '@erp/data-access';
import { Badge, DataTableColumnHeader, Switch } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
import { getShiftIcon } from '../shift-icon';

/**
 * Format a shift time range for display, e.g. "06:00-14:00".
 */
function formatTimeRange(start: string, end: string): string {
  return `${start}-${end}`;
}

export function getShiftColumn(): ColumnDef<Shift>[] {
  return [
    {
      id: 'name',
      accessorFn: (row) => `${row.name} ${row.code}`,
      header: ({ column }) => (
        // Header label kept as "Holiday" per the original design.
        <DataTableColumnHeader column={column} title="Holiday" />
      ),
      cell: ({ row }) => {
        const Icon = getShiftIcon(row.original.shiftType);
        return (
          <div className="flex gap-2 items-center">
            <IconButton variant="shift">
              <Icon className="w-4 h-4" />
            </IconButton>
            <div className="flex flex-col items-start">
              {row.original.name}
              <span className="text-[12px] font-normal leading-4">
                {row.original.code}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: 'timing',
      accessorFn: (row) =>
        `${formatTimeRange(row.startTime, row.endTime)} ${
          row.gracePeriodMinutes
        }`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Holiday" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          {formatTimeRange(row.original.startTime, row.original.endTime)}
          <span className="text-[12px] font-normal leading-4">
            {row.original.gracePeriodMinutes} min grace
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'breakMinutes',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Break" />
      ),
      cell: ({ row }) => <>{row.original.breakMinutes} min</>,
    },
    {
      // Working hours derived from start/end (no DST handling — shifts
      // crossing midnight are normalised by adding 24h when end < start).
      id: 'workingHours',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Working Hours" />
      ),
      cell: ({ row }) => {
        const [sh, sm] = row.original.startTime.split(':').map(Number);
        const [eh, em] = row.original.endTime.split(':').map(Number);
        let mins = eh * 60 + em - (sh * 60 + sm);
        if (mins <= 0) mins += 24 * 60;
        const totalHours = (mins - row.original.breakMinutes) / 60;
        return <>{totalHours.toFixed(1)} hrs</>;
      },
    },
    {
      accessorKey: 'applicableDays',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Days" />
      ),
      cell: ({ row }) => {
        const days = row.getValue('applicableDays') as string[];
        return (
          <div className="grid grid-cols-3 gap-1">
            {days.map((day, index) => (
              <Badge
                key={index}
                variant="default"
                className="px-2 py-0.5 w-10.5 flex justify-center items-center capitalize"
              >
                {day}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => (
        // Header lower-cased per the original design.
        <DataTableColumnHeader column={column} title="status" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer flex items-center justify-center gap-1">
          <Switch checked={row.original.isActive} />
        </div>
      ),
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
