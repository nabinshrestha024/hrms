/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/erp-shell',
  server: {
    port: 4200,
    host: '0.0.0.0',
    allowedHosts: ['demo.erp.local', 'acme.erp.local', 'localhost'],
  },
  preview: {
    port: 4200,
    host: '0.0.0.0',
  },
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      quoteStyle: 'single',
    }),
    react(),
    tailwindcss(),
    nxViteTsPaths(),
    visualizer({
      filename: '../../dist/apps/erp-shell/bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom'))
              return 'react-vendor';
            if (
              id.includes('@radix-ui') ||
              id.includes('class-variance-authority')
            )
              return 'ui-vendor';
            if (id.includes('@tanstack')) return 'tanstack-vendor';
          }
          return undefined;
        },
      },
    },
  },
  test: {
    name: '@org/erp-shell',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    pool: 'vmThreads',
    testTimeout: 30000,
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
