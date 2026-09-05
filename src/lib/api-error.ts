export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function friendlyApiMessage(status: number, raw?: string): string {
  if (raw) return raw
  if (status === 401) return 'Invalid credentials or session expired.'
  if (status === 403) return 'You do not have permission for this action.'
  if (status === 404) return 'Resource not found.'
  if (status >= 500) return 'Server error. Please try again later.'
  return 'Something went wrong.'
}
