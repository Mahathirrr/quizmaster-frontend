<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { DEV_ROLE, DEV_SKIP_AUTH } from '@/lib/dev'
</script>

<template>
  <div
    v-if="DEV_SKIP_AUTH"
    class="sticky top-14 z-30 border-b border-butter/40 bg-butter px-4 py-1.5 text-center text-xs font-bold text-foreground"
  >
    🛠 DEV MODE — login dilewati
    <span class="mx-2 opacity-40">|</span>
    Portal:
    <RouterLink to="/admin/dashboard" class="underline ml-1" :class="DEV_ROLE === 'admin' && 'opacity-100'">Admin</RouterLink>
    ·
    <RouterLink to="/student/dashboard" class="underline">Siswa</RouterLink>
  </div>
</template>
