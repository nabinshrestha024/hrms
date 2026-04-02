import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'].map((cfg) => ({
    ...cfg,
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // ── No hardcoded colors in UI components ──
      // Enforce using design tokens (bg-primary, text-foreground) instead of
      // raw Tailwind colors (bg-white, text-black, bg-blue-500)
      // Exception: sidebar uses exact Figma hex values (#312C85, #0D0E0F)
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'Literal[value=/\\bbg-(white|black|red|blue|green|yellow|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose)-\\d/]',
          message:
            'Use design tokens (bg-primary, bg-card, bg-muted) instead of raw Tailwind colors. See app.css for available tokens.',
        },
        {
          selector:
            'Literal[value=/\\btext-(white|black|red|blue|green|yellow|gray|slate|zinc|neutral)-\\d/]',
          message:
            'Use design tokens (text-foreground, text-muted-foreground) instead of raw Tailwind colors.',
        },
      ],

      // No console.log in library code
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'no-console': 'off',
      'no-restricted-syntax': 'off',
    },
  },
  {
    ignores: ['**/out-tsc'],
  },
];
