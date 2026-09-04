<script setup lang="ts">
import { FileQuestion, Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type Category, type Exam } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const exams = ref<Exam[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref('')
const dialogOpen = ref(false)
const editing = ref<Exam | null>(null)

const form = ref({
  title: '',
  description: '',
  category_id: 0,
  duration_minutes: 30,
  pass_score: 70,
  status: 'draft' as Exam['status'],
})

const categoryMap = computed(() => Object.fromEntries(categories.value.map((c) => [c.id, c.name])))

function statusVariant(status: Exam['status']) {
  if (status === 'published') return 'success'
  if (status === 'closed') return 'secondary'
  return 'outline'
}

async function load() {
  if (!auth.token) return
  loading.value = true
  error.value = ''
  try {
    ;[exams.value, categories.value] = await Promise.all([
      api.listExams(auth.token),
      api.listCategories(auth.token),
    ])
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load exams'
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editing.value = null
  form.value = {
    title: '',
    description: '',
    category_id: categories.value[0]?.id ?? 0,
    duration_minutes: 30,
    pass_score: 70,
    status: 'draft',
  }
  dialogOpen.value = true
}

function openEdit(exam: Exam) {
  editing.value = exam
  form.value = {
    title: exam.title,
    description: exam.description || '',
    category_id: exam.category_id,
    duration_minutes: exam.duration_minutes,
    pass_score: exam.pass_score,
    status: exam.status,
  }
  dialogOpen.value = true
}

async function save() {
  if (!auth.token) return
  if (editing.value) {
    await api.updateExam(auth.token, editing.value.id, form.value)
  } else {
    await api.createExam(auth.token, form.value)
  }
  dialogOpen.value = false
  await load()
}

async function remove(id: number) {
  if (!auth.token || !confirm('Delete this exam?')) return
  await api.deleteExam(auth.token, id)
  await load()
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Exams</h1>
        <p class="text-sm text-muted-foreground">Create and manage exams.</p>
      </div>
      <Button @click="openCreate">
        <Plus class="size-4" />
        Add exam
      </Button>
    </div>

    <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

    <Card>
      <CardHeader>
        <CardTitle>All exams</CardTitle>
      </CardHeader>
      <CardContent>
        <Table v-if="exams.length">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Pass score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead class="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="exam in exams" :key="exam.id">
              <TableCell class="font-medium">{{ exam.title }}</TableCell>
              <TableCell>{{ categoryMap[exam.category_id] || exam.category_name || '—' }}</TableCell>
              <TableCell>{{ exam.duration_minutes }} min</TableCell>
              <TableCell>{{ exam.pass_score }}%</TableCell>
              <TableCell>
                <Badge :variant="statusVariant(exam.status)">{{ exam.status }}</Badge>
              </TableCell>
              <TableCell>{{ exam.question_count ?? 0 }}</TableCell>
              <TableCell>
                <div class="flex gap-1">
                  <RouterLink
                    :to="`/admin/exams/${exam.id}/questions`"
                    class="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
                  >
                    <FileQuestion class="size-4" />
                  </RouterLink>
                  <Button variant="ghost" size="icon" @click="openEdit(exam)">
                    <Pencil class="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="remove(exam.id)">
                    <Trash2 class="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">No exams yet.</p>
      </CardContent>
    </Card>

    <Dialog v-model:open="dialogOpen" :title="editing ? 'Edit exam' : 'New exam'">
      <form class="space-y-4" @submit.prevent="save">
        <div class="space-y-2">
          <Label for="title">Title</Label>
          <Input id="title" v-model="form.title" required />
        </div>
        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Input id="description" v-model="form.description" />
        </div>
        <div class="space-y-2">
          <Label for="category">Category</Label>
          <select
            id="category"
            v-model.number="form.category_id"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            required
          >
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-2">
            <Label for="duration">Duration (min)</Label>
            <Input id="duration" v-model.number="form.duration_minutes" type="number" min="1" required />
          </div>
          <div class="space-y-2">
            <Label for="pass">Pass score (%)</Label>
            <Input id="pass" v-model.number="form.pass_score" type="number" min="0" max="100" required />
          </div>
        </div>
        <div class="space-y-2">
          <Label for="status">Status</Label>
          <select
            id="status"
            v-model="form.status"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" @click="dialogOpen = false">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>
