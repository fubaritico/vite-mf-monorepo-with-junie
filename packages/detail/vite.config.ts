import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'detail',
      filename: 'remoteEntry.js',
      exposes: {
        './Detail': './src/components/Detail',
        './routes': './src/routes',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
    react(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5002,
  },
});
