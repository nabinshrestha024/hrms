import { createFileRoute } from '@tanstack/react-router';
import { type ColumnDef } from '@tanstack/react-table';
import {
  TablePage,
  DataTableColumnHeader,
  Badge,
  Button,
  type RowAction,
} from '@erp/ui';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FormDialog } from '@erp/ui';
import { FormRenderer } from '@erp/config-engine';
import type { FormViewConfig } from '@erp/config-engine';
import { mockGetAnalytics } from '../../../mocks/analytics.mock';

export const Route = createFileRoute('/_authenticated/dashboard/analytics')({
  component: AnalyticsPage,
  beforeLoad: () => ({ breadcrumb: 'Analytics' }),
});

// ---- Types ----
// TODO: Move to @erp/data-access schema when ready
interface Analytics {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

// ---- Form Config ----
// TODO: Define your form fields here
const analyticsFormConfig: FormViewConfig = {
  entity: 'analytics',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      validation: { required: true },
    },
  ],
  layout: {
    type: 'section',
    title: 'New Analytics',
    children: [{ type: 'field', name: 'name' }],
  },
};

// ---- Columns ----

const columns: ColumnDef<Analytics, unknown>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === 'active' ? 'success' : 'secondary'}
      >
        {row.original.status}
      </Badge>
    ),
  },
];

// ---- Row Actions ----

const rowActions: RowAction<Analytics>[] = [
  {
    label: 'View',
    icon: Eye,
    onClick: (row: Analytics) => alert(`View: ${row.id}`),
  },
  {
    label: 'Edit',
    icon: Pencil,
    onClick: (row: Analytics) => alert(`Edit: ${row.id}`),
  },
  {
    label: 'Delete',
    icon: Trash2,
    onClick: (row: Analytics) => alert(`Delete: ${row.id}`),
    variant: 'destructive',
    separator: true,
  },
];

// ---- Page ----

function AnalyticsPage() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <TablePage<Analytics>
        title="Analytics"
        columns={columns}
        fetchData={mockGetAnalytics}
        rowActions={rowActions}
        searchPlaceholder="Search..."
        headerActions={
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add Analytics
          </Button>
        }
      />

      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title="Add Analytics"
      >
        <FormRenderer
          config={analyticsFormConfig}
          onSubmit={(data: Record<string, unknown>) => {
            console.log('Form submitted:', data);
            setFormOpen(false);
          }}
          submitLabel="Create Analytics"
        />
      </FormDialog>
    </>
  );
}
