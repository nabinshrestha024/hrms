import nx from '@nx/eslint-plugin';

// ── Phase 0.1 — Escalation policy (see docs/IMPROVEMENT-PLAN.md) ─────
//
// All Phase 0.1 lint rules below are at level 'warn' initially. Each
// escalates to 'error' at the corresponding plan acceptance gate so the
// final state is strict but the migration weeks don't block CI:
//
//   no-restricted-imports (dead shells)   warn → error  after Phase 1.3
//   no console.warn / log in features     warn → error  after Phase 3.5
//   no hex / oklch in className           warn → error  after Phase 6.1
//
// Rationale: errors-only-per-phase leaves a multi-week window where new
// regressions of the exact patterns we're cleaning up would slip past CI.
// Warns-now puts the violation in the IDE the moment it's typed, with a
// counter that goes down as migrations land.
//
// To escalate a rule, change the matching block's level string from
// 'warn' to 'error'. Each Phase's checkbox in IMPROVEMENT-PLAN.md
// includes the lint-level flip as part of acceptance.
// ─────────────────────────────────────────────────────────────────────

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/test-output',
      '**/routeTree.gen.ts',
    ],
  },

  // ── Module Boundary Rules ──────────────────────────────────────────
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: false,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:feature',
                'type:data-access',
                'type:ui',
                'type:utils',
                'type:config',
                'type:auth',
                'type:tenant',
                'type:plugin',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:ui',
                'type:utils',
                'type:config',
                'type:auth',
                'type:tenant',
                'type:plugin',
              ],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:utils'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:utils'],
            },
            {
              sourceTag: 'type:config',
              onlyDependOnLibsWithTags: ['type:ui', 'type:utils'],
            },
            {
              sourceTag: 'type:auth',
              onlyDependOnLibsWithTags: ['type:utils'],
            },
            {
              sourceTag: 'type:tenant',
              onlyDependOnLibsWithTags: ['type:utils'],
            },
            {
              sourceTag: 'type:plugin',
              onlyDependOnLibsWithTags: ['type:ui', 'type:utils'],
            },
            {
              sourceTag: 'type:utils',
              onlyDependOnLibsWithTags: ['type:utils'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
          ],
        },
      ],
    },
  },

  // ── Project-Wide Rules ─────────────────────────────────────────────
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: {
      // ── Exports ──
      // No default exports — use named exports everywhere
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message:
            'Use named exports instead of default exports. This keeps imports consistent across the codebase.',
        },
      ],

      // ── Imports ──
      // No deep imports from workspace packages — use barrel exports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@erp/*/src/*'],
              message:
                'Import from the package root (e.g., "@erp/ui") instead of deep paths.',
            },
            {
              group: ['clsx'],
              message:
                'Use cn() from "@erp/utils" instead of clsx directly.',
            },
            {
              group: ['tailwind-merge'],
              message:
                'Use cn() from "@erp/utils" instead of twMerge directly.',
            },
          ],
        },
      ],

      // ── No console in libraries ──
      // (overridden in apps to allow console.warn/error)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // ── App-specific overrides ─────────────────────────────────────────
  {
    files: ['apps/**/*.ts', 'apps/**/*.tsx'],
    rules: {
      // Allow default export ONLY for app.tsx (React entry)
      'no-restricted-syntax': 'off',
      // Allow console in apps (for dev/debugging)
      'no-console': 'off',
    },
  },

  // ── Route files must have breadcrumb ───────────────────────────────
  {
    files: ['apps/**/routes/_authenticated/**/*.tsx'],
    rules: {
      // Warn if route files don't contain breadcrumb pattern
      // (can't fully enforce content, but the word "breadcrumb" should appear)
      'no-warning-comments': [
        'warn',
        { terms: ['TODO: add breadcrumb'], location: 'anywhere' },
      ],
    },
  },

  // ── Test file rules ────────────────────────────────────────────────
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'no-console': 'off',
      'no-restricted-syntax': 'off',
      'no-constant-binary-expression': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },

  // ── cn() wrapper exception ─────────────────────────────────────────
  // The cn() helper is the *one* allowed importer of clsx + tailwind-merge.
  // Everywhere else, the no-restricted-imports rule above forbids them.
  // Only one cn.ts exists in the repo — `**/cn.ts` is unambiguous and
  // also works when each lib's eslint.config.mjs extends this base from
  // its own cwd (where the file path is just `src/cn.ts`).
  {
    files: ['**/cn.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },

  // ── Mock file rules ────────────────────────────────────────────────
  {
    files: ['**/mocks/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // ── Generator & E2E config rules ────────────────────────────────────
  {
    files: [
      'tools/generators/**/*.ts',
      '**/playwright.config.ts',
      '**/vite.config.{ts,mts,cts}',
      '**/vitest.config.{ts,mts,cts}',
    ],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  // ── Phase 0.1 — features-scoped rules (warn → error per phase) ──────
  //
  // All Phase 0.1 violations live in `apps/erp-shell/src/features/**`.
  // Scoping the rules there is intentional: it keeps libs / mocks / app
  // shell at their original strictness, matches the migration target
  // surface area, and uses an unanchored glob (`**/features/**`) that
  // works regardless of eslint cwd (workspace root vs. inside the app).
  //
  // Three rules:
  //
  // (a) no-restricted-imports: deprecated list-shell paths. Replicates
  //     the project-wide patterns (clsx, tailwind-merge, @erp/*/src/*)
  //     because ESLint flat config replaces, not merges, on rule key
  //     conflicts.
  //     ESCALATED 'warn' → 'error' on 2026-04-27 — Phase 1.3 done, both
  //     shells deleted, zero import violations across features.
  //
  // (b) no-console: features must call real mutations, not log
  //     placeholders. Only `console.error` is allowed (genuine error
  //     logging in catch blocks).
  //     ESCALATE 'warn' → 'error' after Phase 3.5 (zero `console.warn`).
  //
  // (c) no-restricted-syntax: literal hex / oklch in className bypasses
  //     the tenant theming system. Use design tokens (`bg-muted`,
  //     `text-foreground`, `text-primary`, `border-border`, …) declared
  //     in apps/erp-shell/src/styles/app.css.
  //     ESCALATE 'warn' → 'error' after Phase 6.1 (zero literal colors).
  {
    files: ['**/features/**/*.ts', '**/features/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@erp/*/src/*'],
              message:
                'Import from the package root (e.g., "@erp/ui") instead of deep paths.',
            },
            {
              group: ['clsx'],
              message:
                'Use cn() from "@erp/utils" instead of clsx directly.',
            },
            {
              group: ['tailwind-merge'],
              message:
                'Use cn() from "@erp/utils" instead of twMerge directly.',
            },
            {
              group: ['**/document-management-header', '**/table-header'],
              message:
                'Deprecated shell (deleted in Phase 1.3). Use <ListPage> from @erp/ui. See docs/IMPROVEMENT-PLAN.md Phase 1.',
            },
          ],
        },
      ],
      'no-console': ['warn', { allow: ['error'] }],
      // Phase 6.1 acceptance gate met (2026-04-28): codemod migrated all
      // 168 baseline hex/oklch literals to design tokens. Escalate to
      // 'error' so any new literal blocks the build.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'JSXAttribute[name.name="className"] Literal[value=/#[0-9a-fA-F]{3,8}|oklch\\(/]',
          message:
            'Use design tokens (bg-muted, text-foreground, text-primary, border-border, etc.) instead of literal hex / oklch colors. See docs/IMPROVEMENT-PLAN.md Phase 6.',
        },
      ],
    },
  },
];
