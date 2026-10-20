<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    size?: number
    class?: string
  }>(),
  { size: 48 },
)
</script>

<template>
  <img
    :src="'/assets/mascot.png'"
    alt="Hootie — maskot QuizMaster"
    :width="size"
    :height="size"
    :class="cn('shrink-0 object-contain drop-shadow-sm', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>
