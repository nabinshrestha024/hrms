import type { ColumnDef } from '@tanstack/react-table';
import type { AttendanceListRecord } from '../../schema/AttendanceListData';
import { Badge, DataTableColumnHeader } from '@erp/ui';
import { IconButton } from '../../../../components/icon-button';
import { Check, X } from 'lucide-react';

export function getOverTimeAttendanceColumn(): ColumnDef<AttendanceListRecord>[] {
  return [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee ID" />
      ),
      meta: {
        className: 'sticky left-0 z-20 bg-white',
        headerClassName: 'sticky left-0  z-30 bg-[#FAFAFA]',
      },
      cell: ({ row }) => <>{row.getValue('employeeId')}</>,
    },
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      meta: {
        className: 'sticky left-[143px] z-20 bg-white',
        headerClassName: 'sticky left-[143px]  z-30 bg-[#FAFAFA]',
      },
      cell: ({ row }) => <>{row.getValue('employeeName')}</>,
    },
    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <>{row.getValue('branch')}</>,
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
        <DataTableColumnHeader column={column} title="Day" />
      ),
      cell: ({ row }) => <>{row.getValue('day')}</>,
    },
    {
      accessorKey: 'shift',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Shift" />
      ),
      cell: ({ row }) => <>{row.getValue('shift')}</>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: (info) => {
        const value = info.getValue();

        return (
          <div
            className={`px-3 py-0.5 rounded-[400px] text-[14px] font-semibold leading-4 `}
          >
            {value ? (
              <Badge variant="secondary">Present </Badge>
            ) : (
              <Badge variant="destructive">Absent</Badge>
            )}
          </div>
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
      accessorKey: 'checkOut',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Check Out" />
      ),
      cell: ({ row }) => <>{row.getValue('checkOut')}</>,
    },
    {
      accessorKey: 'workingHour',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Working Hours" />
      ),
      cell: ({ row }) => <>{row.getValue('workingHour')}</>,
    },
    {
      accessorKey: 'late',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Late (min)" />
      ),
      cell: ({ row }) => <>{row.getValue('late')}</>,
    },
    {
      accessorKey: 'OTIn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OT In" />
      ),
      cell: ({ row }) => <>{row.getValue('OTIn')}</>,
    },
    {
      accessorKey: 'otOut',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OT Out" />
      ),
      cell: ({ row }) => <>{row.getValue('otOut')}</>,
    },
    {
      accessorKey: 'overTimeHours',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Overtime Hours" />
      ),
      cell: ({ row }) => <>{row.getValue('overTimeHours')}</>,
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
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: () => (
        <div className="flex items-center gap-2">
          <IconButton variant="secondary">
            <Check className="w-4 h-4 text-green-600 " />
          </IconButton>
          <IconButton variant="destructive">
            <X className="w-4 h-4 text-red-600" />
          </IconButton>
        </div>
      ),
    },
  ];
}
