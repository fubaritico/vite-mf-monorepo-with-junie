import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import topLevelAwait from 'vite-plugin-top-level-await'
import { federation } from '@module-federation/vite'
import dotenv from 'dotenv'
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

import type { ModuleFederationOptions } from '@module-federation/vite/lib/utils/normalizeModuleFederationOptions'
import type { CommonServerOptions } from 'vite'

dotenv.config()

const remoteConfig: ModuleFederationOptions = {
  name: 'detail',
  filename: 'remoteEntry.js',
  exposes: {
    './Detail': './src/components/Detail',
    './routes': './src/routes',
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

const proxyOptions: CommonServerOptions = {
  proxy: {
    '/@mf-types.zip': {
      target: `http://localhost:${process.env.REMOTE_DETAIL_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
    },
    '/remoteEntry.js': {
      target: `http://localhost:${process.env.REMOTE_DETAIL_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/remoteEntry.js`,
    },
    '/mf-manifest.json': {
      target: `http://localhost:${process.env.REMOTE_DETAIL_PORT}`,
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/mf-manifest.json`,
    },
  },
}

export default defineConfig(({ mode }) => ({
  plugins: [
    ...(mode === 'development'
      ? [
          NativeFederationTypeScriptRemote({
            tsConfigPath: './tsconfig.json',
            moduleFederationConfig: remoteConfig,
            deleteTypesFolder: true,
            typesFolder: '@mf-types',
            compilerInstance: 'tsc',
          }),
        ]
      : []),
    federation({
      ...remoteConfig,
    }),
    react(),
    // Allow CSS to be injected in host app
    cssInjectedByJsPlugin({
      relativeCSSInjection: true,
    }),
    topLevelAwait(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  ...(mode === 'development'
    ? {
        server: {
          port: parseInt(process.env.REMOTE_DETAIL_PORT),
          strictPort: true,
          ...proxyOptions,
          fs: {
            allow: ['./dist/mf-manifest.json', 'dist', 'src'],
          },
        },
      }
    : {}),
}))
