import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The build produces ONE file, dist/main.js, that the container loads with a <script> tag
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'BrowseApp',
      formats: ['iife'],
      fileName: () => 'main.js',
    },
  },
  server: { port: 4001, strictPort: true },
  preview: { port: 4001, strictPort: true, headers: { 'Timing-Allow-Origin': '*' } },
}));
