import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import topLevelAwait from 'vite-plugin-top-level-await'
import { federation } from '@module-federation/vite'
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite'
import type { ModuleFederationOptions } from '@module-federation/vite/lib/utils/normalizeModuleFederationOptions'
import type { UserConfig, CommonServerOptions } from 'vite'

const remoteConfig: ModuleFederationOptions = {
  name: 'list',
  filename: 'remoteEntry.js',
  exposes: {
    './List': './src/components/List',
    './routes': './src/routes',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
}

const proxyOptions: CommonServerOptions = {
  proxy: {
    '/@mf-types.zip': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
    },
    '/remoteEntry.js': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/remoteEntry.js`,
    },
    '/mf-manifest.json': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/mf-manifest.json`,
    },
  },
}

const config: UserConfig = {
  plugins: [
    NativeFederationTypeScriptRemote({
      tsConfigPath: './tsconfig.json',
      moduleFederationConfig: remoteConfig,
      deleteTypesFolder: true,
      typesFolder: '@mf-types',
      compilerInstance: 'tsc',
    }),
    federation({
      ...remoteConfig,
    }),
    react(),
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
  server: {
    port: 5001,
    strictPort: true,
    ...proxyOptions,
    fs: {
      allow: ['./dist/mf-manifest.json', 'dist', 'src'],
    },
  },
}

export default defineConfig(config)
