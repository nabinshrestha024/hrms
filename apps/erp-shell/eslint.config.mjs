import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'].map((cfg) => ({
    ...cfg,
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  })),
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
