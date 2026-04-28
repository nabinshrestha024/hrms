import nx from '@nx/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  // Use react-base and react-typescript from Nx, but skip react-jsx
  // because eslint-plugin-react@7.37.5 is incompatible with ESLint 10
  // (getFilename API was removed). Configure react-hooks and jsx-a11y directly.
  ...nx.configs['flat/react-base'].map((cfg) => ({
    ...cfg,
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  })),
  ...nx.configs['flat/react-typescript'].map((cfg) => ({
    ...cfg,
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/anchor-is-valid': [
        'warn',
        { aspects: ['noHref', 'invalidHref'] },
      ],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/iframe-has-title': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/no-access-key': 'warn',
      'jsx-a11y/no-distracting-elements': 'warn',
      'jsx-a11y/no-redundant-roles': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'jsx-a11y/scope': 'warn',
    },
  },
  {
    // Excludes features so the base config's Phase 0.1 features rules
    // (no-restricted-syntax for hex / oklch in className) survive
    // unshadowed. Features have zero default exports today, so dropping
    // the App-permissive selector here is safe — they fall through to
    // the base apps override which turns no-restricted-syntax off, then
    // the features-scoped block in the base re-enables it for hex/oklch.
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['**/features/**'],
    rules: {
      // Allow default export only for app.tsx
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'ExportDefaultDeclaration:not([declaration.id.name="App"])',
          message:
            'Use named exports. Only app.tsx may use default export.',
        },
      ],
    },
  },
  // Route files — allow default-like patterns from TanStack Router (createFileRoute)
  {
    files: ['src/routes/**/*.tsx'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  // Phase 0.1 — features hex/oklch ban (re-applied here so it survives
  // the nx flat/typescript config's `no-restricted-syntax: WithStatement`
  // which is loaded AFTER baseConfig and would otherwise override.)
  // ESCALATE 'warn' → 'error' after Phase 6.1 in IMPROVEMENT-PLAN.md.
  {
    files: ['**/features/**/*.ts', '**/features/**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'warn',
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
