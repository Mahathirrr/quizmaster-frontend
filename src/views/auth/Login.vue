<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ArrowRight, KeyRound, Sparkles } from 'lucide-vue-next'

import AuthLayout from '@/components/layout/AuthLayout.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

function fillDemo(role: 'admin' | 'student') {
  if (role === 'admin') {
    email.value = 'admin@quizmaster.com'
    password.value = 'admin123'
  } else {
    email.value = 'student@quizmaster.com'
    password.value = 'student123'
  }
}

async function submit() {
  const path = await auth.login(email.value, password.value)
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : path
  await router.push(redirect)
}
</script>

<template>
  <AuthLayout>
    <div class="qm-card p-6 sm:p-8">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-black tracking-tight">Selamat Datang Kembali! 👋</h1>
        <p class="mt-1.5 text-xs sm:text-sm font-semibold text-muted-foreground">
          Masuk ke akun guru atau siswa kamu
        </p>
      </div>

      <!-- One-click Quick Demo Account Buttons -->
      <div class="mb-5 rounded-2xl border border-border/80 bg-muted/40 p-3">
        <div class="flex items-center justify-between text-[11px] font-black uppercase text-muted-foreground mb-2">
          <span class="flex items-center gap-1"><Sparkles class="size-3 text-amber-500" /> Coba Cepat (Akun Demo):</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            @click="fillDemo('student')"
            class="rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary active:scale-95"
          >
            🎒 Siswa Demo
          </button>
          <button
            type="button"
            @click="fillDemo('admin')"
            class="rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary active:scale-95"
          >
            👑 Guru / Admin
          </button>
        </div>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <div class="space-y-1.5">
          <Label for="email" class="text-xs font-bold">Alamat Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="nama@email.com"
            required
            autocomplete="email"
            class="rounded-xl font-medium"
          />
        </div>

        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <Label for="password" class="text-xs font-bold">Kata Sandi</Label>
            <span class="text-[11px] font-bold text-primary cursor-pointer hover:underline">Lupa sandi?</span>
          </div>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
            class="rounded-xl font-medium"
          />
        </div>

        <p v-if="auth.error" class="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">
          {{ auth.error }}
        </p>

        <button
          type="submit"
          class="qm-btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm font-black disabled:opacity-50"
          :disabled="auth.loading"
        >
          <span v-if="auth.loading">Memverifikasi…</span>
          <template v-else>
            Masuk Sekarang <ArrowRight class="size-4" />
          </template>
        </button>
      </form>

      <p class="mt-6 text-center text-xs font-bold text-muted-foreground">
        Belum memiliki akun?
        <RouterLink to="/register" class="text-primary hover:underline ml-1 font-extrabold">
          Daftar Gratis
        </RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>
