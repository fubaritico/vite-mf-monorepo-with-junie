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
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^19.0.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^19.0.0',
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: '^7.0.0',
    },
    '@tanstack/react-query': {
      singleton: true,
      requiredVersion: '^5.74.4',
    },
  },
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      ...(mode !== 'production'
        ? [NativeFederationTypeScriptHost({ moduleFederationConfig })]
        : []),
      federation(moduleFederationConfig2),
      react(),
    ],
    build: {
      target: 'esnext',
    },
    server: {
      port: parseInt(process.env.HOST_PORT),
      strictPort: true,
    },
  }
})
