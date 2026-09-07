<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import GlassIcon from '@/components/brand/GlassIcon.vue'
import HexBadge from '@/components/brand/HexBadge.vue'
import ProgressBar from '@/components/brand/ProgressBar.vue'
import StatCard from '@/components/brand/StatCard.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type StudentDashboard } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const data = ref<StudentDashboard | null>(null)
const loading = ref(true)
const error = ref('')
const activeCategory = ref('Semua')
const categories = ['Semua', 'Matematika', 'IPA', 'Bahasa', 'Sejarah']

const xp = computed(() => Math.round((data.value?.average_score ?? 0) * 10))
const level = computed(() => {
  const avg = data.value?.average_score ?? 0
  if (avg >= 90) return 'Platinum'
  if (avg >= 75) return 'Gold'
  if (avg >= 60) return 'Silver'
  return 'Bronze'
})

const streak = computed(() => Math.min(7, data.value?.completed_exams ?? 0))

const badges = computed(() => [
  { name: 'First Quiz', icon: 'sparkles' as const, tone: 'sun' as const, unlocked: (data.value?.completed_exams ?? 0) >= 1 },
  { name: 'High Scorer', icon: 'trophy' as const, tone: 'coral' as const, unlocked: (data.value?.average_score ?? 0) >= 80 },
  { name: 'Speed Runner', icon: 'timer' as const, tone: 'mint' as const, unlocked: (data.value?.completed_exams ?? 0) >= 3 },
  { name: 'Brain Master', icon: 'brain' as const, tone: 'violet' as const, unlocked: (data.value?.average_score ?? 0) >= 90 },
])

const tips = [
  'Baca soal dengan teliti sebelum jawab — jangan buru-buru!',
  'Manfaatin waktu sisa buat review jawaban yang ragu.',
  'Cek leaderboard buat motivasi extra 💪',
]

onMounted(async () => {
  if (!auth.token) return
  try {
    data.value = await api.studentDashboard(auth.token)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal memuat dashboard'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- User header -->
    <div class="qm-card p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="relative shrink-0">
            <div class="qm-avatar size-16 text-xl font-black shadow-sm">{{ auth.user?.name?.charAt(0) ?? '?' }}</div>
            <img src="/assets/mascot.png" alt="Mascot" class="absolute -bottom-2 -right-2 size-8 object-contain drop-shadow-xs" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl sm:text-2xl font-black">Halo, {{ auth.user?.name }}! 👋</h1>
              <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-black text-primary">Tier {{ level }}</span>
            </div>
            <p class="text-xs sm:text-sm font-semibold text-muted-foreground mt-0.5">
              XP Terkumpul: <span class="font-extrabold text-foreground">{{ xp }} XP</span> · Terus tingkatkan skormu!
            </p>
          </div>
        </div>
        <RouterLink to="/student/exams">
          <button class="qm-btn-fun inline-flex items-center gap-2 px-5 py-2.5 text-sm">
            <img src="/assets/badge-target.png" alt="Quiz" class="size-5 object-contain" />
            Mulai Kuis Baru
          </button>
        </RouterLink>
      </div>
      <ProgressBar :value="data?.average_score ?? 0" :max="100" label="Progress ke level berikutnya" class="mt-5" />
    </div>

    <!-- Streak banner -->
    <div class="qm-card-yellow flex flex-wrap items-center justify-between gap-4 p-5">
      <div class="flex items-center gap-4">
        <img src="/assets/badge-streak.png" alt="Streak Flame" class="size-16 object-contain drop-shadow-sm qm-bounce" />
        <div>
          <p class="text-xs font-black uppercase tracking-wider opacity-75">Daily Learning Streak</p>
          <p class="text-2xl sm:text-3xl font-black">{{ streak }} Hari Berturut 🔥</p>
          <p class="text-xs font-bold mt-0.5">Keren banget! Pertahankan konsistensimu belajar tiap hari.</p>
        </div>
      </div>
      <RouterLink to="/student/exams">
        <Button variant="outline" size="sm" class="rounded-xl border-amber-400/50 bg-amber-500/10 font-bold hover:bg-amber-500/20">
          Latih Kuis Hari Ini →
        </Button>
      </RouterLink>
    </div>

    <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

    <!-- Stats -->
    <div class="grid gap-4 sm:grid-cols-3">
      <StatCard label="Ujian Diikuti" :value="data?.enrolled_exams ?? 0" icon="book" tone="violet" :loading="loading" />
      <StatCard label="Selesai" :value="data?.completed_exams ?? 0" icon="target" tone="mint" :loading="loading" />
      <StatCard label="Rata-rata Skor" :value="`${data?.average_score ?? 0}%`" icon="chart" tone="sun" :loading="loading" />
    </div>

    <!-- Category pills -->
    <div>
      <h2 class="font-extrabold mb-3">Kategori Ujian</h2>
      <div class="flex flex-wrap gap-2">
        <button v-for="cat in categories" :key="cat" type="button"
          :class="['qm-pill', activeCategory === cat && 'qm-pill-active']"
          @click="activeCategory = cat">{{ cat }}</button>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Badges -->
      <div class="qm-card p-5">
        <h2 class="font-extrabold mb-4">My Badges 🏅</h2>
        <div class="flex flex-wrap gap-4">
          <HexBadge v-for="b in badges" :key="b.name" :name="b.name" :icon="b.icon" :tone="b.tone" :locked="!b.unlocked" />
        </div>
      </div>
      <!-- Tips -->
      <div class="qm-card p-5">
        <h2 class="font-extrabold mb-4">Tips Hari Ini 💡</h2>
        <ul class="space-y-3">
          <li v-for="(tip, i) in tips" :key="i" class="flex items-start gap-3 text-sm">
            <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-extrabold">{{ i + 1 }}</span>
            <span class="text-muted-foreground leading-relaxed">{{ tip }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Recent results -->
    <div class="qm-card overflow-hidden">
      <div class="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 class="font-extrabold">Hasil Terbaru</h2>
        <RouterLink to="/student/results" class="text-sm font-bold text-primary hover:underline">Lihat semua →</RouterLink>
      </div>
      <div class="p-5">
        <Table v-if="data?.recent_results?.length">
          <TableHeader>
            <TableRow>
              <TableHead>Ujian</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Waktu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in data.recent_results" :key="row.id">
              <TableCell class="font-semibold">{{ row.exam_title || `#${row.exam_id}` }}</TableCell>
              <TableCell class="font-extrabold text-primary">{{ row.score }}%</TableCell>
              <TableCell>
                <Badge :variant="row.passed ? 'success' : 'destructive'">
                  {{ row.passed ? 'Lulus 🎉' : 'Belum 😅' }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground text-sm">{{ formatDate(row.submitted_at) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div v-else class="text-center py-6">
          <GlassIcon name="rocket" tone="coral" :size="48" class="mx-auto mb-3" />
          <p class="text-sm text-muted-foreground">Belum ada hasil. Yuk ikut ujian pertama!</p>
          <RouterLink to="/student/exams"><Button variant="fun" class="mt-4 rounded-xl">Cari Ujian</Button></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
