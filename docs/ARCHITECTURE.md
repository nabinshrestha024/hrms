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
│   ├── page-header     # Standard page header (title, subtitle, actions)
│   ├── table-page      # Complete table page template
│   ├── form-dialog     # Dialog wrapper for forms
│   └── toaster         # Toast notification container
├── hooks/              # useDataTable, useIsMobile, useToast
└── lib/
    └── nav-config      # Sidebar navigation configuration
```

### `@erp/auth` — Authentication + RBAC

- `useAuth()` — login state, user object, logout
- `useAbility()` — check permissions
- `<Can action="read" subject="hr:employees">` — declarative permission gates
- `<RouteGuard>` — protect routes by permission
- Mock users with role-based permissions (admin, hr_manager, employee)

### `@erp/tenant` — Multi-Tenancy

- Resolves tenant from subdomain (`acme.erp.local` → `acme`)
- Applies theme colors via CSS variables
- `useTenant()` — access tenant config, dark mode toggle
- Each tenant has: modules, branding, theme, locale, currency

### `@erp/data-access` — Data Layer

- `ApiClient` — typed HTTP client with auth token injection
- `QueryProvider` — React Query setup (5min stale, 1 retry)
- `createTypedQuery/Mutation` — Zod-validated query factories
- Schemas: Zod schemas for entities (employee, etc.)
- Query hooks: `useEmployees()`, `useEmployee(id)`, etc.

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
├── __root.tsx                  → Root layout (always rendered)
├── index.tsx                   → "/" redirects to /dashboard
├── login.tsx                   → Public login page
├── unauthorized.tsx            → 403 page
├── _authenticated.tsx          → Layout: auth guard + shell (sidebar/topbar)
└── _authenticated/
    ├── dashboard.tsx           → Layout route (Outlet) for /dashboard/*
    ├── dashboard/
    │   ├── index.tsx           → /dashboard (main dashboard)
    │   └── analytics.tsx       → /dashboard/analytics
    ├── employees.tsx           → /employees (table page)
    ├── employees.$id.tsx       → /employees/:id (detail page)
    ├── leave/
    │   ├── requests.tsx        → /leave/requests
    │   ├── my-requests.tsx     → /leave/my-requests
    │   └── balance.tsx         → /leave/balance
    └── ...
```

**Key rules:**

- `_authenticated.tsx` = layout route (has `<Outlet />`, wraps children with sidebar)
- `_authenticated/` = directory for child routes under that layout
- `$id` = dynamic parameter (accessed via `useParams()`)
- Files prefixed with `_` are layout routes (not directly navigable)
- `beforeLoad: () => ({ breadcrumb: 'Label' })` sets breadcrumb automatically

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

Colors are defined as CSS variables in `apps/erp-shell/src/styles/app.css` using oklch color space.

```css
:root {
  --primary: oklch(0.318 0.157 264.2); /* Indigo #312C85 */
  --sidebar: oklch(0.07 0 0); /* Near-black for icon bar */
  /* ... */
}

.dark {
  --primary: oklch(0.55 0.18 264); /* Lighter indigo for dark mode */
  /* ... */
}
```

Tenant overrides are applied at runtime via `apply-theme.ts`. The tenant config can override any CSS variable.

Tailwind uses these variables: `bg-primary`, `text-foreground`, `border-border`, etc.

## Bundle Optimization

Vite is configured with manual chunk splitting:

```
react-vendor     → react, react-dom
ui-vendor        → @radix-ui, class-variance-authority
tanstack-vendor  → @tanstack/react-router, react-query, react-table
```
