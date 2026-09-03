<script setup lang="ts">
import type { GlassIconName, GlassTone } from '@/components/brand/GlassIcon.vue'
import GlassIcon from '@/components/brand/GlassIcon.vue'

defineProps<{
  label: string
  value: string | number
  icon: GlassIconName
  tone: GlassTone
  loading?: boolean
}>()
</script>

<template>
  <div class="qm-card p-5">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-medium text-muted-foreground">{{ label }}</p>
        <p class="mt-2 text-3xl font-extrabold tracking-tight text-foreground">
          {{ loading ? '…' : value }}
        </p>
      </div>
      <GlassIcon :name="icon" :tone="tone" :size="52" />
    </div>
  </div>
</template>
