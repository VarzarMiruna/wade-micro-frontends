import { defineConfig } from 'vite';

// No framework: only browser standards. Vite just bundles it into dist/main.js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'ProfileApp',
      formats: ['iife'],
      fileName: () => 'main.js',
    },
  },
  server: { port: 4003, strictPort: true },
  preview: { port: 4003, strictPort: true, headers: { 'Timing-Allow-Origin': '*' } },
});
