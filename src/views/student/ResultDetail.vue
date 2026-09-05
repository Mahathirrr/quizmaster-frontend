<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import GlassIcon from '@/components/brand/GlassIcon.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { api, type ExamResult } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const resultId = Number(route.params.id)
const result = ref<ExamResult | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!auth.token) return
  try {
    result.value = await api.resultDetail(auth.token, resultId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal memuat hasil'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="mx-auto max-w-lg space-y-6">
    <RouterLink to="/student/results" class="text-sm font-medium text-primary hover:underline">
      ← Kembali ke hasil
    </RouterLink>

    <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

    <div v-if="result" class="qm-card overflow-hidden p-6 text-center">
      <GlassIcon :name="result.passed ? 'trophy' : 'brain'" :tone="result.passed ? 'sun' : 'coral'" :size="72" class="mx-auto mb-4" />
      <h1 class="text-xl font-extrabold">{{ result.exam_title || `Ujian #${result.exam_id}` }}</h1>
      <p class="mt-6 text-5xl font-extrabold tabular-nums text-primary">{{ result.score }}%</p>
      <Badge :variant="result.passed ? 'success' : 'destructive'" class="mt-4 text-sm">
        {{ result.passed ? 'Lulus! Mantap 🎉' : 'Belum lulus, coba lagi 💪' }}
      </Badge>

      <div class="mt-6 space-y-2 rounded-xl bg-secondary/50 p-4 text-sm">
        <div class="flex justify-between">
          <span class="text-muted-foreground">Benar</span>
          <span class="font-semibold">{{ result.correct_answers }} / {{ result.total_questions }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Ambang lulus</span>
          <span class="font-semibold">{{ result.pass_score }}%</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Dikumpulkan</span>
          <span class="font-semibold">{{ formatDate(result.submitted_at) }}</span>
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <RouterLink :to="`/student/results/${result.id}/review`">
          <Button variant="fun" class="w-full rounded-xl sm:w-auto">Review Jawaban</Button>
        </RouterLink>
        <RouterLink :to="`/student/exams/${result.exam_id}/leaderboard`">
          <Button variant="outline" class="w-full rounded-xl sm:w-auto">Leaderboard</Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
