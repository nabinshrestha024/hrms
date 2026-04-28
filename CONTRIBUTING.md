# Contributing

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- pnpm 10+ (`npm install -g pnpm`)

## Setup

```bash
git clone <repo-url>
cd hrms
pnpm install
pnpm dev         # http://localhost:4200
```

## Development Workflow

1. Create a branch: `git checkout -b feat/your-feature`
2. Generate scaffolding: `pnpm generate` (interactive route generator)
3. Develop with `pnpm dev`
4. Test: `pnpm test`
5. Lint: `pnpm lint`
6. Typecheck: `pnpm typecheck`
7. Commit and push
8. Open a PR against `main`

## Code-Review Checklist

Reviewers should walk through this list before approving any PR. Most items are also enforced by lint at the `error` level — they're listed here so authors can self-check before pushing:

- [ ] Submit handlers call a real mutation (`useCreate*` / `useUpdate*` from `@erp/data-access`); no `console.warn(data)` placeholders. (Enforced by `no-console` in `features/`.)
- [ ] Forms use `<FormRenderer>` (config-engine) unless they're multi-step or have heavy custom UI.
- [ ] Lists use `<ListPage>` from `@erp/ui`, not custom shells.
- [ ] No literal hex / oklch colors in `className` — use design tokens (`bg-primary`, `text-foreground`, `border-border`, …). (Enforced by `no-restricted-syntax`.)
- [ ] Mutation buttons are wrapped in `<Can action="…" subject={PERM_SUBJECTS.X}>` and the corresponding action is part of one of the role bundles (`ADMIN_PERMISSIONS` / `HR_MANAGER_PERMISSIONS` / `EMPLOYEE_PERMISSIONS`).
- [ ] Entity schemas live in `libs/shared/data-access/src/schemas/`, never under `apps/erp-shell/src/features/**/schema/`.
- [ ] No new `*Data.ts` files in features; mock data goes through the canonical seed → `createCrudHandlers` → `useXxxList` flow.
- [ ] No imports from deleted shells (`document-management-header`, `table-header`). (Enforced by `no-restricted-imports`.)
- [ ] Permission constants come from `PERM_SUBJECTS` / `PERM_ACTIONS`, never hand-typed (a typo silently grants no access).
- [ ] Async data consumers wrap in `<QueryBoundary>` for loading + error UI when the data fetch is on the critical path.

## Adding a New Module (Step by Step)

### 1. Generate the route

```bash
pnpm generate
# Answer: path, title, table/form/mock options
```

### 2. Add to sidebar

Edit `libs/shared/ui/src/lib/nav-config.ts` — add your module to `navModules`.

### 3. Enable for tenant

Edit `libs/shared/tenant/src/mock-tenants.ts` — add your module key to `modulesEnabled`.

### 4. Customize

- Update the generated type interface with your real fields
- Update column definitions
- Update form config fields
- Replace mock data with real API calls when ready

---

## Conventions

### File Naming

| Type          | Convention               | Example                              |
| ------------- | ------------------------ | ------------------------------------ |
| Route files   | `kebab-case.tsx`         | `leave-requests.tsx`                 |
| Components    | `kebab-case.tsx`         | `page-header.tsx`, `data-table.tsx`  |
| Hooks         | `use-[name].ts`          | `use-mobile.ts`, `use-data-table.ts` |
| Types         | `types.ts` or inline     | `libs/shared/auth/src/types.ts`      |
| Schemas (Zod) | `[entity].schema.ts`     | `employee.schema.ts`                 |
| Query hooks   | `[entity].queries.ts`    | `employee.queries.ts`                |
| Mock data     | `[entity].mock.ts`       | `employees.mock.ts`                  |
| Tests         | `[file].spec.tsx`        | `shell-layout.spec.tsx`              |
| Utilities     | `[function].ts`          | `format-date.ts`, `cn.ts`            |
| Providers     | `[feature]-provider.tsx` | `auth-provider.tsx`                  |

### Exports

