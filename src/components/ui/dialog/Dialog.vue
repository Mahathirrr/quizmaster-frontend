<script setup lang="ts">
import { X } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

defineProps<{
  open: boolean
  title: string
  class?: string
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

function close() {
  emit('update:open', false)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-black/40" @click="close" />
      <Card :class="cn('relative z-10 w-full max-w-lg shadow-lg', $props.class)">
        <CardHeader class="flex flex-row items-center justify-between space-y-0">
          <CardTitle>{{ title }}</CardTitle>
          <Button variant="ghost" size="icon" type="button" @click="close">
            <X class="size-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <slot />
        </CardContent>
      </Card>
    </div>
  </Teleport>
</template>
