/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/starwars-rsschool/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testsSetup.ts',
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/components/**/index.{js,jsx,ts,tsx}',
        'src/context/**/index.{js,jsx,ts,tsx}',
        'src/pages/**/index.{js,jsx,ts,tsx}',
        'src/testsSetup.{js,ts}',
        'src/main.tsx',
        'src/types/*.type.{tsx,ts}',
        'src/**/*.d.ts',
      ],
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
