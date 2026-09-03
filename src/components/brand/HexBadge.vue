<script setup lang="ts">
import type { GlassIconName, GlassTone } from '@/components/brand/GlassIcon.vue'
import GlassIcon from '@/components/brand/GlassIcon.vue'

defineProps<{
  name: string
  icon: GlassIconName
  tone: GlassTone
  locked?: boolean
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div
      class="qm-hex-badge size-16 sm:size-[4.5rem]"
      :class="locked ? 'bg-muted opacity-50' : 'bg-secondary'"
    >
      <GlassIcon :name="icon" :tone="locked ? 'violet' : tone" :size="locked ? 32 : 40" :class="locked ? 'opacity-40 grayscale' : ''" />
    </div>
    <span class="max-w-[5rem] text-center text-[10px] font-bold leading-tight sm:text-xs" :class="locked ? 'text-muted-foreground' : 'text-foreground'">
      {{ name }}
    </span>
  </div>
</template>
