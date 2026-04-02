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
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
];
