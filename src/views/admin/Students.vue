<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type Student } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const students = ref<Student[]>([])
const loading = ref(true)
const error = ref('')
const dialogOpen = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')

async function load() {
  if (!auth.token) return
  loading.value = true
  error.value = ''
  try {
    students.value = await api.listStudents(auth.token)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load students'
  } finally {
    loading.value = false
  }
}

function openCreate() {
  name.value = ''
  email.value = ''
  password.value = ''
  dialogOpen.value = true
}

async function save() {
  if (!auth.token) return
  await api.createStudent(auth.token, {
    name: name.value,
    email: email.value,
    password: password.value,
  })
  dialogOpen.value = false
  await load()
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Students</h1>
        <p class="text-sm text-muted-foreground">Manage student accounts.</p>
      </div>
      <Button @click="openCreate">
        <Plus class="size-4" />
        Add student
      </Button>
    </div>

    <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

    <Card>
      <CardHeader>
        <CardTitle>All students</CardTitle>
      </CardHeader>
      <CardContent>
        <Table v-if="students.length">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="student in students" :key="student.id">
              <TableCell class="font-medium">{{ student.name }}</TableCell>
              <TableCell>{{ student.email }}</TableCell>
              <TableCell class="text-muted-foreground">{{ formatDate(student.created_at) }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">No students yet.</p>
      </CardContent>
    </Card>

    <Dialog v-model:open="dialogOpen" title="New student">
      <form class="space-y-4" @submit.prevent="save">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="name" required />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" required />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" required />
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" @click="dialogOpen = false">Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>
