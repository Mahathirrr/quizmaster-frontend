<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    results.value = await api.listResults(auth.token)
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
      <h1 class="text-2xl font-semibold tracking-tight">Results</h1>
      <p class="text-sm text-muted-foreground">All exam submissions across the platform.</p>
    </div>

    <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

    <Card>
      <CardHeader>
        <CardTitle>All results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table v-if="results.length">
          <TableHeader>
            <TableRow>
              <TableHead>Exam</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in results" :key="row.id">
              <TableCell class="font-medium">{{ row.exam_title || `#${row.exam_id}` }}</TableCell>
              <TableCell>{{ row.student_name || `#${row.student_id}` }}</TableCell>
              <TableCell>{{ row.score }}%</TableCell>
              <TableCell>
                <Badge :variant="row.passed ? 'success' : 'destructive'">
                  {{ row.passed ? 'Passed' : 'Failed' }}
                </Badge>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ formatDate(row.submitted_at) }}</TableCell>
              <TableCell>
                <RouterLink
                  :to="`/admin/exams/${row.exam_id}/results`"
                  class="text-sm underline-offset-4 hover:underline"
                >
                  View exam
                </RouterLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">No results yet.</p>
      </CardContent>
    </Card>
  </div>
</template>
