import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import { routes } from './routes'

const router = createBrowserRouter(routes)

const root = document.getElementById('root')
if (!root) {
  throw new Error('root not found')
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
