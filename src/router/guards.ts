import type { Router } from 'vue-router'

import { DEV_ROLE, DEV_SKIP_AUTH } from '@/lib/dev'
import { useAuthStore } from '@/stores/auth'

export function registerRouterGuards(router: Router) {
  router.beforeEach(async (to) => {
    const auth = useAuthStore()

    if (DEV_SKIP_AUTH) {
      if (!auth.user) auth.enableDevBypass()

      if (to.path === '/' || to.path === '/login' || to.path === '/register') {
        return auth.redirectPathForRole(DEV_ROLE)
      }

      if (to.meta.requiresAuth) return true
    }

    if (!auth.user && auth.token) {
      try {
        await auth.fetchMe()
      } catch {
        auth.logout()
      }
    }

    if (to.meta.guest && auth.isAuthenticated) {
      return auth.redirectPathForRole(auth.user!.role)
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }

    if (to.meta.role && auth.user && auth.user.role !== to.meta.role) {
      return auth.redirectPathForRole(auth.user.role)
    }

    return true
  })
}