- **Always named exports** — no `export default` (except `app.tsx`)
- **Export types alongside components**: `export type { ButtonProps }` next to `export { Button }`
- **Barrel exports via `index.ts`** — grouped by category with comments
- **Re-export from `@erp/*`** — consumers import from package, never deep paths

```tsx
// Good
import { Button, Badge, useDataTable } from '@erp/ui';

// Bad — never deep import
import { Button } from '@erp/ui/src/primitives/button';
```

### Components

- `PascalCase` function names: `function PageHeader() {}`
- Use `cn()` from `@erp/utils` for all class merging
- Add `data-slot="component-name"` on root element of primitives
- Forward `className` prop and merge with `cn(baseStyles, className)`
- Use `React.ComponentProps<'element'>` for native prop inheritance
- Use `forwardRef` when component needs ref forwarding
- Variant styling via `class-variance-authority` (`cva`)

```tsx
// Standard component pattern
function MyComponent({ className, variant, ...props }: MyComponentProps) {
  return (
    <div
      data-slot="my-component"
      className={cn(baseStyles, className)}
      {...props}
    />
  );
}
```

### Hooks

- Named `use[Feature]` — `useAuth()`, `useTenant()`, `useDataTable()`
- Context hooks **must throw** if used outside provider:
  ```tsx
  const ctx = useContext(MyContext);
  if (!ctx) throw new Error('useMyHook must be used within MyProvider');
  return ctx;
  ```
- Return typed objects, not tuples: `{ table, pagination, sorting }` not `[table, pagination]`
- Export return type: `export type UseDataTableReturn<T> = { ... }`

### Types & Schemas

- **Zod schemas are the source of truth** — derive TypeScript types from them
- Never duplicate types; use `z.infer<typeof schema>`
- Create DTOs by composing: `.omit()`, `.partial()`, `.pick()`
  ```tsx
  export const employeeSchema = z.object({ id: z.string(), name: z.string() });
  export type Employee = z.infer<typeof employeeSchema>;
  export const createEmployeeSchema = employeeSchema.omit({ id: true });
  export type CreateEmployee = z.infer<typeof createEmployeeSchema>;
  ```
- Shared types in `types.ts` files per library
- Component props as inline interfaces, exported alongside

### State Management

| State Type        | Tool        | When to Use                                |
| ----------------- | ----------- | ------------------------------------------ |
| Server data       | React Query | API data, cached lists, detail fetches     |
| Client-wide state | Zustand     | Auth, global settings                      |
| URL state         | nuqs        | Pagination, sorting, search, tabs, filters |
| Local UI state    | `useState`  | Modals, toggles, form state                |

**Rules:**

- If it should survive page refresh → nuqs (URL)
- If it comes from an API → React Query
- If it's global app state → Zustand
- Everything else → `useState`

### Routes

- Every route sets breadcrumb: `beforeLoad: () => ({ breadcrumb: 'Label' })`
- Layout routes export `<Outlet />` and live alongside their directory
- Dynamic params use `$param`: `employees.$id.tsx`
- Protected routes go under `_authenticated/`
- Use `<PageHeader>` for page titles
- Use `<TablePage>` for table pages
- Use `<FormDialog>` for form modals — see [docs/DIALOGS.md](./docs/DIALOGS.md). The minimum dialog is 4 lines, no `useState`, no magic strings.

### Data Tables

- Use `<TablePage>` component for full-page tables (handles all boilerplate)
- Use `useDataTable` hook only for custom table layouts
- Column headers: always use `<DataTableColumnHeader>` for sortable columns
- Row actions: define as `RowAction<T>[]` array
- FetchData function signature: `(params: FetchParams) => Promise<FetchResult<T>>`

### Forms

- Use config-engine `<FormRenderer>` for standard CRUD forms
- Field types: `text`, `number`, `select`, `date`, `boolean`, `textarea`
- Layout nodes: `section`, `columns`, `field`, `divider`
- Validation defined in field config, built into Zod at runtime
- For custom forms, use React Hook Form + Zod directly

### API & Data Access

