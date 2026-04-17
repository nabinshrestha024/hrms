import { Badge, Button, DataTableColumnHeader, FormDialog } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { MissingDocumentType } from '../../schema/MissingDocumnetData';
import { MissingDocumentCard } from '../missing-document-card';
import { UserCard } from '../../../../components/user-card';

export function getMissingDocumentColumns(): ColumnDef<
  MissingDocumentType,
  unknown
>[] {
  return [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Id" />
      ),
      cell: ({ row }) => <>{row.getValue('employeeId')}</>,
    },
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
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
      accessorKey: 'missingDocument',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Missing Document" />
      ),
      cell: ({ row }) => <>{row.getValue('missingDocument')}</>,
    },

    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('priority');

        if (value === 'Low') return <Badge variant="default">Low</Badge>;
        if (value === 'High') return <Badge variant="destructive">High</Badge>;
        if (value === 'Medium') return <Badge variant="warning">Medium</Badge>;

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
                className="rounded-none bg-background"
              />
            }
            size="lg"
            formId="missing-document-card"
            okText="Send Reminder"
            cancelText="Cancel"
            componentClassName="border-none shadow-none p-0 rounded-none bg-background"
            dialogClassName="sm:max-w-[465px]"
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
