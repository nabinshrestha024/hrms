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

**Step 2: Use the existing mutation hook** (every resource has `useCreate*` / `useUpdate*` / `useDelete*` exported from `@erp/data-access`).

```tsx
import { useCreateLeaveRequest } from '@erp/data-access';
```

The hook resolves its `ApiClient` from `useApiClient()` internally, so consumers don't pass it. On success the matching list query is invalidated automatically (see `leave-request.queries.ts` for the canonical structure).

**Step 3: Build the dialog form**

```tsx
import { useCreateLeaveRequest } from '@erp/data-access';
import { Button, Input, FormField, toast } from '@erp/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLeaveRequestSchema } from '@erp/data-access';

function LeaveRequestForm({ onSuccess }: { onSuccess: () => void }) {
  const createLeaveRequest = useCreateLeaveRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createLeaveRequestSchema),
  });

  const onSubmit = handleSubmit((data) => {
    createLeaveRequest.mutate(data, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Leave request created' });
        onSuccess();
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to create leave request',
        });
      },
    });
  });

  return (
    <form onSubmit={onSubmit} id="leave-request-form" className="space-y-4">
      <FormField label="Type" error={errors.type?.message} required>
        <Input {...register('type')} />
      </FormField>
      <FormField label="Reason" error={errors.reason?.message} required>
        <Input {...register('reason')} />
      </FormField>
    </form>
  );
}
```

**Submit pipeline to mirror in every form:**

1. Map form fields onto the canonical `Create*Input` / `Update*Input` shape inside `onSubmit` (rename / coerce types — e.g. `phoneNumber → phone`, `joiningDate (Date) → startDate (ISO string)`, `grossSalary (string) → salary (number)`). The `EmployeeForm.Zod.ts` header doc-comment is the canonical example.
2. Call `mutation.mutate(payload, { onSuccess, onError })`.
3. On success: `toast({ variant: 'success', … })` then call the parent's `onSuccess` (`<FormDialog>` passes a `close` callback; wire it up so the dialog closes on save).
4. On error: `toast({ variant: 'destructive', … })`.
5. **Never** `console.warn(data)` as a placeholder — the ESLint `no-console` rule is escalated to an error in `features/`.

**Why this pattern:**

- Validation runs client-side before the API call (instant feedback).
- `useMutation` handles loading / error / success states automatically.
- The hook's `onSuccess` invalidates the matching list query so any open list refreshes.
- Types flow Zod schema → mutation input → form (zero duplication).
- The form schema (UX validation: regex, age ≥ 16, file instances) can stay distinct from the canonical entity schema (storage shape) — see `EmployeeForm.Zod.ts` for the rationale + the field-name map between them.

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
_authenticated.tsx     → breadcrumb: 'Dashboard'
leave.tsx              → breadcrumb: 'Leave'
leave/requests.tsx     → breadcrumb: 'Leave Requests'
```

Result: `Dashboard > Leave > Leave Requests`

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

The `@erp/ui` library exposes **three** dialog components. Pick the right one
for the situation — they look identical but each solves a different problem.

> 📖 **Full reference:** see [DIALOGS.md](./DIALOGS.md) for the complete
> props table, common mistakes, and migration notes.

### Decision tree

```
Is the dialog a "are you sure?" confirmation (delete, archive, leave page)?
├── YES → <ConfirmDialog>
└── NO → Is the dialog opened by a button click, with no row data needed?
    ├── YES → <FormDialog>          (95% of cases — zero useState)
    └── NO  → <ControlledFormDialog> (parent owns state, e.g. row edit)
```

### The minimum dialog is 4 lines

```tsx
import { Button, FormDialog } from '@erp/ui';

<FormDialog trigger={<Button>Add Branch</Button>} title="Add Branch">
  <BranchForm />
