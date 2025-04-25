declare module '@junie-monorepo/shared' {
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
  ): Promise<boolean>
}
