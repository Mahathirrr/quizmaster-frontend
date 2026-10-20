<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { LogOut, Menu, Settings, X } from 'lucide-vue-next'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import type { GlassIconName, GlassTone } from '@/components/brand/GlassIcon.vue'
import GlassIcon from '@/components/brand/GlassIcon.vue'
import Logo from '@/components/brand/Logo.vue'
import MascotIcon from '@/components/brand/MascotIcon.vue'
import ProgressBar from '@/components/brand/ProgressBar.vue'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'
import DevBanner from '@/components/layout/DevBanner.vue'

const props = defineProps<{ variant: 'admin' | 'student' }>()

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const mobileOpen = ref(false)

const studentAvgScore = ref(0)
const studentCompleted = ref(0)

type NavLink = { to: string; label: string; icon: GlassIconName; tone: GlassTone }

const adminLinks: NavLink[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard', tone: 'violet' },
  { to: '/admin/categories', label: 'Kategori Ujian', icon: 'category', tone: 'mint' },
  { to: '/admin/exams', label: 'Kelola Ujian', icon: 'exam', tone: 'sun' },
  { to: '/admin/students', label: 'Data Siswa', icon: 'users', tone: 'sky' },
  { to: '/admin/results', label: 'Hasil & Penilaian', icon: 'leaderboard', tone: 'coral' },
  { to: '/admin/profile', label: 'Pengaturan Profil', icon: 'users', tone: 'mint' },
]

const studentLinks: NavLink[] = [
  { to: '/student/dashboard', label: 'Dashboard', icon: 'dashboard', tone: 'violet' },
  { to: '/student/exams', label: 'Ikut Ujian', icon: 'exam', tone: 'sun' },
  { to: '/student/results', label: 'Hasil & Prestasi', icon: 'trophy', tone: 'coral' },
  { to: '/student/profile', label: 'Pengaturan Profil', icon: 'users', tone: 'sky' },
]

const links = computed(() => (props.variant === 'admin' ? adminLinks : studentLinks))

const progressLabel = computed(() => {
  if (props.variant === 'admin') return 'Akses penuh sebagai guru'
  if (studentCompleted.value === 0) return 'Belum ada ujian selesai'
  return `Rata-rata skor ${studentAvgScore.value}%`
})

const progressValue = computed(() => {
  if (props.variant === 'admin') return 100
  return studentAvgScore.value
})

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

async function logout() {
  auth.logout()
  await router.push('/login')
}

onMounted(async () => {
  if (props.variant !== 'student' || !auth.token) return
  try {
    const dash = await api.studentDashboard(auth.token)
    studentAvgScore.value = dash.average_score
    studentCompleted.value = dash.completed_exams
  } catch {
    studentAvgScore.value = 0
    studentCompleted.value = 0
  }
})
</script>

<template>
  <div class="min-h-screen qm-mesh-bg text-foreground selection:bg-primary/20">
    <header class="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-15 sm:px-6">
        <div class="flex min-w-0 items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" class="shrink-0 rounded-xl md:hidden" @click="mobileOpen = !mobileOpen">
            <Menu v-if="!mobileOpen" class="size-5" />
            <X v-else class="size-5" />
          </Button>
          <Logo size="sm" />
          <span
            class="hidden rounded-full px-2 py-0.5 text-[10px] font-black uppercase sm:inline-flex items-center border"
            :class="variant === 'admin' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200'"
          >
            {{ variant === 'admin' ? 'Guru' : 'Siswa' }}
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-1 sm:gap-2">
          <RouterLink :to="variant === 'admin' ? '/admin/profile' : '/student/profile'">
            <Button variant="ghost" size="icon" class="rounded-xl" aria-label="Pengaturan profil">
              <Settings class="size-4" />
            </Button>
          </RouterLink>
          <div class="qm-avatar size-8 text-xs font-black shrink-0 hidden xs:flex sm:flex">
            {{ auth.user?.name?.charAt(0) ?? 'U' }}
          </div>
          <Button variant="ghost" size="icon" class="rounded-xl text-muted-foreground hover:text-destructive" aria-label="Keluar" @click="logout">
            <LogOut class="size-4" />
          </Button>
        </div>
      </div>
    </header>

    <DevBanner />

    <div class="mx-auto flex max-w-6xl">
      <aside
        :class="cn(
          'fixed inset-y-0 left-0 z-30 w-[min(100vw-2rem,17rem)] border-r border-border/80 bg-background/95 pt-14 backdrop-blur-md transition-transform md:static md:w-64 md:translate-x-0 md:pt-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )"
      >
        <div class="mx-3 mt-3 qm-card p-3.5 shadow-xs">
          <div class="flex items-center gap-3">
            <div class="qm-avatar size-11 text-sm font-black shrink-0">
              {{ auth.user?.name?.charAt(0) ?? 'U' }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-black">{{ auth.user?.name }}</p>
              <p class="text-[11px] font-bold text-muted-foreground">
                {{ variant === 'admin' ? 'Guru / Pengajar' : 'Peserta Didik' }}
              </p>
            </div>
          </div>
          <ProgressBar :value="progressValue" :max="100" :label="progressLabel" class="mt-3" />
        </div>

        <div v-if="variant === 'student'" class="mx-3 mt-3 flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/60 p-2.5">
          <MascotIcon :size="32" class="shrink-0" />
          <p class="text-[11px] font-semibold text-muted-foreground leading-tight">
            Selesaikan ujian untuk naik skor rata-rata Anda.
          </p>
        </div>

        <nav class="flex flex-col gap-1 p-3 mt-2">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition-all"
            :class="isActive(link.to) ? 'qm-sidebar-active' : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'"
            @click="mobileOpen = false"
          >
            <GlassIcon :name="link.icon" :tone="link.tone" :size="28" />
            <span>{{ link.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-20 bg-black/40 md:hidden"
        aria-hidden="true"
        @click="mobileOpen = false"
      />

      <main class="min-h-[calc(100vh-3.5rem)] flex-1 p-3 sm:p-6 lg:p-8 w-full min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>
