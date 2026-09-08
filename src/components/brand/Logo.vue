<script setup lang="ts">
import { RouterLink } from 'vue-router'

import logoMark from '@/assets/brand/logo-mark.svg'

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
  }>(),
  { showText: true, size: 'md' },
)
</script>

<template>
  <RouterLink to="/" class="group inline-flex items-center gap-2.5 select-none">
    <img
      src="/assets/logo.png"
      alt="QuizMaster"
      draggable="false"
      :class="[
        'inline-block shrink-0 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105',
        size === 'sm' ? 'size-8' : size === 'lg' ? 'size-11' : 'size-9',
      ]"
    />
    <div v-if="showText !== false" class="leading-none">
      <div class="flex items-center gap-1.5">
        <span
          :class="[
            'block font-black tracking-tight text-foreground',
            size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-lg',
          ]"
        >Quiz<span class="text-primary">Master</span></span>
      </div>
      <span v-if="size === 'lg'" class="mt-1 block text-[11px] font-semibold text-muted-foreground">
        Platform Kuis & Ujian Digital
      </span>
    </div>
  </RouterLink>
</template>
