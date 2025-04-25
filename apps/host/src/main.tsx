import { init } from '@module-federation/runtime'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'

import ErrorBoundary from './components/ErrorBoundary'
import { queryClient, router } from './router'

// Initialize module federation runtime
init({
  name: 'host',
  remotes: [
    {
      name: 'list',
      alias: 'list',
      entry: `http://localhost:${import.meta.env.VITE_REMOTE_LIST_PORT as string}/remoteEntry.js`,
    },
    {
      name: 'detail',
      alias: 'detail',
      entry: `http://localhost:${import.meta.env.VITE_REMOTE_DETAIL_PORT as string}/remoteEntry.js`,
    },
  ],
  shared: {
    react: [
      {
        version: '19.0.0',
        scope: 'default',
        shareConfig: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
      },
    ],
    'react-dom': [
      {
        version: '19.0.0',
        scope: 'default',
        shareConfig: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
      },
    ],
    'react-router-dom': [
      {
        version: '7.0.0',
        scope: 'default',
        shareConfig: {
          singleton: true,
          requiredVersion: '^7.0.0',
        },
      },
    ],
    '@tanstack/react-query': [
      {
        version: '5.74.4',
        scope: 'default',
        shareConfig: {
          singleton: true,
          requiredVersion: '^5.74.4',
        },
      },
    ],
  },
})

const root = document.getElementById('root')
if (!root) {
  throw new Error('root not found')
}

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
)
