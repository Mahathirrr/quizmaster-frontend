<script setup lang="ts">
const props = defineProps<{
  value: number
  max?: number
  label?: string
  variant?: 'purple' | 'default'
}>()

const pct = () => {
  const max = props.max ?? 100
  return max > 0 ? Math.min(100, Math.round((props.value / max) * 100)) : 0
}
</script>

<template>
  <div>
    <div v-if="label" class="mb-1.5 flex items-center justify-between text-xs font-semibold">
      <span class="text-muted-foreground">{{ label }}</span>
      <span :class="variant === 'purple' ? 'text-white/80' : 'text-primary'">{{ value }}{{ max ? `/${max}` : '%' }}</span>
    </div>
    <div :class="variant === 'purple' ? 'qm-progress' : 'qm-progress-track'">
      <div
        :class="variant === 'purple' ? 'qm-progress-fill' : 'qm-progress-track-fill'"
        :style="{ width: `${pct()}%` }"
      />
    </div>
  </div>
</template>
