import type { UserRole } from '@/lib/api'

/** Dev-only: skip login and use mock user. Never enable in production builds. */
export const DEV_SKIP_AUTH =
  import.meta.env.DEV && import.meta.env.VITE_DEV_SKIP_AUTH === 'true'

export const DEV_ROLE = (import.meta.env.VITE_DEV_ROLE || 'admin') as UserRole

export const DEV_MOCK_USER = {
  id: 1,
  name: DEV_ROLE === 'admin' ? 'Dev Admin' : 'Dev Siswa',
  email: DEV_ROLE === 'admin' ? 'admin@quizmaster.com' : 'student@quizmaster.com',
  role: DEV_ROLE,
} as const

export const DEV_MOCK_TOKEN = 'dev-bypass-token'
