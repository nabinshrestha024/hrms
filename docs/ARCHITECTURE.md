# Architecture Guide

## Tech Stack

| Layer           | Technology                                        |
| --------------- | ------------------------------------------------- |
| Monorepo        | Nx 22.6                                           |
| Package Manager | pnpm 10 (workspaces)                              |
| Language        | TypeScript 5.9 (strict)                           |
| UI Framework    | React 19                                          |
| Bundler         | Vite 8                                            |
| Styling         | Tailwind CSS v4 + shadcn/ui (Radix primitives)    |
| Routing         | TanStack Router (file-based)                      |
| Server State    | TanStack React Query                              |
| Client State    | Zustand                                           |
| URL State       | nuqs                                              |
| Forms           | React Hook Form + Zod + Config Engine             |
| Testing         | Vitest + Testing Library (unit), Playwright (e2e) |
| CI              | GitHub Actions                                    |

## Project Structure

```
hrms/
├── apps/
│   ├── erp-shell/              # Main SPA application
│   │   ├── src/
│   │   │   ├── app/            # App component + providers
│   │   │   ├── components/     # App-specific components (breadcrumb)
│   │   │   ├── mocks/          # Mock data for development
│   │   │   ├── routes/         # TanStack Router file-based routes
│   │   │   │   ├── __root.tsx              # Root layout (error boundary, toaster)
│   │   │   │   ├── _authenticated.tsx      # Auth guard layout (sidebar, topbar)
│   │   │   │   ├── _authenticated/         # Protected pages
│   │   │   │   ├── login.tsx               # Public login page
│   │   │   │   └── unauthorized.tsx        # 403 page
│   │   │   └── styles/         # Global CSS + theme variables
│   │   └── vite.config.mts     # Vite config with plugins
│   └── erp-shell-e2e/          # Playwright E2E tests
│
├── libs/shared/                # Shared libraries
│   ├── ui/                     # Design system (see below)
│   ├── auth/                   # Authentication + RBAC
│   ├── tenant/                 # Multi-tenancy
│   ├── data-access/            # API client + React Query
│   ├── config-engine/          # JSON-driven form renderer
│   ├── plugin-core/            # Plugin/extension system
│   ├── env/                    # Environment variables
│   └── utils/                  # cn(), formatDate, formatCurrency
│
├── tools/generators/           # Nx code generators
│   └── route/                  # Route scaffolding generator
│
└── docs/                       # Documentation
```

## Shared Libraries — What Each Does

### `@erp/ui` — Design System

The component library. Contains everything visual.

```
ui/src/
├── primitives/         # Low-level Radix UI wrappers (Button, Input, Dialog, etc.)
├── components/         # Composed components
│   ├── shell-layout    # App shell (sidebar + topbar + content)
│   ├── icon-bar        # Left icon navigation strip (64px, dark)
│   ├── sub-nav         # Module sub-navigation panel (indigo)
│   ├── top-bar         # Header (Clock In, notifications, user)
│   ├── mobile-nav      # Bottom mobile navigation
│   ├── data-table/     # Full table system (sort, filter, paginate)
│   ├── page-heading    # Simple page heading bar (title + subtitle + actions)
│   ├── list-page       # Full list page shell (search, filter, card/table toggle)
│   ├── dialog/         # Dialog system (see docs/DIALOGS.md)
│   │   ├── form-dialog-trigger     → <FormDialog>            (default, self-managed state)
│   │   ├── controlled-form-dialog  → <ControlledFormDialog>  (parent-owned state)
│   │   ├── confirm-dialog          → <ConfirmDialog>         (destructive confirmations)
│   │   ├── dialog-close-context    → useDialogClose()        (form → dialog close hook)
│   │   └── form-id-context         → useFormId()             (form id auto-wiring)
│   └── toaster         # Toast notification container
├── hooks/
│   ├── use-data-table          # TanStack Table wrapper
│   ├── use-server-table-state  # URL-synced server-driven table state
│   └── use-toast
└── lib/
    └── nav-config      # Sidebar navigation configuration
```

### `@erp/auth` — Authentication + RBAC

- `useAuth()` — login state, user object, logout
- `useAbility()` — check permissions
- `<Can action="create" subject={PERM_SUBJECTS.HR_EMPLOYEES}>` — declarative permission gates. The `subject` is one of the constants in `PERM_SUBJECTS` (`hr:employees`, `assets:items`, `documents:reviews`, `master:holiday-types`, …); `action` is from `PERM_ACTIONS` (`read`/`create`/`update`/`delete`/`approve`/`reject`/`assign`/`return`). Permission strings are joined as `${subject}:${action}` and checked against the user's `permissions[]`.
- Permission constants live in `permissions.ts` (re-exported from the barrel). Three role bundles compose them: `ADMIN_PERMISSIONS` (full CRUD across every resource), `HR_MANAGER_PERMISSIONS` (read + manage employees + approve leave + manage assets), `EMPLOYEE_PERMISSIONS` (self-service only).
- `<RouteGuard>` — defense-in-depth for direct URL navigation. Kept exported but applied opportunistically — button-level `<Can>` is the primary safety mechanism.
- Mock users seeded from the role bundles (admin@gmail.com / hr@gmail.com / emp@gmail.com); see `mock-users.ts`.

