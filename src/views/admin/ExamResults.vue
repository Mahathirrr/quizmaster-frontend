<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type ExamResult } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const examId = Number(route.params.id)
const results = ref<ExamResult[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!auth.token) return
  try {
    results.value = await api.examResults(auth.token, examId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load results'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <RouterLink to="/admin/results" class="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft class="size-3.5" />
        Back to results
      </RouterLink>
      <h1 class="text-2xl font-semibold tracking-tight">Exam results</h1>
      <p class="text-sm text-muted-foreground">Results for exam #{{ examId }}.</p>
    </div>

    <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

    <Card>
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table v-if="results.length">
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Correct</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in results" :key="row.id">
              <TableCell class="font-medium">{{ row.student_name || `#${row.student_id}` }}</TableCell>
              <TableCell>{{ row.score }}%</TableCell>
              <TableCell>{{ row.correct_answers }}/{{ row.total_questions }}</TableCell>
              <TableCell>
                <Badge :variant="row.passed ? 'success' : 'destructive'">
                  {{ row.passed ? 'Passed' : 'Failed' }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ formatDate(row.submitted_at) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">No submissions for this exam.</p>
      </CardContent>
    </Card>
  </div>
</template>
