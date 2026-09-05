<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import AuthLayout from '@/components/layout/AuthLayout.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

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
        <h1 class="text-2xl font-extrabold tracking-tight">Selamat datang kembali! 👋</h1>
        <p class="mt-2 text-sm text-muted-foreground">Masuk ke portal admin atau siswa kamu.</p>
      </div>
      <form class="space-y-4" @submit.prevent="submit">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" required autocomplete="email" class="rounded-xl" />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" required autocomplete="current-password" class="rounded-xl" />
        </div>
        <p v-if="auth.error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ auth.error }}</p>
        <Button type="submit" variant="fun" class="w-full rounded-xl" :disabled="auth.loading">
          {{ auth.loading ? 'Masuk…' : 'Masuk Sekarang' }}
        </Button>
      </form>
      <p class="mt-5 text-center text-sm text-muted-foreground">
        Belum punya akun?
        <RouterLink to="/register" class="font-semibold text-primary underline-offset-4 hover:underline">Daftar dulu</RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>
