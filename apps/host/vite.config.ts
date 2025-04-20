import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import { NativeFederationTypeScriptHost } from '@module-federation/native-federation-typescript/vite'

const moduleFederationConfig = {
  name: 'host',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    list: 'list@http://localhost:5001/mf-manifest.json',
    detail: 'detail@http://localhost:5002/mf-manifest.json',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
}

const moduleFederationConfig2 = {
  name: 'host',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    list: {
      type: 'module',
      name: 'list',
      entry: 'http://localhost:5001/remoteEntry.js',
      entryGlobalName: 'list',
      sharedScope: 'default',
    },
    detail: {
      type: 'module',
      name: 'detail',
      entry: 'http://localhost:5002/remoteEntry.js',
      entryGlobalName: 'detail',
      sharedScope: 'default',
    },
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
}

export default defineConfig(({ mode }) => ({
  plugins: [
    ...(mode !== 'production'
      ? [NativeFederationTypeScriptHost({ moduleFederationConfig })]
      : []),
    federation(moduleFederationConfig2),
    react(),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5000,
    strictPort: true,
  },
}))
