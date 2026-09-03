<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppShell from './AppShell.vue'
</script>

<template>
  <AppShell variant="admin">
    <RouterView />
  </AppShell>
</template>
