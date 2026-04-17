# Developer Cheat Sheet

## Quick Commands

```bash
pnpm dev              # Start dev server
pnpm generate         # Scaffold a new route (interactive)
pnpm test             # Run tests
pnpm lint             # Lint all
pnpm typecheck        # Type check
```

## Create a New Module (5 steps)

```bash
# 1. Generate route
pnpm generate

# 2. Copy feature template
cp -r src/features/employees src/features/your-module

# 3. Add mock data
mkdir src/mocks/modules/your-module
# Create seed.ts + index.ts (see features/employees/README.md)

# 4. Register in handlers
# Edit src/mocks/handlers.ts → add ...initYourModule()

# 5. Add to sidebar
# Edit libs/shared/ui/src/lib/nav-config.ts → add module
# Edit libs/shared/tenant/src/mock-tenants.ts → add to modulesEnabled
```

## Imports

```tsx
// Components
import { Button, Input, Badge, DataTable, FormField, useDialog } from '@erp/ui';

// Data
import {
  useEmployees,
  useCreateEmployee,
  type Employee,
} from '@erp/data-access';

// Auth
import { useAuth, Can, AUTH_TOKEN_KEY } from '@erp/auth';

// Utils
import { cn, formatDate, formatCurrency } from '@erp/utils';

// Tenant
import { useTenant } from '@erp/tenant';
```

## Form Pattern

```tsx
// 1. Schema
const schema = z.object({ name: z.string().min(1, 'Required') });
type Input = z.infer<typeof schema>;

// 2. Hook
const mutation = useCreateEntity();

// 3. Form
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<Input>({
  resolver: zodResolver(schema),
});

// 4. Submit
const onSubmit = handleSubmit((data) => {
  mutation.mutate(data, {
    onSuccess: () => toast({ title: 'Created', variant: 'success' }),
  });
});

// 5. Field
<FormField label="Name" htmlFor="name" error={errors.name?.message} required>
  <Input id="name" {...register('name')} />
</FormField>;
```

## Dialog Patterns

Three components, three use cases. **Pick the right one.** No magic
strings, no `useState`, no render-props.

### 1. `<FormDialog>` — button → form (95% of cases)

The minimum dialog is **4 lines**. No `useState`, no `formId`, no
`onSuccess` prop on the form.

```tsx
import { Button, FormDialog } from '@erp/ui';

<FormDialog trigger={<Button>Add Branch</Button>} title="Add Branch">
  <BranchForm />
</FormDialog>;
```

The form closes itself via `useDialogClose()`:

```tsx
import { Form, HRInput, useDialogClose, toast } from '@erp/ui';

export function BranchForm() {
  const createBranch = useCreateBranch();
  const close = useDialogClose();
  const form = useForm({ resolver: zodResolver(branchSchema) });

  const onSubmit = (data) => {
    createBranch.mutate(data, {
      onSuccess: () => {
        toast({ title: 'Saved', variant: 'success' });
        close();
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

### 2. `<ControlledFormDialog>` — when parent owns state (e.g. row edit)

```tsx
const [editTarget, setEditTarget] = useState<Branch | null>(null);

<ControlledFormDialog
  open={editTarget !== null}
  onOpenChange={(open) => !open && setEditTarget(null)}
  title="Edit Branch"
  size="lg"
>
  <BranchForm initialValues={editTarget ?? undefined} />
</ControlledFormDialog>;
```

### 3. `<ConfirmDialog>` — destructive confirmations

```tsx
const [target, setTarget] = useState<Branch | null>(null);

<ConfirmDialog
  open={target !== null}
  onOpenChange={(open) => !open && setTarget(null)}
  title="Delete branch?"
  description={`"${target?.branch}" will be permanently deleted.`}
  destructive
  confirmText="Delete"
  onConfirm={async () => {
    await deleteMutation.mutateAsync(target!.id);
  }}
/>;
```

⚠️ **Use `mutateAsync()`, not `mutate()`** — `ConfirmDialog` relies on the
returned promise for loading state and auto-close.

### Defaults you can omit

| Prop         | Default          |
| ------------ | ---------------- |
| `okText`     | `"Save"`         |
| `cancelText` | `"Cancel"`       |
| `size`       | `"md"`           |
| `formId`     | auto (`useId()`) |

## Table Column

```tsx
{
  accessorKey: 'name',
  header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  cell: ({ row }) => <span>{row.original.name}</span>,
  enableSorting: true,
}
```

## Badge Variants

```tsx
<Badge variant="success">Active</Badge>      // green
<Badge variant="destructive">Rejected</Badge> // red
<Badge variant="warning">Pending</Badge>      // amber
<Badge variant="secondary">Inactive</Badge>   // gray
```

## State Decision

| What          | Use                                                |
| ------------- | -------------------------------------------------- |
| API data      | `useQuery` / `useMutation` from `@erp/data-access` |
| URL params    | `useQueryState` from `nuqs`                        |
| Global (auth) | `useAuth()` / `useAuthStore`                       |
| Local (modal) | `useState` / `useDialog`                           |

## File Naming

| Type      | Pattern          |
| --------- | ---------------- |
| Component | `kebab-case.tsx` |
| Hook      | `use-name.ts`    |
| Schema    | `schema.ts`      |
| Step form | `step-name.tsx`  |
| Mock seed | `seed.ts`        |
| Barrel    | `index.ts`       |
