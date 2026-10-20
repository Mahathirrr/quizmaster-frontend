import { createRouter, createWebHistory } from 'vue-router'

import { registerRouterGuards } from '@/router/guards'
import { adminRoutes } from '@/router/routes/admin'
import { publicRoutes } from '@/router/routes/public'
import { studentRoutes } from '@/router/routes/student'

const router = createRouter({
  history: createWebHistory(),
  routes: [...publicRoutes, adminRoutes, studentRoutes],
})

registerRouterGuards(router)

export default router