- API client in `@erp/data-access` — typed HTTP methods with auth token
- Query key factories for cache invalidation:
  ```tsx
  export const entityKeys = {
    all: ['entities'] as const,
    lists: () => [...entityKeys.all, 'list'] as const,
    detail: (id: string) => [...entityKeys.all, 'detail', id] as const,
  };
  ```
- Validate API responses with Zod schemas
- Mutations invalidate related queries on success

### Error Handling

- API errors: custom `ApiError` class with `status`, `statusText`, `body`
- Context hooks: throw if used outside provider
- Async effects: use `cancelled` flag pattern for cleanup
  ```tsx
  useEffect(() => {
    let cancelled = false;
    fetchData().then((data) => {
      if (!cancelled) setState(data);
    });
    return () => {
      cancelled = true;
    };
  }, [deps]);
  ```
- Root `ErrorBoundary` catches unhandled errors globally

### Styling

- Use Tailwind CSS design tokens: `bg-primary`, `text-foreground`, `border-border`
- **Never hardcode colors**: `bg-white` → `bg-card`, `text-black` → `text-foreground`
- oklch color format in CSS variables
- `cn()` for all conditional class logic
- Badge variants: `success` (green), `destructive` (red), `warning` (orange), `secondary` (gray)

### Auth & Permissions

- Permission format: `module:entity:action` (e.g., `hr:employees:read`)
- Use `<Can>` component for permission-gated UI
- Use `<RouteGuard>` for permission-gated routes
- Auth state via `useAuth()` — `{ user, isAuthenticated, isLoading, logout }`
- Abilities via `useAbility()` — `ability.can('read', 'hr:employees')`

### Testing

- Tests colocated with source: `component.spec.tsx` next to `component.tsx`
- Use Vitest + Testing Library
- Structure: `describe('Component') → it('should do X when Y')`
- Mock `window.matchMedia` in tests that render responsive components
- Wrap test components in required providers when needed

### Constants & Config

- Module-level constants: `UPPER_SNAKE_CASE`
- Status/variant maps: `Record<EnumValue, DisplayConfig>`
  ```tsx
  const statusConfig: Record<Status, { label: string; variant: BadgeVariant }> =
    {
      active: { label: 'Active', variant: 'success' },
    };
  ```

### Sidebar Navigation

- Config in `libs/shared/ui/src/lib/nav-config.ts`
- Each module: `{ id, label, icon, href, modules, subItems }`
- Icons from `lucide-react` exclusively
- Sub-items have their own unique icons (not the parent icon)
- `modules` array gates visibility by tenant config

### Provider Nesting Order

Must follow this order in `app.tsx`:

```
TenantProvider → QueryProvider → AuthProvider → AbilityProvider → PluginProvider → RouterProvider
```

### Library Dependency Rules

- Libraries in `libs/` never import from `apps/`
- Libraries can import from other libraries
- No circular dependencies
- App imports from libraries via `@erp/*` workspace packages

---

## Key Files Reference

| What                      | Where                                          |
| ------------------------- | ---------------------------------------------- |
| Sidebar navigation config | `libs/shared/ui/src/lib/nav-config.ts`         |
| Theme CSS variables       | `apps/erp-shell/src/styles/app.css`            |
| Auth mock users           | `libs/shared/auth/src/mock-users.ts`           |
| Tenant mock config        | `libs/shared/tenant/src/mock-tenants.ts`       |
| Route generator           | `tools/generators/route/`                      |
| UI component library      | `libs/shared/ui/src/`                          |
| App entry + providers     | `apps/erp-shell/src/app/app.tsx`               |
| Root layout               | `apps/erp-shell/src/routes/__root.tsx`         |
| Auth layout + shell       | `apps/erp-shell/src/routes/_authenticated.tsx` |
| Data access layer         | `libs/shared/data-access/src/`                 |
| Config engine (forms)     | `libs/shared/config-engine/src/`               |

## Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** — System design, tech stack, dependency flow
- **[Developer Guide](docs/DEVELOPER-GUIDE.md)** — How-to for tables, forms, routing, auth, styling
