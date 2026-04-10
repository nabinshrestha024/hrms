# Developer Guide

This guide covers everything you need to build features in this codebase.

## Table of Contents

1. [Creating a New Page](#1-creating-a-new-page)
2. [Table Pages](#2-table-pages)
3. [Form Pages](#3-form-pages)
4. [Detail Pages](#4-detail-pages)
5. [Breadcrumbs](#5-breadcrumbs)
6. [Adding Sidebar Navigation](#6-adding-sidebar-navigation)
7. [Dialogs and Modals](#7-dialogs-and-modals)
8. [Authentication and Permissions](#8-authentication-and-permissions)
9. [Data Fetching](#9-data-fetching)
10. [Toast Notifications](#10-toast-notifications)
11. [Styling Guide](#11-styling-guide)
12. [Testing](#12-testing)
13. [Common Patterns](#13-common-patterns)

## Reference docs

For deep dives on specific patterns, see the dedicated reference docs:

- **[DIALOGS.md](./DIALOGS.md)** — `<FormDialog>`, `<ControlledFormDialog>`, `<ConfirmDialog>`. When to use each, props reference, common mistakes.
- **[TABLES.md](./TABLES.md)** — `useServerTableState` hook for URL-synced server-driven tables. Cuts table boilerplate from 90 lines to 20.
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Library structure, dependencies, monorepo layout.
- **[CHEATSHEET.md](./CHEATSHEET.md)** — Copy-paste snippets for the most common patterns.

---

## 1. Creating a New Page

### Using the Generator (Recommended)

```bash
pnpm generate
```

The CLI will ask you:

- Route path (e.g. `leave/requests`)
- Page title
- Authenticated? (yes/no)
- Need a table? (yes/no)
- Need a form dialog? (yes/no)
- Generate mock data? (yes/no)
- Generate API hooks? (yes/no)

It creates all files with correct imports, types, and patterns.

### Creating Manually

Create a file at `apps/erp-shell/src/routes/_authenticated/your-page.tsx`:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@erp/ui';

export const Route = createFileRoute('/_authenticated/your-page')({
  component: YourPage,
  beforeLoad: () => ({ breadcrumb: 'Your Page' }),
});

function YourPage() {
  return (
    <div>
      <PageHeader title="Your Page" subtitle="Description here" />
      <div className="px-6">{/* Your content */}</div>
    </div>
  );
}
```

The route is automatically picked up by TanStack Router — no registration needed.

### Nested Routes

For routes like `/leave/requests`, `/leave/balance`:

```
routes/_authenticated/
  leave.tsx              ← Layout route (must have <Outlet />)
  leave/
    requests.tsx         ← /leave/requests
    balance.tsx          ← /leave/balance
```

**Layout route** (`leave.tsx`):

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/leave')({
  component: () => <Outlet />,
  beforeLoad: () => ({ breadcrumb: 'Leave' }),
});
```

The generator handles this automatically — if you create a nested route under an existing leaf route, it converts the parent to a layout route.

---

## 2. Table Pages

### Using `<TablePage>` (Fastest Way)

```tsx
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
import { mockGetLeaveRequests } from '../../mocks/leave-request.mock';

export const Route = createFileRoute('/_authenticated/leave/requests')({
  component: LeaveRequestsPage,
  beforeLoad: () => ({ breadcrumb: 'Leave Requests' }),
});

// 1. Define your type
interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
}

// 2. Define columns
const columns: ColumnDef<LeaveRequest, unknown>[] = [
  {
    accessorKey: 'employeeName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const v = row.original.status;
      return (
        <Badge
          variant={
            v === 'approved'
              ? 'success'
              : v === 'rejected'
              ? 'destructive'
              : 'warning'
          }
        >
          {v}
        </Badge>
      );
    },
  },
];

// 3. Define row actions
const rowActions: RowAction<LeaveRequest>[] = [
  { label: 'View', icon: Eye, onClick: (row) => alert(row.id) },
  { label: 'Edit', icon: Pencil, onClick: (row) => alert(row.id) },
  {
    label: 'Delete',
    icon: Trash2,
    onClick: (row) => alert(row.id),
    variant: 'destructive',
    separator: true,
  },
];

// 4. Render
function LeaveRequestsPage() {
  return (
    <TablePage<LeaveRequest>
      title="Leave Requests"
      columns={columns}
      fetchData={mockGetLeaveRequests}
      rowActions={rowActions}
      searchPlaceholder="Search by employee..."
      headerActions={
        <Button>
          <Plus className="mr-2 size-4" />
          Add Request
        </Button>
      }
    />
  );
}
```

**What `<TablePage>` gives you for free:**

- URL-synced pagination (`?page=2&pageSize=10`)
- URL-synced sorting (`?sortBy=name&sortOrder=asc`)
- URL-synced search (`?q=john`)
- Loading skeletons
- Record count in subtitle
- Empty state

### FetchData Function Signature

Your data function must match this shape:

```typescript
import type { FetchParams, FetchResult } from '@erp/ui';

async function fetchData(params: FetchParams): Promise<FetchResult<YourType>> {
  // params = { page, pageSize, sortBy?, sortOrder?, search? }
  // return  = { data: T[], total: number }
}
```

---

## 3. Form Pages

### Standard Pattern: Zod + React Hook Form + useMutation

This is the recommended pattern for all forms. It gives you type-safe validation, proper loading/error states, and API integration via React Query.

**Step 1: Define Zod schema** (in `data-access/schemas/`)

```typescript
// libs/shared/data-access/src/schemas/leave.schema.ts
import { z } from 'zod';

export const createLeaveSchema = z.object({
  type: z.string().min(1, 'Leave type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(1, 'Reason is required'),
});

export type CreateLeaveInput = z.infer<typeof createLeaveSchema>;
```

**Step 2: Create mutation hook** (in `data-access/queries/`)

```typescript
// libs/shared/data-access/src/queries/leave.queries.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiClient } from '../api-client';
import type { CreateLeaveInput } from '../schemas/leave.schema';

export function useCreateLeave(client: ApiClient) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateLeaveInput) => {
      const { data } = await client.post('/leaves', input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    },
  });
}
```

**Step 3: Build form with RHF + Zod**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useApiClient,
  useCreateLeave,
  createLeaveSchema,
  type CreateLeaveInput,
} from '@erp/data-access';
import { Button, Input, FormField } from '@erp/ui';

function LeaveRequestForm({ onClose }: { onClose: () => void }) {
  const api = useApiClient();
  const mutation = useCreateLeave(api);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLeaveInput>({
    resolver: zodResolver(createLeaveSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, { onSuccess: onClose });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        label="Leave Type"
        htmlFor="type"
        error={errors.type?.message}
        required
      >
        <Input id="type" {...register('type')} />
      </FormField>

      <FormField
        label="Reason"
        htmlFor="reason"
        error={errors.reason?.message}
        required
      >
        <Input id="reason" {...register('reason')} />
      </FormField>

      {mutation.error && (
        <p className="text-sm text-destructive">{mutation.error.message}</p>
      )}

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

**Why this pattern:**

- Validation runs client-side before API call (instant feedback)
- `useMutation` handles loading, error, success states automatically
- `onSuccess` invalidates related queries (table refreshes automatically)
- Types flow from Zod schema → form → API (zero duplication)

### Which form pattern to use?

```
Need a form?
  │
  ├── Simple CRUD (< 10 fields, single step)?
  │     └── Use Config-Driven FormRenderer
  │         Quick to build, JSON config, auto-validation
  │
  ├── Complex form (multi-step, custom UI, conditional fields)?
  │     └── Use React Hook Form + Zod + MultiStepForm
  │         Full control, per-step validation, custom layouts
  │
  └── Inline edit / single field?
        └── Use React Hook Form + Zod directly
            No dialog needed, just form + submit
```

**Reference:** `features/employees/add-employee/` uses RHF + Zod (complex multi-step).
**Reference:** `routes/_authenticated/demo-form.tsx` uses FormRenderer (simple config-driven).

### Config-Driven Forms (alternative)

Use the config engine for rapid prototyping or admin-style CRUD forms:

```tsx
import { FormRenderer } from '@erp/config-engine';
import type { FormViewConfig } from '@erp/config-engine';

const employeeForm: FormViewConfig = {
  entity: 'employee',
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      validation: { required: true, max: 50 },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      validation: { required: true },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      validation: { required: true, pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$' },
    },
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      options: ['engineering', 'hr', 'finance'],
    },
    { name: 'salary', type: 'number', label: 'Salary', validation: { min: 0 } },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      validation: { required: true },
    },
    { name: 'active', type: 'boolean', label: 'Active' },
  ],
  layout: {
    type: 'section',
    title: 'Employee Details',
    children: [
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'firstName' },
          { type: 'field', name: 'lastName' },
        ],
      },
      { type: 'field', name: 'email' },
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'department' },
          { type: 'field', name: 'salary' },
        ],
      },
    ],
  },
};

// Usage:
<FormRenderer
  config={employeeForm}
  onSubmit={(data) => console.log(data)}
  submitLabel="Save"
/>;
```

### Field Types

| Type      | Widget          | Validation Options              |
| --------- | --------------- | ------------------------------- |
| `text`    | Input           | `required`, `max`, `pattern`    |
| `number`  | Input (number)  | `required`, `min`, `max`        |
| `select`  | Select dropdown | `required`, `options: string[]` |
| `date`    | Date picker     | `required`                      |
| `boolean` | Toggle switch   | —                               |

### Layout Nodes

| Type      | Props                         | Description            |
| --------- | ----------------------------- | ---------------------- |
| `section` | `title`, `children`           | Fieldset with title    |
| `columns` | `columns: number`, `children` | Grid layout            |
| `field`   | `name`                        | Renders a field widget |
| `divider` | —                             | Horizontal separator   |

---

## 4. Detail Pages

For entity detail views (e.g. `/employees/123`):

```tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  PageHeader,
  Card,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Button,
  Skeleton,
} from '@erp/ui';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/employees/$id')({
  component: EmployeeDetailPage,
  beforeLoad: () => ({ breadcrumb: 'Employee Details' }),
});

function EmployeeDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // Fetch data using id...

  return (
    <div>
      <PageHeader
        title="Employee Details"
        actions={
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/employees' })}
          >
            <ArrowLeft className="mr-2 size-4" /> Back
          </Button>
        }
      />
      <div className="px-6">
        <Tabs defaultValue="personal">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="work">Work Info</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">{/* Content */}</TabsContent>
          <TabsContent value="work">{/* Content */}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

---

## 5. Breadcrumbs

Breadcrumbs work automatically. Just add `beforeLoad` to your route:

```tsx
export const Route = createFileRoute('/_authenticated/leave/requests')({
  component: LeaveRequestsPage,
  beforeLoad: () => ({ breadcrumb: 'Leave Requests' }),
});
```

For nested routes, each parent also defines its breadcrumb:

```
_authenticated.tsx     → breadcrumb: 'Home'
leave.tsx              → breadcrumb: 'Leave'
leave/requests.tsx     → breadcrumb: 'Leave Requests'
```

Result: `Home > Leave > Leave Requests`

---

## 6. Adding Sidebar Navigation

Edit `libs/shared/ui/src/lib/nav-config.ts`:

```typescript
// Add to navModules array:
{
  id: 'your-module',
  label: 'Your Module',
  icon: SomeIcon,               // from lucide-react
  href: '/your-module/first',
  modules: ['your-module'],     // tenant module gate
  subItems: [
    { label: 'First Page', href: '/your-module/first', icon: ListIcon },
    { label: 'Second Page', href: '/your-module/second', icon: SettingsIcon },
  ],
},
```

Then add `'your-module'` to `modulesEnabled` in `libs/shared/tenant/src/mock-tenants.ts`.

---

## 7. Dialogs and Modals

The `@erp/ui` library exposes **three** dialog primitives. Pick the right one
for the situation — they look identical but each solves a different problem.

### Decision tree

```
Is the dialog a "are you sure?" confirmation (delete, archive, leave page)?
├── YES → <ConfirmDialog>
└── NO → Is the dialog opened by a button click, with no row data needed?
    ├── YES → <FormDialog>          (95% of cases — zero useState)
    └── NO  → <ControlledFormDialog> (parent owns state, e.g. row edit)
```

### A. `<FormDialog>` — the default for most cases

Self-managed open state, trigger colocated, render-prop access to `close`.
**No `useState` needed.**

```tsx
import { Button, FormDialog } from '@erp/ui';
import { BranchForm } from './branch-form';

<FormDialog
  trigger={<Button variant="secondary">Add Branch</Button>}
  title="Add Branch"
  size="lg"
  formId="branch-form"
  okText="Add"
  cancelText="Cancel"
>
  {({ close }) => <BranchForm onSuccess={close} />}
</FormDialog>;
```

**Props**

| Prop           | Type                                    | Notes                                                                                         |
| -------------- | --------------------------------------- | --------------------------------------------------------------------------------------------- |
| `trigger`      | `ReactElement`                          | The button (or any element). Its `onClick` is auto-wired. Existing handlers still fire first. |
| `title`        | `ReactNode`                             | Dialog header.                                                                                |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'img'`         | Default `md`.                                                                                 |
| `formId`       | `string`                                | The `id` of the inner `<form>`. The submit button is wired to this id.                        |
| `okText`       | `ReactNode`                             | Submit button label. Omit to hide the button.                                                 |
| `cancelText`   | `ReactNode`                             | Cancel button label. Omit to hide.                                                            |
| `onCancel`     | `() => void`                            | Called before close on cancel click.                                                          |
| `isSubmitting` | `boolean`                               | Disables both buttons while a mutation is pending.                                            |
| `defaultOpen`  | `boolean`                               | Start open (rare — use for tour onboarding).                                                  |
| `onOpenChange` | `(open: boolean) => void`               | Listen to open/close events.                                                                  |
| `children`     | `ReactNode \| ({ close }) => ReactNode` | Form body. Use the render-prop form when the form needs to close itself.                      |

**Form `id` is the contract.** The submit button inside `<FormDialog>` uses
HTML's `form="<id>"` attribute to submit a form anywhere in the dialog. Make
sure your form's `id` matches the `formId` prop:

```tsx
// branch-form.tsx
<FormRenderer config={addBranchFormConfig} ... />
//   ^^ generates <form id="branch-form"> when entity === 'branch'
```

For raw `<form>`, just set the `id` attribute:

```tsx
<form id="branch-form" onSubmit={...}>
  ...
</form>
```

**Closing after submit.** Forms close themselves by accepting an `onSuccess`
callback and wiring it to `close` from the render-prop:

```tsx
function BranchForm({ onSuccess }: { onSuccess?: () => void }) {
  const createBranch = useCreateBranch();
  return (
    <form
      id="branch-form"
      onSubmit={form.handleSubmit((data) =>
        createBranch.mutate(data, { onSuccess })
      )}
    >
      ...
    </form>
  );
}

<FormDialog trigger={<Button>Add</Button>} title="Add" formId="branch-form">
  {({ close }) => <BranchForm onSuccess={close} />}
</FormDialog>;
```

If your form doesn't need to close itself, drop the render-prop:

```tsx
<FormDialog trigger={<Button>Edit</Button>} title="Edit" formId="x-form">
  <ReadOnlyForm />
</FormDialog>
```

### B. `<ControlledFormDialog>` — when the parent must own state

Use this when the dialog's open state depends on **which row** was clicked,
because `<FormDialog trigger>` doesn't expose its internal state.

```tsx
import { useState } from 'react';
import { ControlledFormDialog } from '@erp/ui';

const [editTarget, setEditTarget] = useState<Branch | null>(null);

<BranchTable onEdit={(branch) => setEditTarget(branch)} />

<ControlledFormDialog
  open={editTarget !== null}
  onOpenChange={(open) => !open && setEditTarget(null)}
  title="Edit Branch"
  size="lg"
  formId="branch-form"
  okText="Save"
  cancelText="Cancel"
>
  <BranchForm initialValues={editTarget ?? undefined} />
</ControlledFormDialog>;
```

The same prop API as `FormDialog` but takes `open` / `onOpenChange` instead of
`trigger`. No render-prop — the parent already knows how to close it.

### C. `<ConfirmDialog>` — destructive confirmations

Use for any "are you sure?" checkpoint. Built-in destructive variant, async
`onConfirm` with loading state, auto-closes on success, stays open on error.

```tsx
import { useState } from 'react';
import { ConfirmDialog } from '@erp/ui';

const [deleteTarget, setDeleteTarget] = useState<Branch | null>(null);
const deleteBranch = useDeleteBranch();

<BranchTable onDelete={(id) => setDeleteTarget(branches.find((b) => b.id === id))} />

<ConfirmDialog
  open={deleteTarget !== null}
  onOpenChange={(open) => !open && setDeleteTarget(null)}
  title="Delete branch?"
  description={
    deleteTarget
      ? `"${deleteTarget.branch}" will be permanently deleted. This action cannot be undone.`
      : undefined
  }
  confirmText="Delete"
  destructive
  onConfirm={async () => {
    if (!deleteTarget) return;
    await deleteBranch.mutateAsync(deleteTarget.id);
  }}
/>;
```

**Async behavior:**

- The confirm button shows `Working…` while `onConfirm` is pending.
- On resolve → dialog auto-closes.
- On reject → dialog stays open so the user can retry. Show your error toast
  via the mutation's `onError` callback.

### Don't use `<LegacyFormDialog>` / `useDialogFormStore`

The `useDialogFormStore` hook and `<LegacyFormDialog />` are **deprecated**.
They exist only because the legacy `/features/employee/` tree still calls
`useDialogFormStore().onOpen({ component: <X /> })`.

Why they're bad:

- **JSX in a global store.** Closures get captured at click time → stale data.
- **Only one dialog at a time, app-wide.** Nested dialogs impossible.
- **Magic-string `formId` coupling.** Renaming the form id silently breaks submit.
- **Side-effect-driven close.** Any successful form submission anywhere could close any open dialog.
- **Untestable.** Needs the global `<LegacyFormDialog />` mounted in the route tree.

If you see this in a PR, push back and ask the author to use one of the three
patterns above.

### Common mistakes

**1. Forgetting `formId`** — the submit button does nothing.

```tsx
// ❌ submit button has nothing to submit
<FormDialog trigger={<Button>Add</Button>} title="Add" okText="Save">
  <form onSubmit={handleSubmit}>...</form>
</FormDialog>

// ✅ formId matches the inner form's id
<FormDialog trigger={<Button>Add</Button>} title="Add" formId="my-form" okText="Save">
  <form id="my-form" onSubmit={handleSubmit}>...</form>
</FormDialog>
```

**2. Closing the dialog before the mutation finishes** — user sees the dialog
disappear while their data is still being saved, no feedback if it fails.

```tsx
// ❌ closes immediately, user has no idea if save succeeded
const handleSubmit = (data) => {
  createBranch.mutate(data);
  close();
};

// ✅ close in the mutation's onSuccess callback
const handleSubmit = (data) => {
  createBranch.mutate(data, {
    onSuccess: () => {
      toast({ variant: 'success', title: 'Saved' });
      close();
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Failed to save' });
    },
  });
};
```

**3. Using `<ConfirmDialog>` for non-destructive prompts** — the destructive
variant is opt-in via the `destructive` prop. Without it, the confirm button
uses the secondary variant, which is correct for archive/restore prompts.

**4. Forgetting `mutateAsync` in `ConfirmDialog.onConfirm`** — `ConfirmDialog`
relies on the returned promise to show its loading state and auto-close. If
you use `mutate()` instead of `mutateAsync()`, the dialog closes immediately
and ignores errors.

```tsx
// ❌ closes immediately, no loading state, errors silently ignored
onConfirm={() => deleteMutation.mutate(id)}

// ✅ awaits the promise, dialog stays open if it throws
onConfirm={async () => {
  await deleteMutation.mutateAsync(id);
}}
```

### For non-dialog modals (image lightbox, etc.)

Use `<Dialog>` directly from `@erp/ui` (the Radix primitive).

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@erp/ui';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Image preview</DialogTitle>
    </DialogHeader>
    <img src={url} alt="" />
  </DialogContent>
</Dialog>;
```

---

## 8. Authentication and Permissions

### Check Auth State

```tsx
import { useAuth } from '@erp/auth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  // user = { id, email, name, role, tenantId }
}
```

### Permission-Based UI

```tsx
import { Can } from '@erp/auth';

<Can action="create" subject="hr:employees">
  <Button>Add Employee</Button>
</Can>

<Can action="delete" subject="hr:employees" fallback={<span>No access</span>}>
  <Button variant="destructive">Delete</Button>
</Can>
```

### Permission Format

Permissions follow the pattern: `module:entity:action`

Examples: `hr:employees:read`, `payroll:runs:approve`, `leave:requests:create`

### Protected Routes

```tsx
import { RouteGuard } from '@erp/auth';

<RouteGuard action="read" subject="payroll:runs">
  <PayrollPage />
</RouteGuard>;
```

---

## 9. Data Fetching

### Mock API (MSW)

The app uses **MSW (Mock Service Worker)** in development. All mock data is served as real HTTP responses — you can see requests in the browser's Network tab.

```
Component → useApiClient() → fetch('/api/employees') → MSW intercepts → mock handler → HTTP response
```

MSW starts automatically in dev mode via `main.tsx`. No setup needed.

**Adding a new mock endpoint:**

1. Create mock data in `apps/erp-shell/src/mocks/your-entity.mock.ts`
2. Add HTTP handlers in `apps/erp-shell/src/mocks/handlers.ts`:

```typescript
// In handlers.ts, add:
http.get(`${API_BASE}/your-entities`, async ({ request }) => {
  await delay(150);
  const params = parseSearchParams(request.url);
  const result = await mockGetYourEntities(params);
  return HttpResponse.json(result);
}),
```

3. Use `useApiClient()` in your component to make requests:

```tsx
import { useApiClient } from '@erp/data-access';

function MyPage() {
  const api = useApiClient();
  // api.get('/your-entities') → MSW intercepts → mock response
}
```

**Disabling MSW:** Set `VITE_ENABLE_MOCK_API=false` in `.env` to skip MSW and hit a real backend.

### With Mock Data (Direct — legacy)

For simple pages or `<TablePage>`, you can still use mock functions directly:

```typescript
import type { FetchParams, FetchResult } from '@erp/ui';

export interface YourEntity {
  id: string;
  name: string;
}

const MOCK_DATA: YourEntity[] = [
  /* ... */
];

export async function mockGetEntities(
  params: FetchParams
): Promise<FetchResult<YourEntity>> {
  await new Promise((r) => setTimeout(r, 100));

  let filtered = [...MOCK_DATA];
  if (params.search) {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(params.search!.toLowerCase())
    );
  }

  const total = filtered.length;
  const start = (params.page - 1) * params.pageSize;
  return { data: filtered.slice(start, start + params.pageSize), total };
}
```

### With Real API (Production)

Create a Zod schema in `libs/shared/data-access/src/schemas/`:

```typescript
import { z } from 'zod';

export const leaveRequestSchema = z.object({
  id: z.string(),
  employeeName: z.string(),
  type: z.string(),
  status: z.enum(['pending', 'approved', 'rejected']),
});

export type LeaveRequest = z.infer<typeof leaveRequestSchema>;
```

Create query hooks in `libs/shared/data-access/src/queries/`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const leaveRequestKeys = {
  all: ['leave-requests'] as const,
  lists: () => [...leaveRequestKeys.all, 'list'] as const,
};

export function useLeaveRequests(client: ApiClient, params?: ListParams) {
  return useQuery({
    queryKey: leaveRequestKeys.lists(),
    queryFn: () => client.get('/leave-requests', { params }),
  });
}
```

---

## 10. Toast Notifications

```tsx
import { toast } from '@erp/ui';

// Success
toast({ title: 'Saved successfully', variant: 'success' });

// Error
toast({
  title: 'Failed to save',
  description: 'Please try again',
  variant: 'destructive',
});

// Default
toast({ title: 'Processing...', description: 'Please wait' });
```

---

## 11. Styling Guide

### Use Tailwind CSS with design tokens

```tsx
// Good — uses design tokens
<div className="bg-card text-foreground border border-border rounded-lg p-4" />

// Bad — hardcoded colors
<div className="bg-white text-black border-gray-200" />
```

### Key Design Tokens

| Token                   | Usage                          |
| ----------------------- | ------------------------------ |
| `bg-background`         | Page background                |
| `bg-card`               | Card/panel background          |
| `bg-primary`            | Primary buttons, active states |
| `text-foreground`       | Main text                      |
| `text-muted-foreground` | Secondary text                 |
| `border-border`         | Default borders                |
| `bg-destructive`        | Error/delete states            |

### Class Merge Utility

Always use `cn()` for conditional classes:

```tsx
import { cn } from '@erp/utils';

<div className={cn('base-classes', isActive && 'active-classes', className)} />;
```

### Badge Variants

```tsx
<Badge variant="success">Active</Badge>     // Green
<Badge variant="destructive">Rejected</Badge> // Red
<Badge variant="warning">Pending</Badge>     // Orange
<Badge variant="secondary">Inactive</Badge>  // Gray
<Badge variant="outline">Draft</Badge>       // Outline
```

---

## 12. Testing

### Unit Tests

```bash
pnpm test              # Run all tests
pnpm test:ui           # Vitest UI dashboard
pnpm nx test ui        # Test specific library
```

Tests live next to their source: `component.spec.tsx` beside `component.tsx`.

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('MyComponent', () => {
  it('renders title', () => {
    render(<MyComponent title="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Tests

```bash
pnpm e2e
```

E2E tests are in `apps/erp-shell-e2e/src/`.

---

## 13. Common Patterns

### Formatting

```tsx
import { formatCurrency, formatDate } from '@erp/utils';

formatCurrency(50000); // "$50,000.00"
formatCurrency(50000, { currency: 'NPR' }); // "NPR 50,000.00"
formatCurrency(50000, { compact: true }); // "$50K"
formatDate('2024-01-15'); // "Jan 15, 2024"
formatDate('2024-01-15', { format: 'relative' }); // "2 months ago"
```

### Loading States

```tsx
import { Skeleton } from '@erp/ui';

// Skeleton placeholder
<Skeleton className="h-8 w-32" />   // Rectangle
<Skeleton className="h-8 w-8 rounded-full" />  // Circle
```

### Multi-Tenant Awareness

```tsx
import { useTenant } from '@erp/tenant';

function MyComponent() {
  const { tenant, isDark, setIsDark } = useTenant();

  // tenant.currency → 'USD' or 'NPR'
  // tenant.locale → 'en-US'
  // tenant.modulesEnabled → ['hr', 'payroll', ...]
  // tenant.branding.appTitle → 'Global Square IT'
}
```

### URL State with nuqs

For custom URL-synced state beyond what `<TablePage>` provides:

```tsx
import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs';

const [tab, setTab] = useQueryState('tab', parseAsString.withDefault('all'));
const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
const [status, setStatus] = useQueryState(
  'status',
  parseAsStringEnum(['pending', 'approved', 'rejected'])
);
```
