# Employee Feature Module

This is the reference implementation. Copy this folder when creating a new module.

## Structure

```
employees/
├── index.ts                 — barrel export (public API)
├── columns.tsx              — table column definitions
├── employee-toolbar.tsx     — search + filters + view toggle header
├── employee-card-grid.tsx   — grid/card view
├── grid-pagination.tsx      — Figma-style pagination
├── use-employee-table.ts    — hook: URL state + API calls + table instance
├── add-employee/            — multi-step create form
│   ├── schema.ts            — Zod validation + step field groups
│   ├── step-*.tsx           — one file per form step
│   └── add-employee-dialog.tsx — orchestrates steps + mutation
└── assign-access/           — assign access template dialog
```

## How to create a new module

1. Copy this folder to `features/<your-module>/`
2. Rename files: `employee` → `<your-entity>`
3. Update `columns.tsx` with your table columns
4. Update `schema.ts` with your Zod fields
5. Update `use-<module>-table.ts` with your API hook
6. Create your route in `routes/_authenticated/` — import from the feature
7. Add mock data in `mocks/modules/<your-module>/`

## Key patterns

- **Route file = composition only** (~50-80 lines max)
- **Hook encapsulates all state** — URL params, API calls, table instance
- **Each file < 150 lines** — split if bigger
- **Barrel exports** — every folder has `index.ts`
