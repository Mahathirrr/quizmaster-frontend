<script setup lang="ts">
import { computed, ref } from 'vue'
import { LogOut, Menu, X, Flame, Sparkles } from 'lucide-vue-next'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import type { GlassIconName, GlassTone } from '@/components/brand/GlassIcon.vue'
import GlassIcon from '@/components/brand/GlassIcon.vue'
import Logo from '@/components/brand/Logo.vue'
import ProgressBar from '@/components/brand/ProgressBar.vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'
import DevBanner from '@/components/layout/DevBanner.vue'

const props = defineProps<{ variant: 'admin' | 'student' }>()

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const mobileOpen = ref(false)

type NavLink = { to: string; label: string; icon: GlassIconName; tone: GlassTone }

const adminLinks: NavLink[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'chart', tone: 'violet' },
  { to: '/admin/categories', label: 'Kategori Ujian', icon: 'book', tone: 'mint' },
  { to: '/admin/exams', label: 'Kelola Ujian', icon: 'target', tone: 'sun' },
  { to: '/admin/students', label: 'Data Siswa', icon: 'users', tone: 'sky' },
  { to: '/admin/results', label: 'Hasil & Penilaian', icon: 'trophy', tone: 'coral' },
]

const studentLinks: NavLink[] = [
  { to: '/student/dashboard', label: 'Dashboard', icon: 'chart', tone: 'violet' },
  { to: '/student/exams', label: 'Ikut Ujian', icon: 'rocket', tone: 'sun' },
  { to: '/student/results', label: 'Hasil & Prestasi', icon: 'trophy', tone: 'coral' },
]

const links = computed(() => (props.variant === 'admin' ? adminLinks : studentLinks))

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

async function logout() {
  auth.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="min-h-screen qm-mesh-bg text-foreground selection:bg-primary/20">
    <header class="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div class="mx-auto flex h-15 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <Button variant="ghost" size="icon" class="rounded-xl md:hidden" @click="mobileOpen = !mobileOpen">
            <Menu v-if="!mobileOpen" class="size-5" />
            <X v-else class="size-5" />
          </Button>
          <Logo size="sm" />
          <span
            class="hidden rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase md:inline-flex items-center gap-1 shadow-xs"
            :class="variant === 'admin' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'"
          >
            {{ variant === 'admin' ? '👑 Admin Portal' : '🎒 Siswa Portal' }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <!-- Student Gamification Badges in Header -->
          <template v-if="variant === 'student'">
            <div class="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-xs font-black text-amber-700 dark:text-amber-300 shadow-xs">
              <Flame class="size-3.5 fill-amber-500 text-amber-500" />
              <span>6 Hari Streak</span>
            </div>
            <div class="hidden md:flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-black text-indigo-700 dark:text-indigo-300 shadow-xs">
              <Sparkles class="size-3.5 text-primary" />
              <span>Gold Tier · 1.240 XP</span>
            </div>
          </template>

          <!-- User Info & Logout -->
          <div class="flex items-center gap-2 pl-2 border-l border-border/70">
            <div class="qm-avatar size-8 text-xs font-black shrink-0">
              {{ auth.user?.name?.charAt(0) ?? 'U' }}
            </div>
            <span class="hidden text-xs font-bold sm:inline max-w-[120px] truncate">
              {{ auth.user?.name }}
            </span>
            <Button variant="ghost" size="sm" class="rounded-xl font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10" @click="logout">
              <LogOut class="size-4 mr-1" />
              <span class="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>

    <DevBanner />

    <div class="mx-auto flex max-w-6xl">
      <aside :class="cn(
        'fixed inset-y-0 left-0 z-30 w-64 border-r border-border/80 bg-background/95 pt-15 backdrop-blur-md transition-transform md:static md:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      )">
        <!-- User card in sidebar -->
        <div class="mx-3 mt-4 qm-card p-3.5 shadow-xs">
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
          <ProgressBar :value="variant === 'admin' ? 100 : 75" :label="variant === 'admin' ? 'Akses Penuh' : 'Level 8 Progress'" class="mt-3" />
        </div>

        <!-- Mascot Tip for Students -->
        <div v-if="variant === 'student'" class="mx-3 mt-3 flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/60 p-2.5 shadow-2xs">
          <img src="/assets/mascot.png" alt="Mascot Hootie" class="size-9 shrink-0 object-contain drop-shadow-xs" />
          <p class="text-[11px] font-semibold text-muted-foreground leading-tight">
            "Semangat ujiannya hari ini ya! 🎯"
          </p>
        </div>

        <nav class="flex flex-col gap-1.5 p-3 mt-2">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-bold transition-all"
            :class="isActive(link.to) ? 'qm-sidebar-active' : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'"
            @click="mobileOpen = false"
          >
            <GlassIcon :name="link.icon" :tone="link.tone" :size="30" />
            <span>{{ link.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <main class="min-h-[calc(100vh-3.75rem)] flex-1 p-4 md:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
