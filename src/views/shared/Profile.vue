<script setup lang="ts">
import { onMounted, ref } from 'vue'

import PageHeader from '@/components/brand/PageHeader.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const name = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const saving = ref(false)
const message = ref('')
const error = ref('')

onMounted(() => {
  name.value = auth.user?.name ?? ''
})

async function save() {
  if (!auth.token) return
  saving.value = true
  message.value = ''
  error.value = ''
  try {
    const user = await api.updateProfile(auth.token, {
      name: name.value.trim(),
      current_password: newPassword.value ? currentPassword.value : undefined,
      new_password: newPassword.value || undefined,
    })
    auth.user = user
    message.value = 'Profil berhasil disimpan.'
    currentPassword.value = ''
    newPassword.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal menyimpan profil'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg space-y-6">
    <PageHeader title="Pengaturan Profil" description="Ubah nama tampilan dan kata sandi akun Anda." icon="users" tone="sky" />

    <form class="qm-card space-y-4 p-5 sm:p-6" @submit.prevent="save">
      <div class="space-y-1.5">
        <Label for="email">Email</Label>
        <Input id="email" :model-value="auth.user?.email" disabled class="rounded-xl bg-muted/50" />
      </div>

      <div class="space-y-1.5">
        <Label for="name">Nama lengkap</Label>
        <Input id="name" v-model="name" required minlength="2" maxlength="120" class="rounded-xl" />
      </div>

      <div class="border-t border-border/70 pt-4 space-y-3">
        <p class="text-sm font-bold">Ganti kata sandi (opsional)</p>
        <div class="space-y-1.5">
          <Label for="current">Kata sandi saat ini</Label>
          <Input id="current" v-model="currentPassword" type="password" autocomplete="current-password" class="rounded-xl" />
        </div>
        <div class="space-y-1.5">
          <Label for="newpass">Kata sandi baru</Label>
          <Input id="newpass" v-model="newPassword" type="password" minlength="6" autocomplete="new-password" class="rounded-xl" />
        </div>
      </div>

      <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>
      <p v-if="message" class="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">{{ message }}</p>

      <Button type="submit" variant="fun" class="w-full rounded-xl" :disabled="saving">
        {{ saving ? 'Menyimpan…' : 'Simpan perubahan' }}
      </Button>
    </form>
  </div>
</template>
