<script setup lang="ts">
import { Check, X } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api, type ReviewAnswer } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const resultId = Number(route.params.id)
const answers = ref<ReviewAnswer[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!auth.token) return
  try {
    answers.value = await api.reviewAnswers(auth.token, resultId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load review'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <RouterLink :to="`/student/results/${resultId}`" class="text-sm text-muted-foreground underline-offset-4 hover:underline">
        Back to result
      </RouterLink>
      <h1 class="mt-2 text-2xl font-semibold tracking-tight">Answer review</h1>
    </div>

    <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

    <div v-if="loading" class="text-sm text-muted-foreground">Loading…</div>

    <div v-else class="space-y-4">
      <Card v-for="(item, idx) in answers" :key="item.question_id">
        <CardHeader class="flex flex-row items-start justify-between gap-4">
          <CardTitle class="text-base leading-relaxed">
            {{ idx + 1 }}. {{ item.text }}
          </CardTitle>
          <Badge :variant="item.is_correct ? 'success' : 'destructive'">
            <Check v-if="item.is_correct" class="size-3" />
            <X v-else class="size-3" />
            {{ item.is_correct ? 'Correct' : 'Wrong' }}
          </Badge>
        </CardHeader>
        <CardContent class="space-y-2">
          <div
            v-for="(option, optIdx) in item.options"
            :key="optIdx"
            class="rounded-md border px-3 py-2 text-sm"
            :class="{
              'border-foreground bg-accent': optIdx === item.correct_answer,
              'border-destructive/40': optIdx === item.selected_option && !item.is_correct,
            }"
          >
            <span class="mr-2 font-medium">{{ String.fromCharCode(65 + optIdx) }}.</span>
            {{ option }}
            <span v-if="optIdx === item.correct_answer" class="ml-2 text-xs text-muted-foreground">(correct)</span>
            <span v-if="optIdx === item.selected_option" class="ml-2 text-xs text-muted-foreground">(your answer)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
