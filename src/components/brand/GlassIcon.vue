<script setup lang="ts">
import { computed } from 'vue'
import {
  BookOpen,
  LineChart,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-vue-next'
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
  | 'streak'

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

const assetMap: Partial<Record<GlassIconName, string>> = {
  trophy: '/assets/badge-trophy.png',
  brain: '/assets/badge-brain.png',
  timer: '/assets/badge-timer.png',
  target: '/assets/badge-target.png',
  streak: '/assets/badge-streak.png',
}

const is3DAsset = computed(() => !!assetMap[props.name])
const assetSrc = computed(() => assetMap[props.name])

const fallbackTones: Record<GlassTone, { bg: string; text: string; border: string }> = {
  violet: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  coral: { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' },
  mint: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
  sun: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-500', border: 'border-pink-500/20' },
  sky: { bg: 'bg-sky-500/10', text: 'text-sky-500', border: 'border-sky-500/20' },
}

const toneStyle = computed(() => fallbackTones[props.tone])
</script>

<template>
  <!-- 3D Rendered Badge Asset -->
  <img
    v-if="is3DAsset"
    :src="assetSrc"
    :alt="props.name"
    :width="size"
    :height="size"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :class="cn('shrink-0 object-contain select-none drop-shadow-sm transition-transform duration-200 hover:scale-105', props.class)"
  />

  <!-- Clean Tactile Icon Token -->
  <div
    v-else
    :style="{ width: `${size}px`, height: `${size}px` }"
    :class="cn(
      'flex shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-transform duration-200 hover:scale-105',
      toneStyle.bg,
      toneStyle.text,
      toneStyle.border,
      props.class,
    )"
  >
    <Rocket v-if="name === 'rocket'" :size="size * 0.52" />
    <LineChart v-else-if="name === 'chart'" :size="size * 0.52" />
    <Users v-else-if="name === 'users'" :size="size * 0.52" />
    <BookOpen v-else-if="name === 'book'" :size="size * 0.52" />
    <Sparkles v-else-if="name === 'sparkles'" :size="size * 0.52" />
    <ShieldCheck v-else-if="name === 'shield'" :size="size * 0.52" />
  </div>
</template>
