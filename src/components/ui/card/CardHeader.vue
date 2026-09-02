<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('flex flex-col gap-1 px-4 pt-4 pb-2', $props.class)">
    <slot />
  </div>
</template>
