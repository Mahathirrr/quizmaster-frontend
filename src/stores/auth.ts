import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { api, type User, type UserRole } from '@/lib/api'
import { ApiError } from '@/lib/api-error'
import { DEV_MOCK_TOKEN, DEV_MOCK_USER, DEV_SKIP_AUTH } from '@/lib/dev'

const TOKEN_KEY = 'quizmaster_token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(DEV_SKIP_AUTH ? null : localStorage.getItem(TOKEN_KEY))
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isStudent = computed(() => user.value?.role === 'student')

  function setToken(jwt: string) {
    token.value = jwt
    localStorage.setItem(TOKEN_KEY, jwt)
  }

  function redirectPathForRole(role: UserRole): string {
    return role === 'admin' ? '/admin/dashboard' : '/student/dashboard'
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = ''
    try {
      const res = await api.login(email, password)
      setToken(res.token)
      user.value = res.user
      return redirectPathForRole(res.user.role)
    } catch (e) {
      error.value = e instanceof ApiError ? e.message : 'Login failed'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function register(name: string, email: string, password: string, role: UserRole = 'student') {
    loading.value = true
    error.value = ''
    try {
      const res = await api.register(name, email, password, role)
      setToken(res.token)
      user.value = res.user
      return redirectPathForRole(res.user.role)
    } catch (e) {
      error.value = e instanceof ApiError ? e.message : 'Registration failed'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchMe() {
    if (!token.value) return
    const res = await api.me(token.value)
    user.value = res.user
  }

  function enableDevBypass() {
    if (!DEV_SKIP_AUTH) return
    token.value = DEV_MOCK_TOKEN
    user.value = { ...DEV_MOCK_USER }
  }

  function logout() {
    if (DEV_SKIP_AUTH) {
      enableDevBypass()
      return
    }
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async function init() {
    if (DEV_SKIP_AUTH) {
      enableDevBypass()
      return
    }
    if (!token.value) return
    try {
      await fetchMe()
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) logout()
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isStudent,
    login,
    register,
    logout,
    init,
    fetchMe,
    redirectPathForRole,
    enableDevBypass,
  }
})
