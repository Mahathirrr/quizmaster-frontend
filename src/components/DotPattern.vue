<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  size?: 'sm' | 'md' | 'lg'
  opacity?: 'low' | 'medium' | 'high'
}>(), {
  size: 'lg',
  opacity: 'high',
})

const sizePx = { sm: 12, md: 16, lg: 22 } as const
const opacityVal = { low: 0.45, medium: 0.65, high: 0.9 } as const

const patternStyle = computed(() => ({
  backgroundImage: 'radial-gradient(circle, var(--dot-pattern-color) 1.5px, transparent 1.5px)',
  backgroundSize: `${sizePx[props.size]}px ${sizePx[props.size]}px`,
  opacity: opacityVal[props.opacity],
  WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 35%, #000 55%, transparent 100%)',
  maskImage: 'radial-gradient(ellipse 85% 75% at 50% 35%, #000 55%, transparent 100%)',
}))
</script>

<template>
  <div :class="cn('absolute inset-0 pointer-events-none', props.class)" :style="patternStyle" />
</template>
