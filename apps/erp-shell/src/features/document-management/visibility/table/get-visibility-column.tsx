import { Badge, DataTableColumnHeader, Switch } from '@erp/ui';
import { VisibilityType } from '../../schema/VisibilityData';
import { ColumnDef } from '@tanstack/react-table';

export function getVisibilityColumns(): ColumnDef<VisibilityType, unknown>[] {
  return [
    {
      accessorKey: 'document',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document" />
      ),
      cell: ({ row }) => <>{row.getValue('document')}</>,
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
      accessorKey: 'visibility',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Visibility" />
      ),
      cell: ({ row }) => {
        const value = Boolean(row.getValue('visibility'));

        return (
          <div className="cursor-pointer">
            <Switch checked={value} />
          </div>
        );
      },
    },
  ];
}
