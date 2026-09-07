<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ArrowRight, Sparkles } from 'lucide-vue-next'

import AuthLayout from '@/components/layout/AuthLayout.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UserRole } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref<UserRole>('student')

async function submit() {
  const path = await auth.register(name.value, email.value, password.value, role.value)
  await router.push(path)
}
</script>

<template>
  <AuthLayout>
    <div class="qm-card p-6 sm:p-8">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-black tracking-tight">Mulai Petualanganmu! 🚀</h1>
        <p class="mt-1.5 text-xs sm:text-sm font-semibold text-muted-foreground">
          Daftar akun QuizMaster dalam hitungan detik
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <div class="space-y-1.5">
          <Label for="name" class="text-xs font-bold">Nama Lengkap</Label>
          <Input
            id="name"
            v-model="name"
            placeholder="Contoh: Budi Pratama"
            required
            autocomplete="name"
            class="rounded-xl font-medium"
          />
        </div>

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
          <Label for="password" class="text-xs font-bold">Kata Sandi (Minimal 6 karakter)</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="new-password"
            class="rounded-xl font-medium"
          />
        </div>

        <div class="space-y-1.5">
          <Label for="role" class="text-xs font-bold">Pilih Peran Akun</Label>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="role = 'student'"
              :class="[
                'flex flex-col items-center gap-1 rounded-xl border p-2.5 text-center transition-all',
                role === 'student'
                  ? 'border-primary bg-primary/10 text-primary font-black shadow-xs ring-2 ring-primary/20'
                  : 'border-border bg-card text-muted-foreground font-semibold hover:border-muted-foreground'
              ]"
            >
              <span class="text-lg">🎒</span>
              <span class="text-xs">Siswa / Peserta</span>
            </button>
            <button
              type="button"
              @click="role = 'admin'"
              :class="[
                'flex flex-col items-center gap-1 rounded-xl border p-2.5 text-center transition-all',
                role === 'admin'
                  ? 'border-primary bg-primary/10 text-primary font-black shadow-xs ring-2 ring-primary/20'
                  : 'border-border bg-card text-muted-foreground font-semibold hover:border-muted-foreground'
              ]"
            >
              <span class="text-lg">👑</span>
              <span class="text-xs">Guru / Pembuat Kuis</span>
            </button>
          </div>
        </div>

        <p v-if="auth.error" class="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">
          {{ auth.error }}
        </p>

        <button
          type="submit"
          class="qm-btn-fun w-full flex items-center justify-center gap-2 py-3 text-sm font-black disabled:opacity-50"
          :disabled="auth.loading"
        >
          <span v-if="auth.loading">Mendaftarkan…</span>
          <template v-else>
            Daftar Sekarang <ArrowRight class="size-4" />
          </template>
        </button>
      </form>

      <p class="mt-6 text-center text-xs font-bold text-muted-foreground">
        Sudah memiliki akun?
        <RouterLink to="/login" class="text-primary hover:underline ml-1 font-extrabold">
          Masuk Saja
        </RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>
