<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import GlassIcon from '@/components/brand/GlassIcon.vue'
import PageHeader from '@/components/brand/PageHeader.vue'
import StatCard from '@/components/brand/StatCard.vue'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type DashboardStats } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const stats = ref<DashboardStats | null>(null)
const error = ref('')
const loading = ref(true)

const quickActions = [
  { label: 'Buat kategori baru', icon: 'book' as const, tone: 'mint' as const, to: '/admin/categories' },
  { label: 'Kelola ujian', icon: 'target' as const, tone: 'sun' as const, to: '/admin/exams' },
  { label: 'Lihat semua hasil', icon: 'trophy' as const, tone: 'coral' as const, to: '/admin/results' },
]

onMounted(async () => {
  if (!auth.token) return
  try {
    stats.value = await api.adminDashboard(auth.token)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal memuat dashboard'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Dashboard Admin 📊"
      description="Ringkasan platform ujian kamu."
      icon="chart"
      tone="violet"
      imageSrc="/assets/icon-dashboard.png"
    />

    <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Kategori" :value="stats?.total_categories ?? 0" icon="book" tone="mint" :loading="loading" />
      <StatCard label="Ujian" :value="stats?.total_exams ?? 0" icon="target" tone="sun" :loading="loading" />
      <StatCard label="Siswa" :value="stats?.total_students ?? 0" icon="users" tone="sky" :loading="loading" />
      <StatCard label="Hasil" :value="stats?.total_results ?? 0" icon="trophy" tone="coral" :loading="loading" />
    </div>

    <!-- Quick actions -->
    <div>
      <h2 class="font-extrabold mb-3">Aksi Cepat</h2>
      <div class="grid gap-3 sm:grid-cols-3">
        <RouterLink v-for="action in quickActions" :key="action.label" :to="action.to" class="qm-card flex items-center gap-3 p-4">
          <GlassIcon :name="action.icon" :tone="action.tone" :size="40" />
          <span class="text-sm font-bold">{{ action.label }}</span>
        </RouterLink>
      </div>
    </div>

    <div class="qm-card overflow-hidden">
      <div class="border-b border-border px-5 py-4">
        <h2 class="font-extrabold">Aktivitas Terbaru</h2>
        <p class="text-xs text-muted-foreground mt-0.5">5 pengumpulan ujian terakhir</p>
      </div>
      <div class="p-5">
        <Table v-if="stats?.recent_results?.length">
          <TableHeader>
            <TableRow>
              <TableHead>Ujian</TableHead>
              <TableHead>Siswa</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Waktu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in stats.recent_results" :key="row.id">
              <TableCell class="font-semibold">{{ row.exam_title || `#${row.exam_id}` }}</TableCell>
              <TableCell>{{ row.student_name || `#${row.student_id}` }}</TableCell>
              <TableCell class="font-extrabold text-primary">{{ row.score }}%</TableCell>
              <TableCell>
                <Badge :variant="row.passed ? 'success' : 'destructive'">{{ row.passed ? 'Lulus' : 'Gagal' }}</Badge>
              </TableCell>
              <TableCell class="text-muted-foreground text-sm">{{ formatDate(row.submitted_at) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else class="text-sm text-muted-foreground">Belum ada pengumpulan ujian.</p>
      </div>
    </div>
  </div>
</template>
