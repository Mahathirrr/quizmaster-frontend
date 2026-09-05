<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import GlassIcon from '@/components/brand/GlassIcon.vue'
import ProgressBar from '@/components/brand/ProgressBar.vue'
import { Button } from '@/components/ui/button'
import { api, type ExamSession, type SubmitAnswer } from '@/lib/api'
import { formatDuration } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const examId = Number(route.params.id)

const session = ref<ExamSession | null>(null)
const currentIndex = ref(0)
const answers = ref<Record<number, number>>({})
const remaining = ref(0)
const loading = ref(true)
const submitting = ref(false)
const error = ref('')
const showConfirm = ref(false)

let timer: ReturnType<typeof setInterval> | null = null

const currentQuestion = computed(() => session.value?.questions[currentIndex.value])
const totalQuestions = computed(() => session.value?.questions.length ?? 0)
const progressPct = computed(() => totalQuestions.value ? Math.round(((currentIndex.value + 1) / totalQuestions.value) * 100) : 0)
const answeredCount = computed(() => Object.keys(answers.value).length)

const allAnswered = computed(() => {
  if (!session.value) return false
  return session.value.questions.every((q) => answers.value[q.id] !== undefined)
})

function selectOption(questionId: number, optionIndex: number) {
  answers.value = { ...answers.value, [questionId]: optionIndex }
}

async function loadSession() {
  if (!auth.token) return
  loading.value = true
  error.value = ''
  try {
    session.value = await api.startExam(auth.token, examId)
    remaining.value = session.value.remaining_seconds
    startTimer()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal memulai ujian'
  } finally {
    loading.value = false
  }
}

function startTimer() {
  timer = setInterval(() => {
    if (remaining.value <= 0) { void submit(true); return }
    remaining.value -= 1
  }, 1000)
}

function stopTimer() {
  if (timer) { clearInterval(timer); timer = null }
}

async function submit(auto = false) {
  if (!auth.token || !session.value || submitting.value) return
  if (!auto && !showConfirm.value) { showConfirm.value = true; return }

  submitting.value = true
  stopTimer()

  const payload: SubmitAnswer[] = session.value.questions.map((q) => ({
    question_id: q.id,
    selected_option: answers.value[q.id] ?? -1,
  }))

  try {
    const result = await api.submitExam(auth.token, examId, payload, session.value.session_id)
    await router.push(`/student/results/${result.id}`)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Gagal mengirim jawaban'
    submitting.value = false
    startTimer()
  }
}

onMounted(loadSession)
onUnmounted(stopTimer)
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <div v-if="loading" class="text-center py-20 text-muted-foreground">Memuat ujian…</div>

    <template v-else-if="session">
      <!-- Purple quiz panel like reference -->
      <div class="qm-card-plum p-5 sm:p-7 space-y-5">
        <!-- Header -->
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold text-white/70">{{ session.exam.title }}</p>
            <p class="text-lg font-extrabold">{{ String(currentIndex + 1).padStart(2, '0') }} Question</p>
          </div>
          <span :class="['rounded-full px-4 py-1.5 text-sm font-extrabold', remaining <= 60 ? 'qm-timer-urgent' : 'qm-timer']">
            ⏱ {{ formatDuration(remaining) }}
          </span>
        </div>

        <!-- Progress -->
        <ProgressBar :value="currentIndex + 1" :max="totalQuestions" variant="purple" />
        <p class="text-xs text-white/60">{{ answeredCount }}/{{ totalQuestions }} dijawab · {{ progressPct }}% selesai</p>

        <p v-if="error" class="rounded-xl bg-white/10 px-3 py-2 text-sm text-white">{{ error }}</p>

        <!-- Question -->
        <div v-if="currentQuestion">
          <p class="text-base sm:text-lg font-bold leading-relaxed mb-4">{{ currentQuestion.text }}</p>
          <div class="space-y-2.5">
            <button
              v-for="(option, idx) in currentQuestion.options"
              :key="idx"
              type="button"
              class="qm-option flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold"
              :class="answers[currentQuestion.id] === idx ? 'qm-option-selected' : ''"
              @click="selectOption(currentQuestion.id, idx)"
            >
              <span class="flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-extrabold"
                :class="answers[currentQuestion.id] === idx ? 'border-foreground bg-foreground text-butter' : 'border-border'">
                {{ String.fromCharCode(65 + idx) }}
              </span>
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Nav -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <Button variant="outline" class="rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20" :disabled="currentIndex === 0" @click="currentIndex -= 1">
            ← Previous
          </Button>
          <GlassIcon name="brain" tone="sun" :size="36" />
          <Button v-if="currentIndex < totalQuestions - 1" variant="fun" class="rounded-xl" @click="currentIndex += 1">
            Next →
          </Button>
          <Button v-else variant="fun" class="rounded-xl" :disabled="submitting" @click="submit(false)">
            Submit ✓
          </Button>
        </div>
      </div>

      <!-- Question dots -->
      <div class="mt-4 flex flex-wrap justify-center gap-1.5">
        <button
          v-for="(_, i) in totalQuestions"
          :key="i"
          type="button"
          class="size-2.5 rounded-full transition-all"
          :class="i === currentIndex ? 'bg-primary scale-125' : answers[session.questions[i]?.id ?? 0] !== undefined ? 'bg-butter' : 'bg-muted'"
          @click="currentIndex = i"
        />
      </div>

      <!-- Confirm -->
      <div v-if="showConfirm" class="qm-card mt-4 p-5">
        <p class="font-extrabold">Yakin mau kirim jawaban?</p>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ allAnswered ? 'Semua soal sudah dijawab — mantap!' : 'Masih ada soal kosong. Yakin nih?' }}
        </p>
        <div class="mt-4 flex gap-2">
          <Button variant="outline" class="rounded-xl" @click="showConfirm = false">Batal</Button>
          <Button variant="fun" class="rounded-xl" :disabled="submitting" @click="submit(true)">
            {{ submitting ? 'Mengirim…' : 'Ya, Kirim!' }}
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>
