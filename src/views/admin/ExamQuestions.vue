<script setup lang="ts">
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type Question } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const examId = Number(route.params.id)

const questions = ref<Question[]>([])
const loading = ref(true)
const error = ref('')
const dialogOpen = ref(false)
const editing = ref<Question | null>(null)

const form = ref({
  text: '',
  options: ['', '', '', ''],
  correct_answer: 0,
  points: 1,
})

async function load() {
  if (!auth.token) return
  loading.value = true
  error.value = ''
  try {
    questions.value = await api.listQuestions(auth.token, examId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load questions'
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editing.value = null
  form.value = { text: '', options: ['', '', '', ''], correct_answer: 0, points: 1 }
  dialogOpen.value = true
}

function openEdit(question: Question) {
  editing.value = question
  form.value = {
    text: question.text,
    options: [...question.options],
    correct_answer: question.correct_answer ?? 0,
    points: question.points ?? 1,
  }
  while (form.value.options.length < 4) form.value.options.push('')
  dialogOpen.value = true
}

async function save() {
  if (!auth.token) return
  const body = {
    text: form.value.text,
    options: form.value.options.filter(Boolean),
    correct_answer: form.value.correct_answer,
    points: form.value.points,
  }
  if (editing.value) {
    await api.updateQuestion(auth.token, examId, editing.value.id, body)
  } else {
    await api.createQuestion(auth.token, examId, body)
  }
  dialogOpen.value = false
  await load()
}

async function remove(id: number) {
  if (!auth.token || !confirm('Delete this question?')) return
  await api.deleteQuestion(auth.token, examId, id)
  await load()
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <RouterLink to="/admin/exams" class="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft class="size-3.5" />
          Back to exams
        </RouterLink>
        <h1 class="text-2xl font-semibold tracking-tight">Exam questions</h1>
        <p class="text-sm text-muted-foreground">Manage questions for exam #{{ examId }}.</p>
      </div>
      <Button @click="openCreate">
        <Plus class="size-4" />
        Add question
      </Button>
    </div>

    <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

    <Card>
      <CardHeader>
        <CardTitle>Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table v-if="questions.length">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Options</TableHead>
              <TableHead>Points</TableHead>
              <TableHead class="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(q, idx) in questions" :key="q.id">
              <TableCell>{{ idx + 1 }}</TableCell>
              <TableCell class="max-w-xs font-medium">{{ q.text }}</TableCell>
              <TableCell class="text-muted-foreground">{{ q.options.length }} options</TableCell>
              <TableCell>{{ q.points ?? 1 }}</TableCell>
              <TableCell>
                <div class="flex gap-1">
                  <Button variant="ghost" size="icon" @click="openEdit(q)">
                    <Pencil class="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="remove(q.id)">
                    <Trash2 class="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">No questions yet.</p>
      </CardContent>
    </Card>

    <Dialog v-model:open="dialogOpen" :title="editing ? 'Edit question' : 'New question'">
      <form class="space-y-4" @submit.prevent="save">
        <div class="space-y-2">
          <Label for="text">Question</Label>
          <Input id="text" v-model="form.text" required />
        </div>
        <div v-for="(_, i) in form.options" :key="i" class="space-y-2">
          <Label :for="`opt-${i}`">Option {{ i + 1 }}</Label>
          <Input :id="`opt-${i}`" v-model="form.options[i]" required />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-2">
            <Label for="correct">Correct option (0-based index)</Label>
            <Input id="correct" v-model.number="form.correct_answer" type="number" min="0" max="3" required />
          </div>
          <div class="space-y-2">
            <Label for="points">Points</Label>
            <Input id="points" v-model.number="form.points" type="number" min="1" required />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" @click="dialogOpen = false">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>
