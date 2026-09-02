<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('px-4 pb-4', $props.class)">
    <slot />
  </div>
</template>
