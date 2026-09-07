<script setup lang="ts">
import { RouterLink } from 'vue-router'

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
    <div
      :class="[
        'relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 shadow-md shadow-primary/25 border-b-2 border-primary/40 transition-transform duration-200 group-hover:scale-105',
        size === 'sm' ? 'size-9' : size === 'lg' ? 'size-12' : 'size-10',
      ]"
    >
      <span
        :class="[
          'font-black text-white tracking-tighter',
          size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg',
        ]"
      >Q</span>
      <span class="absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full bg-amber-400 border-2 border-white shadow-sm ring-1 ring-amber-500/20" />
    </div>
    <div v-if="showText !== false" class="leading-none">
      <div class="flex items-center gap-1.5">
        <span
          :class="[
            'block font-extrabold tracking-tight text-foreground',
            size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-lg',
          ]"
        >Quiz<span class="text-primary">Master</span></span>
      </div>
      <span v-if="size === 'lg'" class="mt-1 block text-[11px] font-semibold text-muted-foreground">Platform Kuis & Ujian Pintar</span>
    </div>
  </RouterLink>
</template>