### `@erp/tenant` — Multi-Tenancy

- Resolves tenant from subdomain (`acme.erp.local` → `acme`)
- Applies theme colors via CSS variables
- `useTenant()` — access tenant config, dark mode toggle
- Each tenant has: modules, branding, theme, locale, currency

### `@erp/data-access` — Data Layer

- `ApiClient` — typed HTTP client with auth token injection
- `QueryProvider` — React Query setup (5min stale, 1 retry)
- `createTypedQuery/Mutation` — Zod-validated query factories
- **Schemas (canonical)** — every domain entity has a Zod schema in `src/schemas/*.schema.ts`: `employeeSchema`, `branchSchema`, `departmentSchema`, `holidayTypeSchema`, `currencySchema`, `jobLevelSchema`, `workTypeSchema`, `leavePayTypeSchema`, `holidaySchema`, `shiftSchema`, `workWeekConfigSchema` (singleton), `leaveTypeSchema`, `missingDocumentSchema`, `documentReviewSchema`, `employeeDocumentSchema`, `documentCategorySchema`, `documentTemplateSchema`, `assetSchema`, `assetCategorySchema`, `attendanceRecordSchema`, `leaveRequestSchema`, `directoryEntrySchema`. Each ships matching `create*Schema` (omit id/timestamps) and `update*Schema` (partial of create).
- **Query hooks** — `useXxxList`, `useXxx(id)`, `useCreateXxx`, `useUpdateXxx`, `useDeleteXxx` per resource. Singletons (e.g. `work-week-config`) expose `useXxxConfig` + `useUpdateXxxConfig` only.
- Filter schemas are kept as plain `z.object({...})` (not extending `listParamsSchema`) so default-bearing fields stay optional in `z.infer`. See the comment block at the top of `holiday-type.schema.ts` for the rationale.

### `@erp/config-engine` — Form Engine

- `FormRenderer` — renders forms from JSON config
- `WidgetRegistry` — register custom form widgets
- Builds Zod schemas from field definitions at runtime
- Built-in widgets: text, number, select, date, boolean

### `@erp/utils` — Utilities

- `cn()` — Tailwind class merge (clsx + tailwind-merge)
- `formatDate()` / `formatDateTime()` / `formatTime()` — Intl-based
- `formatCurrency()` / `formatNumber()` / `formatPercent()` — Intl-based

## Provider Architecture

Providers wrap the entire app in `app.tsx`:

```
TenantProvider        ← Resolves tenant, applies theme
  └─ QueryProvider    ← React Query client
      └─ AuthProvider ← Auth state (Zustand store)
          └─ AbilityProvider  ← RBAC permissions
              └─ PluginProvider   ← Extension slots
                  └─ RouterProvider    ← TanStack Router
```

## Routing Architecture

TanStack Router uses **file-based routing**. The file path = the URL path.

```
routes/
├── __root.tsx                              → Root layout (always rendered)
├── index.tsx                               → "/" redirects to /dashboard
├── login.tsx                               → Public login page
├── unauthorized.tsx                        → 403 page
├── _authenticated.tsx                      → Layout: auth guard + shell (sidebar/topbar)
└── _authenticated/
    ├── dashboard/index.tsx                 → /dashboard (main dashboard)
    ├── employee/
    │   ├── index.tsx                       → /employee (employee management)
    │   ├── employee-details.$id.tsx        → /employee/employee-details/:id (detail)
    │   ├── assign-approval.$id.tsx         → /employee/assign-approval/:id
    │   └── document-view.$name.tsx         → /employee/document-view/:name
    ├── leave-management/
    │   ├── leave-request.tsx               → /leave-management/leave-request
    │   └── my-request.tsx                  → /leave-management/my-request
    ├── attendance/{my-attendance,work-record,attendance-record}.tsx
    ├── assets-management/{all-assets,assignment-history,index}.tsx
    ├── document-management/{assign-document,…}.tsx
    ├── master-setup/{holiday,currency-type,job-level,work-type,leave-type}.tsx
    ├── configuration/{holidays,shifts,work-week,leave-type,index}.tsx
    └── policy-configuration/{leave-deduction,sandwich-rule,workflow,payroll}.tsx
```

**Key rules:**

