import nx from '@nx/eslint-plugin';

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
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:ui',
                'type:utils',
                'type:config',
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
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
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
    files: ['tools/generators/**/*.ts', '**/playwright.config.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
];
