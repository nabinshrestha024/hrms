import type { ColumnDef } from '@tanstack/react-table';
import type { LeaveLog } from '../../../Schema/LeaveLogData';
import { Badge } from '@erp/ui';

export function getLeaveLogColumn(): ColumnDef<LeaveLog>[] {
  return [
    {
      accessorKey: 'eventDate',
      header: 'Event Date',
      cell: ({ row }) => {
        return (
          <div className="text-[14px] font-medium ">
            {row.getValue('eventDate')}
          </div>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description ',
      cell: ({ row }) => (
        <div className="text-[14px] font-medium  tuncate ">
          {row.getValue('description')}
        </div>
      ),
    },
    {
      accessorKey: 'days',
      header: 'Days',
      cell: (info) => {
        const value = info.getValue() as string;

        const isIncrease = value.startsWith('+');

        return (
          <>
            {isIncrease ? (
              <Badge variant="secondary">{value}</Badge>
            ) : (
              <Badge variant="destructive">{value}</Badge>
            )}
          </>
        );
      },
    },
    {
      accessorKey: 'runningBalance',
      header: 'Running Balance ',
      cell: ({ row }) => (
        <div className="text-[14px] font-medium ">
          {row.getValue('runningBalance')}
        </div>
      ),
    },
  ];
}
