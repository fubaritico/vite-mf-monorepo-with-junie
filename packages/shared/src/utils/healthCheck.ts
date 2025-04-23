import { RetryOptions, retry } from './retry'

export interface HealthCheckOptions {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
}

export const defaultHealthCheckOptions: Required<HealthCheckOptions> = {
  maxRetries: 5,
  retryDelay: 1000,
  timeout: 5000,
}

export async function checkRemoteHealth(
  remoteUrl: string,
  options: HealthCheckOptions = defaultHealthCheckOptions
): Promise<boolean> {
  const { maxRetries, retryDelay, timeout } = {
    ...defaultHealthCheckOptions,
    ...options,
  }

  try {
    await retry(
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => {
          controller.abort()
        }, timeout)

        try {
          const response = await fetch(remoteUrl, {
            signal: controller.signal,
            headers: {
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
            },
          })

          if (!response.ok) {
            throw new Error(
              `Remote health check failed with status ${String(response.status)}`
            )
          }

          return true
        } finally {
          clearTimeout(timeoutId)
        }
      },
      {
        maxRetries,
        retryDelay,
      } as RetryOptions
    )

    return true
  } catch (error) {
    console.error(`Health check failed for ${remoteUrl}:`, error)
    return false
  }
}
