<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import PageHeader from '@/components/brand/PageHeader.vue'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type ExamResult } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const results = ref<ExamResult[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!auth.token) return
  try {
    results.value = await api.studentResults(auth.token)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal memuat hasil'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Hasil Ujian 📋" description="Semua submission dan skor kamu." icon="chart" tone="violet" />

    <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

    <div class="qm-card overflow-hidden">
      <div class="p-5">
        <Table v-if="results.length">
          <TableHeader>
            <TableRow>
              <TableHead>Ujian</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in results" :key="row.id">
              <TableCell class="font-medium">{{ row.exam_title || `#${row.exam_id}` }}</TableCell>
              <TableCell class="font-bold">{{ row.score }}%</TableCell>
              <TableCell>
                <Badge :variant="row.passed ? 'success' : 'destructive'">
                  {{ row.passed ? 'Lulus 🎉' : 'Belum 😅' }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ formatDate(row.submitted_at) }}</TableCell>
              <TableCell>
                <div class="flex gap-3">
                  <RouterLink :to="`/student/results/${row.id}`" class="text-sm font-semibold text-primary hover:underline">Detail</RouterLink>
                  <RouterLink :to="`/student/results/${row.id}/review`" class="text-sm font-semibold text-primary hover:underline">Review</RouterLink>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">Belum ada hasil. Yuk ikut ujian!</p>
      </div>
    </div>
  </div>
</template>
