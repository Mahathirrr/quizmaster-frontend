<script setup lang="ts">
import { Pencil, Plus, Trash2 } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

import PageHeader from '@/components/brand/PageHeader.vue'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api, type Category } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref('')
const dialogOpen = ref(false)
const editing = ref<Category | null>(null)
const name = ref('')
const description = ref('')

async function load() {
  if (!auth.token) return
  loading.value = true
  error.value = ''
  try {
    categories.value = await api.listCategories(auth.token)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load categories'
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editing.value = null
  name.value = ''
  description.value = ''
  dialogOpen.value = true
}

function openEdit(category: Category) {
  editing.value = category
  name.value = category.name
  description.value = category.description || ''
  dialogOpen.value = true
}

async function save() {
  if (!auth.token) return
  const body = { name: name.value, description: description.value }
  if (editing.value) {
    await api.updateCategory(auth.token, editing.value.id, body)
  } else {
    await api.createCategory(auth.token, body)
  }
  dialogOpen.value = false
  await load()
}

async function remove(id: number) {
  if (!auth.token || !confirm('Delete this category?')) return
  await api.deleteCategory(auth.token, id)
  await load()
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Kategori 📚" description="Kelompokkan ujian biar rapi." icon="book" tone="mint">
      <template #actions>
        <Button variant="fun" class="rounded-xl" @click="openCreate">
          <Plus class="size-4" />
          Tambah Kategori
        </Button>
      </template>
    </PageHeader>

    <p v-if="error" class="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{{ error }}</p>

    <div class="qm-card overflow-hidden">
      <div class="border-b border-border/60 px-5 py-4">
        <h2 class="font-bold">Semua Kategori</h2>
      </div>
      <div class="p-5">
        <Table v-if="categories.length">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead class="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="category in categories" :key="category.id">
              <TableCell class="font-medium">{{ category.name }}</TableCell>
              <TableCell class="text-muted-foreground">{{ category.description || '—' }}</TableCell>
              <TableCell class="text-muted-foreground">{{ formatDate(category.created_at) }}</TableCell>
              <TableCell>
                <div class="flex gap-1">
                  <Button variant="ghost" size="icon" @click="openEdit(category)">
                    <Pencil class="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="remove(category.id)">
                    <Trash2 class="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p v-else-if="!loading" class="text-sm text-muted-foreground">Belum ada kategori.</p>
      </div>
    </div>

    <Dialog v-model:open="dialogOpen" :title="editing ? 'Edit Kategori' : 'Kategori Baru'">
      <form class="space-y-4" @submit.prevent="save">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="name" required />
        </div>
        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Input id="description" v-model="description" />
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" class="rounded-xl" @click="dialogOpen = false">Batal</Button>
          <Button type="submit" variant="fun" class="rounded-xl">Simpan</Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>
