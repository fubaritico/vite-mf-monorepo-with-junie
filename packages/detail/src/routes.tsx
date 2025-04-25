import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router-dom'

import App from './App'
import Detail from './components/Detail'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'detail/:id',
        element: <Detail />,
        loader: Detail.loader(queryClient),
      },
    ],
  },
]
