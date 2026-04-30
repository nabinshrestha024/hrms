import { type EmployeeDocument } from '@erp/data-access';
import { Badge, DataTableColumnHeader, Switch } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';

export function getVisibilityColumns(): ColumnDef<EmployeeDocument, unknown>[] {
  return [
    {
      // Schema field is `name`; column header preserved as "Document".
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => (
        <Badge variant="default">{row.getValue('category')}</Badge>
      ),
    },
    {
      accessorKey: 'uploadDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Upload Date" />
      ),
      cell: ({ row }) => <>{row.getValue('uploadDate')}</>,
    },
    {
      accessorKey: 'visible',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Visibility" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer">
          <Switch checked={row.original.visible} />
        </div>
      ),
    },
  ];
}