- `_authenticated.tsx` = layout route (has `<Outlet />`, wraps children with sidebar)
- `_authenticated/` = directory for child routes under that layout
- `$id` / `$name` = dynamic parameter (accessed via `useParams()`)
- Files prefixed with `_` are layout routes (not directly navigable)
- `beforeLoad: () => ({ breadcrumb: 'Label' })` sets the top-level breadcrumb. A second-level segment can be supplied via `subbreadcrumb: 'Sub Label'` and is rendered by the topbar after the primary crumb (used by master-setup / configuration / policy-configuration sub-pages).

## Sidebar Navigation

The sidebar has two parts:

1. **IconBar** (64px, `#0D0E0F` black) — always visible, shows module icons
2. **SubNav** (200px, `#312C85` indigo) — shows when active module has sub-items

Navigation is configured in `libs/shared/ui/src/lib/nav-config.ts`:

```typescript
// Each module has: id, label, icon, href, modules (tenant gates), subItems
export const navModules: NavModule[] = [
  {
    id: 'leave',
    label: 'Leave',
    icon: TentTree,
    href: '/leave/requests',
    modules: ['leave'], // Only shown if tenant has 'leave' module
    subItems: [
      { label: 'Leave Requests', href: '/leave/requests', icon: ListChecks },
      { label: 'My Requests', href: '/leave/my-requests', icon: FileText },
      { label: 'Leave Balance', href: '/leave/balance', icon: CalendarDays },
    ],
  },
  // ...
];
```

To add a new sidebar module, add an entry to `navModules` and add the module key to `modulesEnabled` in the tenant config.

## State Management

Three types of state, each with a dedicated tool:

| State Type       | Tool        | Example                                           |
| ---------------- | ----------- | ------------------------------------------------- |
| **Server state** | React Query | Employee list, leave requests (cached, refetched) |
| **Client state** | Zustand     | Auth store (user, permissions, token)             |
| **URL state**    | nuqs        | Table pagination, sorting, search, filters        |

**Rule:** If state needs to survive page refresh or be shareable via URL, use nuqs. If it's server data, use React Query. If it's app-wide client state, use Zustand. For local UI state (modals, toggles), use React `useState`.

## Dependency Flow

```
erp-shell (app)
  ├── @erp/ui              ← design system
  ├── @erp/auth            ← authentication
  ├── @erp/tenant          ← multi-tenancy
  ├── @erp/data-access     ← API + queries
  ├── @erp/config-engine   ← form engine
  ├── @erp/plugin-core     ← plugins
  ├── @erp/env             ← env vars
  └── @erp/utils           ← utilities

@erp/ui → @erp/utils
@erp/config-engine → @erp/ui, @erp/utils
@erp/auth → @tanstack/react-router
@erp/data-access → zod, @tanstack/react-query
```

Libraries never import from `apps/`. Libraries can import from other libraries. No circular dependencies.

## Theming

Colors are defined as CSS variables in `apps/erp-shell/src/styles/app.css` using oklch / hex, exposed to Tailwind via the `@theme inline` block at the top of the same file.

```css
:root {
  --primary: #4f39f6;
  --sidebar: oklch(0.07 0 0);
  /* … */
}

.dark {
  /* dark-mode overrides */
}
```

**Token list (the abstractions every feature uses):**

| Group     | Tokens                                                                                                                                                            |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface   | `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `muted`, `muted-foreground`                                               |
| Brand     | `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground`, `outline`                                                    |
| Status    | `destructive`, `destructive-foreground`, `info`, `info-foreground`, `success`, `success-foreground`, `warning`, `warning-foreground`                              |
| Sidebar   | `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-primary-foreground`, `sidebar-accent`, `sidebar-accent-foreground`, `sidebar-border`, `sidebar-ring` |
| Charts    | `chart-1` … `chart-7`                                                                                                                                             |
| Badges    | `badge-text-1` … `badge-text-8`                                                                                                                                   |
| Card text | `card-text`, `alert-background`                                                                                                                                   |

Use the Tailwind utility shorthand: `bg-primary`, `text-foreground`, `border-border`, `border-l-outline`, `bg-info`, `text-warning-foreground`, etc. **Literal hex / oklch in `className` is a build-error** (ESLint `no-restricted-syntax`); add a token instead.

Tenant overrides are applied at runtime via `apply-theme.ts`. `COLOR_KEY_TO_CSS_VAR` maps camelCased keys (`primaryForeground`, `cardForeground`, `infoForeground`, …) to the underlying CSS custom property. `MOCK_TENANTS.acme` demonstrates three concrete overrides (teal primary, teal-50 card, sky info) so the demo and acme tenants render distinctly without any feature-code change.

## Bundle Optimization

Vite is configured with manual chunk splitting:

```
react-vendor     → react, react-dom
ui-vendor        → @radix-ui, class-variance-authority
tanstack-vendor  → @tanstack/react-router, react-query, react-table
```
