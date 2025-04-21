import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import { NativeFederationTypeScriptHost } from '@module-federation/native-federation-typescript/vite'
import dotenv from 'dotenv'

dotenv.config()

const moduleFederationConfig = {
  name: 'host',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    list: `list@http://localhost:${process.env.REMOTE_LIST_PORT}/mf-manifest.json`,
    detail: `detail@http://localhost:${process.env.REMOTE_DETAIL_PORT}/mf-manifest.json`,
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
      entry: `http://localhost:${process.env.REMOTE_LIST_PORT}/remoteEntry.js`,
      entryGlobalName: 'list',
      sharedScope: 'default',
    },
    detail: {
      type: 'module',
      name: 'detail',
      entry: `http://localhost:${process.env.REMOTE_DETAIL_PORT}/remoteEntry.js`,
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
    port: parseInt(process.env.HOST_PORT),
    strictPort: true,
  },
}))
