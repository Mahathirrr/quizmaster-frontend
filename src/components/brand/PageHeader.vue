<script setup lang="ts">
import type { GlassIconName, GlassTone } from '@/components/brand/GlassIcon.vue'
import GlassIcon from '@/components/brand/GlassIcon.vue'

defineProps<{
  title: string
  description?: string
  icon?: GlassIconName
  tone?: GlassTone
}>()
</script>

<template>
  <div class="flex flex-wrap items-start justify-between gap-4">
    <div class="flex items-start gap-3">
      <GlassIcon v-if="icon" :name="icon" :tone="tone ?? 'violet'" :size="48" class="hidden sm:block" />
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight">{{ title }}</h1>
        <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
      </div>
    </div>
    <slot name="actions" />
  </div>
</template>
