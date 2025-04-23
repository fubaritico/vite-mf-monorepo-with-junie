import { checkRemoteHealth } from '@junie-monorepo/shared'
import { createRoot } from 'react-dom/client'

const LIST_REMOTE_URL = 'http://localhost:5001'
const DETAIL_REMOTE_URL = 'http://localhost:5002'

async function bootstrap() {
  try {
    // Check health of remote applications
    const [listHealthy, detailHealthy] = await Promise.all([
      checkRemoteHealth(LIST_REMOTE_URL),
      checkRemoteHealth(DETAIL_REMOTE_URL),
    ])

    if (!listHealthy || !detailHealthy) {
      throw new Error('Remote applications are not healthy')
    }

    // Import the main application
    const { default: App } = await import('./main')

    // Render the application
    const rootElement = document.getElementById('root')
    if (!rootElement) {
      throw new Error('Root element not found')
    }
    const root = createRoot(rootElement)
    root.render(<App />)
  } catch (error) {
    console.error('Failed to bootstrap application:', error)
    // Render a fallback UI
    const rootElement = document.getElementById('root')
    if (!rootElement) {
      throw new Error('Root element not found')
    }
    const root = createRoot(rootElement)
    root.render(
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Application Error</h1>
        <p>
          We're having trouble loading the application. Please try again later.
        </p>
        <button
          onClick={() => {
            window.location.reload()
          }}
        >
          Retry
        </button>
      </div>
    )
  }
}

void bootstrap()

export {}
