import type { ColumnDef } from '@tanstack/react-table';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import type { AttendanceStatus, WorkRecord } from '../schema/WorkRecordData';
import { DataTableColumnHeader } from '@erp/ui';

const statusConfig: Record<
  AttendanceStatus,
  { label: string; className: string }
> = {
  P: { label: 'P', className: 'text-green-600 bg-[#DCFCE7]' },
  A: { label: 'A', className: 'text-red-600 bg-[#FFE2E2]' },
  L: { label: 'L', className: 'text-blue-600 bg-[#DBEAFE]' },
  H: { label: '-', className: 'text-gray-400 bg-[#F4F4F5]' },
};

export function getWorkRecordColumn(): ColumnDef<WorkRecord>[] {
  const now = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  });

  const dayColumns: ColumnDef<WorkRecord>[] = days.map((day) => {
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;

    return {
      id: format(day, 'yyyy-MM-dd'),
      accessorFn: (row) => row.attendance?.[format(day, 'yyyy-MM-dd')],
      header: () => (
        <div className="text-center text-[12px] flex flex-col">
          <span
            className={`font-medium leading-4 ${
              isWeekend ? 'text-[#FF6467]' : 'text-secondary-foreground'
            }`}
          >
            {format(day, 'MMM')}
          </span>
          <span
            className={`font-semibold leading-5 ${
              isWeekend ? 'text-[#E7000B]' : 'text-foreground'
            }`}
          >
            {format(day, 'd')}
          </span>
        </div>
      ),
      meta: {
        className: 'p-0',
      },
      cell: ({ getValue }) => {
        const status = getValue() as AttendanceStatus;
        const config = statusConfig[status];

        return (
          <div
            className={`p-4 text-center rounded-none ${
              config?.className ?? ''
            }`}
          >
            <span>{config?.label ?? '-'}</span>
          </div>
        );
      },
    };
  });

  return [
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      meta: {
        className: 'sticky left-0 z-20 bg-white',
        headerClassName: 'sticky left-0  z-30 bg-[#FAFAFA]',
      },
      cell: ({ row }) => <>{row.getValue('employeeName')}</>,
    },
    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      meta: {
        className: 'sticky left-[168px] z-20 bg-white',
        headerClassName: 'sticky left-[168px]  z-30 bg-[#FAFAFA]',
      },
      cell: ({ row }) => <>{row.getValue('branch')}</>,
    },
    ...dayColumns,
  ];
}
