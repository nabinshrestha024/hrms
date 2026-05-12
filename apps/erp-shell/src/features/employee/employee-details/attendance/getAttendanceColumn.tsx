import { Badge, DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import type { Attendance } from '../../schema/attendance-table-data';

export function getAttendanceColumns(): ColumnDef<Attendance>[] {
  return [
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      meta: {
        className: 'sticky left-0 z-20 bg-white',
        headerClassName: 'sticky left-0  z-30 bg-card',
      },
      cell: ({ row }) => (
        <div className="cursor-pointer ">{row.getValue('date')}</div>
      ),
    },

    {
      accessorKey: 'day',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Day" />
      ),
      meta: {
        className: 'sticky left-[115px] z-20 bg-white',
        headerClassName: 'sticky left-[115px]  z-30 bg-card',
      },
      cell: ({ row }) => (
        <div className="cursor-pointer">{row.getValue('day')}</div>
      ),
    },

    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('status') as boolean;

        return (
          <>
            {value ? (
              <Badge variant="secondary">Active</Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )}
          </>
        );
      },
    },

    {
      accessorKey: 'checkIn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Check In" />
      ),
      cell: ({ row }) => <>{row.getValue('checkIn')}</>,
    },

    {
      accessorKey: 'checkout',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Check Out"
          className="w-20 text-[14px] font-semibold leading-5"
        />
      ),
      cell: ({ row }) => <>{row.getValue('checkout')}</>,
    },

    {
      accessorKey: 'workingHours',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Working Hours" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer truncate">
          {row.getValue('workingHours')}
        </div>
      ),
    },

    {
      accessorKey: 'late',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Late (mins)" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer">{row.getValue('late')}</div>
      ),
    },

    {
      accessorKey: 'earlyLeave',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Early leave" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer ">{row.getValue('earlyLeave')}</div>
      ),
    },

    {
      accessorKey: 'otIn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OT In" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer ">{row.getValue('otIn')}</div>
      ),
    },

    {
      accessorKey: 'otOut',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OT Out" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer ">{row.getValue('otOut')}</div>
      ),
    },

    {
      accessorKey: 'overtime',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Overtime Hours" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer ">{row.getValue('overtime')}</div>
      ),
    },

    {
      accessorKey: 'event',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Events" />
      ),
      cell: ({ row }) => <>{row.getValue('event')}</>,
    },

    {
      accessorKey: 'remarks',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Remarks" />
      ),
      cell: ({ row }) => <>{row.getValue('remarks')}</>,
    },
  ];
}
