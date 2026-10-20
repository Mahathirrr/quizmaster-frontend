import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw = {
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
    { path: 'profile', name: 'admin-profile', component: () => import('@/views/shared/Profile.vue') },
    { path: '', redirect: '/admin/dashboard' },
  ],
}
