import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
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
    // Override or add rules here
    rules: {},
  },
  {
    ignores: ['**/out-tsc'],
  },
];
