import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'list',
    environment: 'jsdom',
    include: ['./**/*.test.tsx'],
    disableConsoleIntercept: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
})
