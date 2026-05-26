import { type MissingDocument } from '@erp/data-access';
import { Badge, Button, DataTableColumnHeader, FormDialog } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { MissingDocumentCard } from '../missing-document-card';
import { UserCard } from '../../../../components/user-card';

export function getMissingDocumentColumns(): ColumnDef<
  MissingDocument,
  unknown
>[] {
  return [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Id" />
      ),
      meta: {
        className: 'sticky left-0 z-20 bg-white',
        headerClassName: 'sticky left-0  z-30 bg-card',
      },
      cell: ({ row }) => <>{row.getValue('employeeId')}</>,
    },
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      meta: {
        className: ' md:sticky md:left-[125px] md:z-20 md:bg-white',
        headerClassName: ' md:sticky md:left-[125px]  md:z-30 md:bg-card',
      },
      cell: ({ row }) => <>{row.getValue('employeeName')}</>,
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => <>{row.getValue('department')}</>,
    },
    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <>{row.getValue('branch')}</>,
    },
    {
      id: 'missingDocument',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Missing Document" />
      ),
      cell: ({ row }) => <>{row.original.missingDocs.length}</>,
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const value = row.original.priority;

        if (value === 'low') return <Badge variant="default">Low</Badge>;
        if (value === 'high') return <Badge variant="destructive">High</Badge>;
        if (value === 'medium') return <Badge variant="warning">Medium</Badge>;

        return null;
      },
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const id = row.original.employeeId;
        return (
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="default"
                className="rounded-sm p-1 w-6 h-6"
              >
                <Eye className="w-4 h-4 text-foreground" />
              </Button>
            }
            title={
              <UserCard
                employeeId={row.original.employeeId}
                employeeName={row.original.employeeName}
                department={row.original.department}
                className="rounded-none bg-tansparent"
              />
            }
            size="lg"
            formId="missing-document-card"
            okText="Send Reminder"
            cancelText="Cancel"
            componentClassName="border-none shadow-none p-0 rounded-none bg-background mt-0"
            dialogClassName="sm:max-w-[465px] gap-4"
          >
            {({ close }: { close: () => void }) => (
              <MissingDocumentCard id={id} onSuccess={close} />
            )}
          </FormDialog>
        );
      },
    },
  ];
}
