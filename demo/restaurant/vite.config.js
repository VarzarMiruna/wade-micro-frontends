import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'RestaurantApp',
      formats: ['iife'],
      fileName: () => 'main.js',
    },
  },
  server: { port: 4002, strictPort: true },
  preview: { port: 4002, strictPort: true, headers: { 'Timing-Allow-Origin': '*' } },
}));
