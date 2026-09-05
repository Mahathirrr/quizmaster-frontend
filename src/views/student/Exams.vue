<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import PageHeader from '@/components/brand/PageHeader.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type StudentExam } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const exams = ref<StudentExam[]>([])
const loading = ref(true)
const error = ref('')

function statusLabel(status: StudentExam['status']) {
  const map: Record<StudentExam['status'], string> = {
    available: 'Tersedia',
    enrolled: 'Terdaftar',
    in_progress: 'Sedang dikerjakan',
    completed: 'Selesai',
  }
  return map[status]
}

function statusVariant(status: StudentExam['status']) {
  if (status === 'completed') return 'success'
  if (status === 'in_progress') return 'default'
  if (status === 'enrolled') return 'secondary'
  return 'outline'
}

async function load() {
  if (!auth.token) return
  loading.value = true
  error.value = ''
  try {
    exams.value = await api.studentExams(auth.token)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal memuat ujian'
  } finally {
    loading.value = false
  }
}

async function enroll(examId: number) {
  if (!auth.token) return
  await api.enrollExam(auth.token, examId)
  await load()
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Daftar Ujian 📝"
      description="Pilih ujian, daftar, terus gas kerjain!"
      icon="rocket"
      tone="coral"
    />

    <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

    <div class="qm-card overflow-hidden">
      <div class="border-b border-border/60 px-5 py-4">
        <h2 class="font-bold">Semua Ujian</h2>
      </div>
      <div class="p-5">
        <Table v-if="exams.length">
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="exam in exams" :key="exam.id">
              <TableCell class="font-medium">{{ exam.title }}</TableCell>
              <TableCell>{{ exam.category_name || '—' }}</TableCell>
              <TableCell>{{ exam.duration_minutes }} menit</TableCell>
              <TableCell>
                <Badge :variant="statusVariant(exam.status)">{{ statusLabel(exam.status) }}</Badge>
              </TableCell>
              <TableCell>
                <Button v-if="exam.status === 'available'" size="sm" variant="fun" class="rounded-lg" @click="enroll(exam.id)">
                  Daftar
                </Button>
                <RouterLink v-else-if="exam.status === 'enrolled' || exam.status === 'in_progress'" :to="`/student/exams/${exam.id}/take`">
                  <Button size="sm" variant="fun" class="rounded-lg">Kerjakan!</Button>
                </RouterLink>
                <div v-else class="flex gap-2">
                  <RouterLink :to="`/student/results/${exam.result_id}`" class="text-sm font-semibold text-primary hover:underline">Hasil</RouterLink>
                  <RouterLink :to="`/student/exams/${exam.id}/leaderboard`" class="text-sm font-semibold text-primary hover:underline">Leaderboard</RouterLink>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">Belum ada ujian tersedia.</p>
      </div>
    </div>
  </div>
</template>