</FormDialog>;
```

That's it. **No `useState`, no `formId` magic string, no `onSuccess` prop on
the form, no render-prop.** Sensible defaults handle the rest:

| Prop         | Default                      |
| ------------ | ---------------------------- |
| `okText`     | `"Save"`                     |
| `cancelText` | `"Cancel"`                   |
| `size`       | `"md"`                       |
| `formId`     | auto-generated via `useId()` |

### How the form closes itself

Inside the form, call `useDialogClose()` to grab a function that closes the
parent dialog (or a no-op if rendered standalone):

```tsx
import { Form, HRInput, useDialogClose, toast } from '@erp/ui';

export function BranchForm() {
  const createBranch = useCreateBranch();
  const close = useDialogClose();
  const form = useForm({ resolver: zodResolver(branchSchema) });

  const onSubmit = (data: BranchInput) => {
    createBranch.mutate(data, {
      onSuccess: () => {
        toast({ title: 'Branch created', variant: 'success' });
        close();
      },
      onError: () => {
        toast({ title: 'Failed to save', variant: 'destructive' });
      },
    });
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <HRInput {...form.register('name')} label="Name" />
    </Form>
  );
}
```

The `<Form>` wrapper from `@erp/ui` automatically picks up the form id from
`FormIdContext` (provided by `<FormDialog>`) and applies it to the inner
`<form>` tag. The dialog's submit button is wired to the same id.
**Zero magic strings — they're impossible to mismatch.**

### `<ControlledFormDialog>` — when the parent must own state

Use this when the dialog's open state depends on **which row** was clicked:

```tsx
const [editTarget, setEditTarget] = useState<Branch | null>(null);

<BranchTable onEdit={(branch) => setEditTarget(branch)} />

<ControlledFormDialog
  open={editTarget !== null}
  onOpenChange={(open) => !open && setEditTarget(null)}
  title="Edit Branch"
  size="lg"
>
  <BranchForm initialValues={editTarget ?? undefined} />
</ControlledFormDialog>;
```

Same auto-`formId` and `useDialogClose()` behavior as `<FormDialog>`. The
only difference is that the parent owns the open state.

### `<ConfirmDialog>` — destructive confirmations

```tsx
const [target, setTarget] = useState<Branch | null>(null);
const deleteBranch = useDeleteBranch();

<ConfirmDialog
  open={target !== null}
  onOpenChange={(open) => !open && setTarget(null)}
  title="Delete branch?"
  description={`"${target?.branch}" will be permanently deleted.`}
  confirmText="Delete"
  destructive
  onConfirm={async () => {
    if (!target) return;
    await deleteBranch.mutateAsync(target.id);
  }}
/>;
```

⚠️ **Use `mutateAsync()`, not `mutate()`** — `ConfirmDialog` relies on the
returned promise for loading state and auto-close.

### For non-form modals (image lightbox, etc.)

Use `<Dialog>` directly from `@erp/ui` (the Radix primitive):

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
import { Can, PERM_SUBJECTS } from '@erp/auth';

<Can action="create" subject={PERM_SUBJECTS.HR_EMPLOYEES}>
  <Button>Add Employee</Button>
</Can>

<Can
  action="delete"
  subject={PERM_SUBJECTS.HR_EMPLOYEES}
  fallback={<span>No access</span>}
>
  <Button variant="destructive">Delete</Button>
</Can>
```

### Permission Format

Permissions follow the pattern: `module:entity:action`. The literal strings live in `PERM_SUBJECTS` (subject = `module:entity`) and `PERM_ACTIONS` (action verb) — always import the constants instead of hand-typing the string. A typo in a free-form permission string silently grants no access; using the constants makes it a build error.

