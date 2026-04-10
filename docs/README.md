# HRMS Documentation

Start here. Pick the doc that matches what you're trying to do.

## I need to…

| Goal                                          | Doc                                                           |
| --------------------------------------------- | ------------------------------------------------------------- |
| Build a new feature page                      | [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md) — full walkthrough |
| Add a form dialog (button → modal)            | [DIALOGS.md](./DIALOGS.md) — `<FormDialog>`                   |
| Add a delete confirmation                     | [DIALOGS.md](./DIALOGS.md) — `<ConfirmDialog>`                |
| Add a list page with sortable/paginated table | [TABLES.md](./TABLES.md) — `useServerTableState`              |
| Look up a quick snippet                       | [CHEATSHEET.md](./CHEATSHEET.md)                              |
| Understand the project layout                 | [ARCHITECTURE.md](./ARCHITECTURE.md)                          |

## Doc index

### Reference docs

| File                                           | What's in it                                                                                                                                                |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md)** | The main guide. Covers routing, table pages, form pages, detail pages, dialogs, auth, data fetching, toasts, styling, testing, and common patterns.         |
| **[DIALOGS.md](./DIALOGS.md)**                 | Deep reference for the three dialog patterns: `<FormDialog>`, `<ControlledFormDialog>`, `<ConfirmDialog>`. Decision tree, props, examples, common mistakes. |
| **[TABLES.md](./TABLES.md)**                   | `useServerTableState` hook reference. URL-synced pagination, sorting, search. Column definitions. Action callbacks.                                         |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)**       | Monorepo layout, library boundaries, dependencies.                                                                                                          |
| **[CHEATSHEET.md](./CHEATSHEET.md)**           | Copy-paste snippets — quickest way to remember syntax.                                                                                                      |

### Internal docs

| Folder         | Contents                                                             |
| -------------- | -------------------------------------------------------------------- |
| `superpowers/` | Implementation plans for major features (kept as historical record). |

## Conventions

- **Don't use** the legacy `useDialogFormStore` / `<LegacyFormDialog />` pattern. See [DIALOGS.md](./DIALOGS.md#-dont-use-legacyformdialog--usedialogformstore) for why and what to use instead.
- **Don't use** the legacy `<form id="hardcoded-string">` magic string pattern. Let `<FormRenderer>` generate the form id from the entity name.
- **Don't fetch** data without passing the React Query `signal` to `client.get/post/...` — see existing query hooks for the pattern.
- **Don't store JSX in state**. Components live in the render tree. Dialogs are no exception — that's what the new dialog patterns exist for.

## Where to find working examples in the codebase

| Pattern                                    | File                                                                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `<FormDialog trigger>` for "Add" button    | `apps/erp-shell/src/features/dashboard/notice.tsx`                                                                                       |
| All three dialog patterns in one component | `apps/erp-shell/src/features/company-setup/branch/branch-management.tsx`                                                                 |
| Server-driven table with URL state         | `apps/erp-shell/src/features/employee/table/use-employee-form.tsx`                                                                       |
| Client-side table with URL state           | `apps/erp-shell/src/features/company-setup/branch/branch-table/use-branch-table.tsx`                                                     |
| Multi-step form dialog                     | `apps/erp-shell/src/features/employee/add-employee/add-employee-dialog.tsx`                                                              |
| Schema + query hook + mock module          | `libs/shared/data-access/src/schemas/employee.schema.ts` + `queries/employee.queries.ts` + `apps/erp-shell/src/mocks/modules/employees/` |

## Reporting issues

If a doc is wrong, outdated, or unclear, edit it directly and open a PR. Docs
live next to the code — keep them in sync.
