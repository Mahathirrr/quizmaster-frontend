import type { RouteRecordRaw } from 'vue-router'

export const studentRoutes: RouteRecordRaw = {
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
    { path: 'profile', name: 'student-profile', component: () => import('@/views/shared/Profile.vue') },
    { path: '', redirect: '/student/dashboard' },
  ],
}
