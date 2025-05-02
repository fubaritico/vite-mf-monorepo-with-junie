import { QueryClient } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { ReactQueryWrapper } from './react-query'

import type { RouteComponent } from '../components/List'
import type { RenderOptions } from '@testing-library/react'

/**
 * Renders a component with a router provider (v7), One route config
 *
 * @param Component - the component to render and test
 * @param routes - the route to match as declared in the router configuration
 * @param path - the path to navigate to, supposed to match the route
 * @param options - additional options to pass to the render method
 * @param queryClient - the query client to use for the test
 */
export const renderWithRouter = (
  Component: RouteComponent,
  routes: string | string[] = '',
  path: string | string[] = '/',
  options?: Omit<RenderOptions, 'wrapper'>,
  queryClient = new QueryClient()
) => {
  const router = createMemoryRouter(
    Array.isArray(routes)
      ? routes.map((route) => ({
          path: route,
          element: <Component />,
          loader: Component.loader(queryClient),
        }))
      : [
          {
            path: routes,
            element: <Component />,
            loader: Component.loader(queryClient),
          },
        ],
    {
      initialEntries: Array.isArray(path) ? path : [path],
    }
  )
  return render(<RouterProvider router={router} />, {
    ...options,
  })
}

/**
 *
 * @param Component - the component to render and test
 * @param routes - the route to match as declared in the router configuration
 * @param path - the path to navigate to, supposed to match the route
 * @param options - additional options to pass to the render method
 */
export const renderReactQueryWithRouter = (
  Component: RouteComponent,
  routes: string | string[] = '',
  path: string | string[] = '/',
  options?: RenderOptions
) => {
  return renderWithRouter(Component, routes, path, {
    wrapper: ReactQueryWrapper,
    ...options,
  })
}
