import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { useState } from 'react'

import type { RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'

export function ReactQueryWrapper({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export const renderWithReactQuery = (
  ui: ReactNode,
  options?: RenderOptions
) => {
  return render(ui, { wrapper: ReactQueryWrapper, ...options })
}
