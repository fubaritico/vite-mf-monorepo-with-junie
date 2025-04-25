import { QueryClient } from '@tanstack/react-query'
import { RouteObject } from 'react-router-dom'

import App from './App'
import List from './components/List'

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
        index: true,
        element: <List />,
        loader: List.loader(queryClient),
      },
    ],
  },
]
