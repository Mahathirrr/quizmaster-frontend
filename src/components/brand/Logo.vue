<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ size?: 'sm' | 'md' | 'lg'; showText?: boolean }>()
</script>

<template>
  <RouterLink to="/" class="group inline-flex items-center gap-2.5">
    <div
      :class="[
        'relative flex items-center justify-center rounded-2xl bg-primary shadow-md transition-transform group-hover:scale-105',
        size === 'sm' ? 'size-9' : size === 'lg' ? 'size-12' : 'size-10',
      ]"
    >
      <span
        :class="[
          'font-extrabold text-white',
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base',
        ]"
      >Q</span>
      <span class="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-butter border-2 border-white" />
    </div>
    <div v-if="showText !== false" class="leading-none">
      <span
        :class="[
          'block font-extrabold tracking-tight text-foreground',
          size === 'lg' ? 'text-2xl' : 'text-lg',
        ]"
      >QuizMaster</span>
      <span v-if="size === 'lg'" class="text-[11px] font-semibold text-muted-foreground">Kuis & Ujian Online</span>
    </div>
  </RouterLink>
</template>
