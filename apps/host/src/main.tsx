import { init } from '@module-federation/runtime'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'

// Initialize module federation runtime
init({
  name: 'host',
  remotes: [
    {
      name: 'list',
      alias: 'list',
      entry: 'http://localhost:5001/remoteEntry.js',
    },
    {
      name: 'detail',
      alias: 'detail',
      entry: 'http://localhost:5002/remoteEntry.js',
    },
  ],
  shared: {
    react: [
      {
        version: '19.0.0',
        scope: 'default',
        lib: () => ({ version: '19.0.0' }),
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
        lib: () => ({ version: '19.0.0' }),
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
        lib: () => ({ version: '7.0.0' }),
        shareConfig: {
          singleton: true,
          requiredVersion: '^7.0.0',
        },
      },
    ],
  },
})

// Define the routes with lazy loading
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        async lazy() {
          // Lazy load the List component from the 'list' remote
          const { default: List } = await import('list/List')
          return { Component: List }
        },
      },
      {
        path: 'detail/:id',
        async lazy() {
          // Lazy load the Detail component from the 'detail' remote
          const { default: Detail } = await import('detail/Detail')
          return { Component: Detail }
        },
      },
    ],
  },
])

const root = document.getElementById('root')
if (!root) {
  throw new Error('root not found')
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
)
