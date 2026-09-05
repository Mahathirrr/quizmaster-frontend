<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import GlassIcon from '@/components/brand/GlassIcon.vue'
import PageHeader from '@/components/brand/PageHeader.vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type LeaderboardEntry } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const examId = Number(route.params.id)
const entries = ref<LeaderboardEntry[]>([])
const loading = ref(true)
const error = ref('')

const medals = ['🥇', '🥈', '🥉']

onMounted(async () => {
  if (!auth.token) return
  try {
    entries.value = await api.leaderboard(auth.token, examId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal memuat leaderboard'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <RouterLink to="/student/exams" class="text-sm font-medium text-primary hover:underline">
      ← Kembali ke ujian
    </RouterLink>
    <PageHeader title="Leaderboard 🏆" :description="`Ranking skor ujian #${examId}`" icon="trophy" tone="sun" />

    <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

    <div class="qm-card overflow-hidden">
      <div class="p-5">
        <div v-if="entries.length" class="space-y-2">
          <div
            v-for="entry in entries"
            :key="entry.student_id"
            class="flex items-center gap-4 rounded-xl border border-border/60 px-4 py-3 transition-all hover:border-primary/30"
            :class="entry.rank <= 3 ? 'bg-gradient-to-r from-amber-50/80 to-transparent' : ''"
          >
            <span class="w-10 text-center text-lg font-extrabold">
              {{ entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}` }}
            </span>
            <GlassIcon v-if="entry.rank === 1" name="trophy" tone="sun" :size="36" />
            <div class="flex-1">
              <p class="font-bold">{{ entry.student_name }}</p>
              <p class="text-xs text-muted-foreground">{{ formatDate(entry.submitted_at) }}</p>
            </div>
            <span class="text-xl font-extrabold text-primary">{{ entry.score }}%</span>
          </div>
        </div>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">Belum ada yang submit. Jadi yang pertama!</p>
      </div>
    </div>
  </div>
</template>
