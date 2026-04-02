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
import { useEmployees, useCreateEmployee, type Employee } from '@erp/data-access';

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
const { register, handleSubmit, formState: { errors } } = useForm<Input>({
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
</FormField>
```

## Dialog Pattern

```tsx
const dialog = useDialog();           // simple
const dialog = useDialog<Employee>(); // with data

<Button onClick={dialog.open}>Open</Button>
<MyDialog {...dialog.props} />

// Access data: dialog.data
```

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

| What | Use |
|------|-----|
| API data | `useQuery` / `useMutation` from `@erp/data-access` |
| URL params | `useQueryState` from `nuqs` |
| Global (auth) | `useAuth()` / `useAuthStore` |
| Local (modal) | `useState` / `useDialog` |

## File Naming

| Type | Pattern |
|------|---------|
| Component | `kebab-case.tsx` |
| Hook | `use-name.ts` |
| Schema | `schema.ts` |
| Step form | `step-name.tsx` |
| Mock seed | `seed.ts` |
| Barrel | `index.ts` |
