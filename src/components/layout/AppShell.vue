<script setup lang="ts">
import { computed, ref } from 'vue'
import { LogOut, Menu, X } from 'lucide-vue-next'
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
  { to: '/admin/categories', label: 'Kategori', icon: 'book', tone: 'mint' },
  { to: '/admin/exams', label: 'Ujian', icon: 'target', tone: 'sun' },
  { to: '/admin/students', label: 'Siswa', icon: 'users', tone: 'sky' },
  { to: '/admin/results', label: 'Hasil', icon: 'trophy', tone: 'coral' },
]

const studentLinks: NavLink[] = [
  { to: '/student/dashboard', label: 'Dashboard', icon: 'chart', tone: 'violet' },
  { to: '/student/exams', label: 'Ujian', icon: 'rocket', tone: 'sun' },
  { to: '/student/results', label: 'Hasil Saya', icon: 'trophy', tone: 'coral' },
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
  <div class="min-h-screen qm-mesh-bg">
    <header class="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-lg">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div class="flex items-center gap-3">
          <Button variant="ghost" size="icon" class="rounded-xl md:hidden" @click="mobileOpen = !mobileOpen">
            <Menu v-if="!mobileOpen" class="size-4" />
            <X v-else class="size-4" />
          </Button>
          <Logo size="sm" />
          <span class="hidden rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase md:inline"
            :class="variant === 'admin' ? 'bg-secondary text-secondary-foreground' : 'bg-accent text-accent-foreground'">
            {{ variant === 'admin' ? 'Admin' : 'Siswa' }}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <div class="qm-avatar size-8 text-xs hidden sm:flex">{{ auth.user?.name?.charAt(0) }}</div>
          <span class="hidden text-sm font-semibold sm:inline">{{ auth.user?.name }}</span>
          <Button variant="outline" size="sm" class="rounded-xl font-semibold" @click="logout">
            <LogOut class="size-3.5" /> Keluar
          </Button>
        </div>
      </div>
    </header>

    <DevBanner />

    <div class="mx-auto flex max-w-6xl">
      <aside :class="cn(
        'fixed inset-y-0 left-0 z-30 w-64 border-r border-border bg-background/95 pt-14 backdrop-blur-lg transition-transform md:static md:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      )">
        <!-- User card in sidebar -->
        <div class="mx-3 mt-3 qm-card p-3">
          <div class="flex items-center gap-2">
            <div class="qm-avatar size-10 text-sm">{{ auth.user?.name?.charAt(0) }}</div>
            <div class="min-w-0">
              <p class="truncate text-sm font-bold">{{ auth.user?.name }}</p>
              <p class="text-[10px] font-semibold text-muted-foreground">{{ variant === 'admin' ? 'Administrator' : 'Siswa' }}</p>
            </div>
          </div>
          <ProgressBar :value="variant === 'admin' ? 100 : 65" label="Level Progress" class="mt-2" />
        </div>

        <nav class="flex flex-col gap-1 p-3">
          <RouterLink v-for="link in links" :key="link.to" :to="link.to"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
            :class="isActive(link.to) ? 'qm-sidebar-active' : 'text-muted-foreground hover:bg-secondary/80'"
            @click="mobileOpen = false">
            <GlassIcon :name="link.icon" :tone="link.tone" :size="32" />
            {{ link.label }}
          </RouterLink>
        </nav>
      </aside>

      <main class="min-h-[calc(100vh-3.5rem)] flex-1 p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