Subjects shipped today: `HR_EMPLOYEES`, `HR_DEPARTMENTS`, `HR_BRANCHES`, `HR_DIRECTORIES`, `ATTENDANCE_RECORDS`, `LEAVE_REQUESTS`, `LEAVE_TYPES`, `DOCUMENTS_REVIEWS`, `DOCUMENTS_TEMPLATES`, `DOCUMENTS_CATEGORIES`, `DOCUMENTS_ASSIGNMENTS`, `DOCUMENTS_VISIBILITY`, `ASSETS_ITEMS`, `ASSETS_CATEGORIES`, `MASTER_HOLIDAY_TYPES`, `MASTER_CURRENCIES`, `MASTER_JOB_LEVELS`, `MASTER_WORK_TYPES`, `MASTER_LEAVE_PAY_TYPES`, `CONFIG_HOLIDAYS`, `CONFIG_SHIFTS`, `CONFIG_WORK_WEEK`, `POLICY_*`, `SETTINGS_*`. Actions: `read` / `create` / `update` / `delete` / `approve` / `reject` / `assign` / `return`.

Three role bundles drive `mock-users.ts`: `ADMIN_PERMISSIONS` (full CRUD), `HR_MANAGER_PERMISSIONS` (read + manage employees + approve leave + manage assets), `EMPLOYEE_PERMISSIONS` (self-service only).

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

**Adding a new mock resource (current canonical pattern):**

1. Add the Zod schema in `libs/shared/data-access/src/schemas/<resource>.schema.ts` (id + entity fields + `...timestampsSchema.shape`, plus `create*Schema` and `update*Schema`).
2. Add the React Query hooks in `libs/shared/data-access/src/queries/<resource>.queries.ts` (`useXxxList` / `useXxx(id)` / `useCreateXxx` / `useUpdateXxx` / `useDeleteXxx`). Look at `employee.queries.ts` for a reference implementation; mutations end with a `queryClient.invalidateQueries` so any open list refreshes automatically.
3. Re-export from `libs/shared/data-access/src/index.ts` so consumers can import from `@erp/data-access`.
4. Drop a seed file at `apps/erp-shell/src/mocks/modules/<resource>/seed.ts` and an `index.ts` that registers the collection (`db.registerCollection('your-resource', seed)`) plus calls `createCrudHandlers` for the standard REST shape.
5. Register the module in `apps/erp-shell/src/mocks/handlers.ts` (`init<Resource>Module()`).
6. Singletons (e.g. `work-week-config`) skip step 4's `createCrudHandlers` and ship custom GET + PATCH handlers.

**Disabling MSW:** Set `VITE_ENABLE_MOCK_API=false` in `.env` to skip MSW and hit a real backend.

### Loading & error states with `<QueryBoundary>`

Wrap query consumers in `<QueryBoundary>` (from `@erp/ui`) so each call site doesn't hand-roll loading + error UI. It composes `Suspense`, an internal error boundary, and a default Skeleton fallback. Custom UI plugs in via `fallback` and `errorFallback={(error, retry) => …}`. The "Try again" button resets both the error boundary and the underlying React Query cache via `useQueryErrorResetBoundary`.

```tsx
import { QueryBoundary } from '@erp/ui';

<QueryBoundary>
  <EmployeeList /> {/* uses useEmployees() */}
</QueryBoundary>;
```

### Consuming the hooks in a component

```tsx
import { useLeaveRequests, type LeaveRequest } from '@erp/data-access';
import { ListPage } from '@erp/ui';

function LeaveRequestPage() {
  const { data: response } = useLeaveRequests({ pageSize: 100 });
  const data: LeaveRequest[] = response?.data ?? [];

  return (
    <ListPage<LeaveRequest>
      search
      data={data}
      filterFn={(rows, { search }) =>
        rows.filter((r) =>
          r.employeeName.toLowerCase().includes(search.toLowerCase())
        )
      }
      renderTable={(filtered) => <LeaveRequestTable data={filtered} />}
    />
  );
}
```

The hook resolves its `ApiClient` from `useApiClient()` internally, so consumers don't pass it. Filter / sort / pagination params come from the typed `*Filters` schema co-located with the entity schema.

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
