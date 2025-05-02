import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    workspace: ['packages/*'],
    setupFiles: ['./vitest.setup.ts'],
    disableConsoleIntercept: true,
    coverage: {
      include: ['packages/*/src/**/*'],
    },
    reporters: ['json', 'default'],
    outputFile: './test-output.json',
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      console.log('log in test: ', log)
      if (log === 'message from third party library' && type === 'stdout') {
        return false
      }
    },
  },
})
