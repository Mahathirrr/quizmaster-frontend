import { createRouter, createWebHistory } from 'vue-router'

import { DEV_ROLE, DEV_SKIP_AUTH } from '@/lib/dev'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
      meta: { guest: true },
    },
    {
      path: '/admin',
      component: () => import('@/components/layout/AdminLayout.vue'),
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        { path: 'dashboard', name: 'admin-dashboard', component: () => import('@/views/admin/Dashboard.vue') },
        { path: 'categories', name: 'admin-categories', component: () => import('@/views/admin/Categories.vue') },
        { path: 'exams', name: 'admin-exams', component: () => import('@/views/admin/Exams.vue') },
        { path: 'exams/:id/questions', name: 'admin-exam-questions', component: () => import('@/views/admin/ExamQuestions.vue') },
        { path: 'students', name: 'admin-students', component: () => import('@/views/admin/Students.vue') },
        { path: 'results', name: 'admin-results', component: () => import('@/views/admin/Results.vue') },
        { path: 'exams/:id/results', name: 'admin-exam-results', component: () => import('@/views/admin/ExamResults.vue') },
        { path: '', redirect: '/admin/dashboard' },
      ],
    },
    {
      path: '/student',
      component: () => import('@/components/layout/StudentLayout.vue'),
      meta: { requiresAuth: true, role: 'student' },
      children: [
        { path: 'dashboard', name: 'student-dashboard', component: () => import('@/views/student/Dashboard.vue') },
        { path: 'exams', name: 'student-exams', component: () => import('@/views/student/Exams.vue') },
        { path: 'exams/:id/take', name: 'student-take-exam', component: () => import('@/views/student/TakeExam.vue') },
        { path: 'results', name: 'student-results', component: () => import('@/views/student/ResultsList.vue') },
        { path: 'results/:id', name: 'student-result-detail', component: () => import('@/views/student/ResultDetail.vue') },
        { path: 'results/:id/review', name: 'student-review', component: () => import('@/views/student/ReviewAnswers.vue') },
        { path: 'exams/:id/leaderboard', name: 'student-leaderboard', component: () => import('@/views/student/Leaderboard.vue') },
        { path: '', redirect: '/student/dashboard' },
      ],
    },
  ],
})

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

export default router
