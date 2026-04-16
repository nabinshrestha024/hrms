import type { ColumnDef } from '@tanstack/react-table';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { Badge, DataTableColumnHeader, FormDialog } from '@erp/ui';
import { TentTree, TimerReset } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
import { AddTimeRequestForm } from '../add-time-request-form';
import { AddLeaveRequestForm } from '../add-leave-request-form';

export function getMyAttendanceColumns(): ColumnDef<
  AttendanceListRecord,
  unknown
>[] {
  return [
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
        const value = info.getValue() as string;

        const isPresent = value?.toLowerCase() === 'present';
        const isLeave = value?.toLowerCase() === 'leave';
        const isOff = value?.toLowerCase() === 'off';

        return (
          <div
            className={`px-3 py-0.5 rounded-[400px] text-[14px] font-semibold leading-4 text-center `}
          >
            {isPresent && <Badge variant="secondary">Present </Badge>}
            {isLeave && <Badge variant="destructive">Absent</Badge>}
            {isOff && <Badge variant="default">Off</Badge>}
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
      accessorKey: 'earlyLeave',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Early Leave" />
      ),
      cell: ({ row }) => <>{row.getValue('earlyLeave')}</>,
    },
    {
      accessorKey: 'oTIn',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OT In" />
      ),
      cell: ({ row }) => <>{row.getValue('oTIn')}</>,
    },
    {
      accessorKey: 'otOut',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OT Out" />
      ),
      cell: ({ row }) => <>{row.getValue('otOut')}</>,
    },
    {
      accessorKey: 'overtime',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Overtime Hours" />
      ),
      cell: ({ row }) => <>{row.getValue('overtime')}</>,
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
      header: 'Action',
      cell: () => (
        <div className="flex items-center gap-2">
          <FormDialog
            trigger={
              <IconButton variant="default">
                <TimerReset className="text-[16px] text-foreground" />
              </IconButton>
            }
            title="Add Time Request"
            okText="Add"
            size="lg"
            cancelText="Cancel"
            formId="add-time-request-form"
            dialogClassName="sm:max-w-[709px]"
            componentClassName="py-4 pl-4 pr-2"
          >
            {({ close }: { close: () => void }) => (
              <AddTimeRequestForm onSuccess={close} />
            )}
          </FormDialog>

          <FormDialog
            trigger={
              <IconButton variant="default">
                <TentTree className="text-[16px] text-foreground" />
              </IconButton>
            }
            title="Add Leave Request"
            okText="Add"
            size="lg"
            cancelText="Cancel"
            formId="add-leave-request-form"
            componentClassName="py-4 pl-4 pr-2"
          >
            {({ close }: { close: () => void }) => (
              <AddLeaveRequestForm onSuccess={close} />
            )}
          </FormDialog>
        </div>
      ),
    },
  ];
}
