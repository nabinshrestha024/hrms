import { type Holiday } from '@erp/data-access';
import { DataTableColumnHeader } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';

/**
 * Day-of-week derived from a YYYY-MM-DD date string. Defensive against
 * malformed dates — returns "—" rather than throwing.
 */
function dayOfWeek(date: string): string {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return '—';
  return parsed.toLocaleDateString('en-US', { weekday: 'long' });
}

export function getConfigurationHolidayColumn(): ColumnDef<Holiday>[] {
  return [
    {
      id: 'name',
      accessorFn: (row) => `${row.name} ${row.description ?? ''}`,
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
      // Day-of-week is derived from `date` rather than stored — keeping
      // the column id `day` so downstream filters/sorts stay stable.
      id: 'day',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Days" />
      ),
      cell: ({ row }) => <>{dayOfWeek(row.original.date)}</>,
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
