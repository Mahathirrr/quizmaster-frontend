<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/lib/utils'

export type GlassIconName =
  | 'trophy'
  | 'brain'
  | 'timer'
  | 'rocket'
  | 'chart'
  | 'users'
  | 'book'
  | 'sparkles'
  | 'shield'
  | 'target'

export type GlassTone = 'violet' | 'coral' | 'mint' | 'sun' | 'pink' | 'sky'

const props = withDefaults(
  defineProps<{
    name: GlassIconName
    tone?: GlassTone
    size?: number
    class?: string
  }>(),
  { tone: 'violet', size: 48 },
)

const gradId = computed(() => `glass-${props.name}-${props.tone}-${Math.random().toString(36).slice(2, 7)}`)

const tones: Record<GlassTone, { a: string; b: string; c: string; stroke: string }> = {
  violet: { a: '#E8E4F8', b: '#9D8FD4', c: '#6B5BC7', stroke: '#B8AAE8' },
  coral: { a: '#FFE4DE', b: '#FF9585', c: '#FF7B6B', stroke: '#FFB8AD' },
  mint: { a: '#CCF5F2', b: '#6EE0D8', c: '#4ECDC4', stroke: '#8EEDE6' },
  sun: { a: '#FFF6CC', b: '#FFE566', c: '#FFD93D', stroke: '#FFEC80' },
  pink: { a: '#FCE4F0', b: '#F0A0C0', c: '#D878A0', stroke: '#F5C0D8' },
  sky: { a: '#D8EEFF', b: '#80C8F0', c: '#5098D0', stroke: '#A8D8F8' },
}

const t = computed(() => tones[props.tone])
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('shrink-0 drop-shadow-md', props.class)"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="`${gradId}-fill`" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop :stop-color="t.a" />
        <stop offset="0.5" :stop-color="t.b" />
        <stop offset="1" :stop-color="t.c" />
      </linearGradient>
      <linearGradient :id="`${gradId}-shine`" x1="16" y1="8" x2="48" y2="32" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0.85" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <filter :id="`${gradId}-blur`" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#6D28D9" flood-opacity="0.2" />
      </filter>
    </defs>

    <rect x="4" y="4" width="56" height="56" rx="16" :fill="`url(#${gradId}-fill)`" :filter="`url(#${gradId}-blur)`" opacity="0.25" />
    <rect x="8" y="8" width="48" height="48" rx="14" :fill="`url(#${gradId}-fill)`" :stroke="t.stroke" stroke-width="1.5" />
    <rect x="10" y="10" width="28" height="14" rx="7" :fill="`url(#${gradId}-shine)`" opacity="0.55" />

    <!-- trophy -->
    <g v-if="name === 'trophy'" :stroke="t.c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M22 26v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
      <path d="M20 26h24v6a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8v-6z" fill="white" fill-opacity="0.35" />
      <path d="M28 40v4M36 40v4M24 44h16" />
      <path d="M18 26h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2M46 26h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2" />
    </g>

    <!-- brain -->
    <g v-else-if="name === 'brain'" :stroke="t.c" stroke-width="2.2" fill="white" fill-opacity="0.3">
      <path d="M32 18c-6 0-10 4-10 10 0 3 1.5 5.5 4 7-1 2-1 4 0 6 2 3 6 5 10 5s8-2 10-5c1-2 1-4 0-6 2.5-1.5 4-4 4-7 0-6-4-10-10-10z" stroke-linejoin="round" />
      <path d="M28 28c1 2 3 3 4 3s3-1 4-3M32 22v16" fill="none" />
    </g>

    <!-- timer -->
    <g v-else-if="name === 'timer'" :stroke="t.c" stroke-width="2.5" stroke-linecap="round">
      <circle cx="32" cy="36" r="14" fill="white" fill-opacity="0.35" />
      <path d="M32 36V28M32 18v-4M24 14h16" />
      <path d="M26 36h12" stroke-opacity="0.5" />
    </g>

    <!-- rocket -->
    <g v-else-if="name === 'rocket'" :stroke="t.c" stroke-width="2.2" stroke-linejoin="round">
      <path d="M32 16c-8 8-10 16-10 22l10-4 10 4c0-6-2-14-10-22z" fill="white" fill-opacity="0.4" />
      <circle cx="32" cy="26" r="3" fill="white" fill-opacity="0.6" />
      <path d="M22 38l-4 6 6-2M42 38l4 6-6-2" fill="none" />
    </g>

    <!-- chart -->
    <g v-else-if="name === 'chart'" :stroke="t.c" stroke-width="2.5" stroke-linecap="round">
      <rect x="18" y="34" width="8" height="12" rx="2" fill="white" fill-opacity="0.45" />
      <rect x="28" y="26" width="8" height="20" rx="2" fill="white" fill-opacity="0.55" />
      <rect x="38" y="20" width="8" height="26" rx="2" fill="white" fill-opacity="0.65" />
    </g>

    <!-- users -->
    <g v-else-if="name === 'users'" :stroke="t.c" stroke-width="2.2" fill="white" fill-opacity="0.35">
      <circle cx="26" cy="28" r="5" />
      <circle cx="40" cy="28" r="5" />
      <path d="M16 44c0-6 4-10 10-10s10 4 10 10M34 44c0-4 2.5-7 6-8" fill="none" />
    </g>

    <!-- book -->
    <g v-else-if="name === 'book'" :stroke="t.c" stroke-width="2.2" stroke-linejoin="round">
      <path d="M20 22h12a4 4 0 0 1 4 4v18H24a4 4 0 0 0-4 4V22z" fill="white" fill-opacity="0.4" />
      <path d="M44 22H32a4 4 0 0 0-4 4v18h12a4 4 0 0 1 4 4V22z" fill="white" fill-opacity="0.3" />
      <path d="M32 22v26" />
    </g>

    <!-- sparkles -->
    <g v-else-if="name === 'sparkles'" :stroke="t.c" stroke-width="2.2" stroke-linecap="round">
      <path d="M32 16l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z" fill="white" fill-opacity="0.5" />
      <path d="M46 22v4M48 24h-4M18 40v3M19.5 41.5h-3" />
    </g>

    <!-- shield -->
    <g v-else-if="name === 'shield'" :stroke="t.c" stroke-width="2.2" stroke-linejoin="round">
      <path d="M32 18l14 6v10c0 10-6 16-14 18-8-2-14-8-14-18V24l14-6z" fill="white" fill-opacity="0.4" />
      <path d="M26 32l4 4 8-8" fill="none" />
    </g>

    <!-- target -->
    <g v-else-if="name === 'target'" :stroke="t.c" stroke-width="2.2">
      <circle cx="32" cy="32" r="14" fill="white" fill-opacity="0.25" />
      <circle cx="32" cy="32" r="9" fill="none" />
      <circle cx="32" cy="32" r="4" fill="white" fill-opacity="0.6" />
    </g>
  </svg>
</template>
