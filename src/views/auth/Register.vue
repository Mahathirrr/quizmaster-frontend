<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import AuthLayout from '@/components/layout/AuthLayout.vue'
import { Button } from '@/components/ui/button'
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
        <h1 class="text-2xl font-extrabold tracking-tight">Gabung QuizMaster! 🚀</h1>
        <p class="mt-2 text-sm text-muted-foreground">Daftar sebagai siswa atau admin.</p>
      </div>
      <form class="space-y-4" @submit.prevent="submit">
        <div class="space-y-2">
          <Label for="name">Nama</Label>
          <Input id="name" v-model="name" required autocomplete="name" class="rounded-xl" />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" required autocomplete="email" class="rounded-xl" />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" required autocomplete="new-password" class="rounded-xl" />
        </div>
        <div class="space-y-2">
          <Label for="role">Peran</Label>
          <select
            id="role"
            v-model="role"
            class="flex h-10 w-full rounded-xl border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value="student">Siswa</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <p v-if="auth.error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ auth.error }}</p>
        <Button type="submit" variant="fun" class="w-full rounded-xl" :disabled="auth.loading">
          {{ auth.loading ? 'Mendaftar…' : 'Buat Akun' }}
        </Button>
      </form>
      <p class="mt-5 text-center text-sm text-muted-foreground">
        Sudah punya akun?
        <RouterLink to="/login" class="font-semibold text-primary underline-offset-4 hover:underline">Masuk</RouterLink>
      </p>
    </div>
  </AuthLayout>
</template>
