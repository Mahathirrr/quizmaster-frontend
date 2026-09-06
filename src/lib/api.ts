import { ApiError, friendlyApiMessage } from '@/lib/api-error'
import { DEV_SKIP_AUTH } from '@/lib/dev'
import { devMockResponse } from '@/lib/dev-mock'

const raw = import.meta.env.VITE_API_URL as string | undefined
const API_URL = (
  raw !== undefined && raw !== ''
    ? raw
    : import.meta.env.PROD
      ? '/api'
      : 'http://localhost:8080/api'
).replace(/\/$/, '')

type RequestOptions = {
  method?: string
  body?: unknown
  token?: string | null
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const method = options.method || 'GET'

  if (DEV_SKIP_AUTH) {
    const mocked = devMockResponse<T>(path, method)
    if (mocked !== null) {
      await new Promise((r) => setTimeout(r, 150))
      return mocked
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (options.token) headers.Authorization = `Bearer ${options.token}`

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const data = await res.json().catch(() => ({} as Record<string, unknown>))
  if (!res.ok) {
    const raw = typeof data.error === 'string' ? data.error : typeof data.message === 'string' ? data.message : ''
    throw new ApiError(friendlyApiMessage(res.status, raw), res.status)
  }
  return data as T
}

export type UserRole = 'admin' | 'student'

export type User = {
  id: number
  name: string
  email: string
  role: UserRole
}

export type AuthResponse = {
  token: string
  user: User
}

export type Category = {
  id: number
  name: string
  description?: string
  created_at?: string
}

export type Exam = {
  id: number
  title: string
  description?: string
  category_id: number
  category_name?: string
  duration_minutes: number
  pass_score: number
  status: 'draft' | 'published' | 'closed'
  question_count?: number
  created_at?: string
}

export type Question = {
  id: number
  exam_id: number
  text: string
  options: string[]
  correct_answer?: number
  points?: number
}

export type Student = {
  id: number
  name: string
  email: string
  created_at?: string
}

export type ExamEnrollment = {
  exam_id: number
  status: 'available' | 'enrolled' | 'completed' | 'in_progress'
  result_id?: number
}

export type StudentExam = Exam & ExamEnrollment

export type ExamSession = {
  session_id: number
  exam: Exam
  questions: Array<Pick<Question, 'id' | 'text' | 'options'>>
  started_at: string
  expires_at: string
  remaining_seconds: number
}

export type SubmitAnswer = {
  question_id: number
  selected_option: number
}

export type ExamResult = {
  id: number
  exam_id: number
  exam_title?: string
  student_id: number
  student_name?: string
  score: number
  total_questions: number
  correct_answers: number
  pass_score: number
  passed: boolean
  submitted_at?: string
}

export type ReviewAnswer = {
  question_id: number
  text: string
  options: string[]
  selected_option: number | null
  correct_answer: number
  is_correct: boolean
}

export type LeaderboardEntry = {
  rank: number
  student_id: number
  student_name: string
  score: number
  submitted_at?: string
}

export type DashboardStats = {
  total_categories: number
  total_exams: number
  total_students: number
  total_results: number
  recent_results: ExamResult[]
}

export type StudentDashboard = {
  enrolled_exams: number
  completed_exams: number
  average_score: number
  recent_results: ExamResult[]
}

type BackendQuestionOptions = {
  option1: string
  option2: string
  option3: string
  option4: string
}

type BackendExam = {
  id: number
  title: string
  description?: string
  category_id: number
  category?: { id: number; name: string }
  exam_date?: string
  duration_minutes: number
  pass_score_percent: number
  status: string
  created_at?: string
}

type BackendQuestion = {
  id: number
  exam_id: number
  question_text: string
  options: BackendQuestionOptions
  correct_option?: string
  points?: number
}

type BackendSession = {
  id: number
  student_id: number
  exam_id: number
  started_at?: string
  expires_at?: string
  submitted_at?: string
  earned_points?: number
  total_points?: number
  score_percent?: number
  passed?: boolean
  exam?: BackendExam
  student?: { id: number; name: string }
}

const OPTION_KEYS = ['option1', 'option2', 'option3', 'option4'] as const

function optionsToArray(options: BackendQuestionOptions): string[] {
  return OPTION_KEYS.map((k) => options[k]).filter(Boolean)
}

function arrayToOptions(options: string[]): BackendQuestionOptions {
  return {
    option1: options[0] ?? '',
    option2: options[1] ?? '',
    option3: options[2] ?? '',
    option4: options[3] ?? '',
  }
}

function optionIndex(option: string | undefined): number {
  if (!option) return 0
  const idx = OPTION_KEYS.indexOf(option as (typeof OPTION_KEYS)[number])
  return idx >= 0 ? idx : 0
}

function indexToOption(index: number): string {
  return OPTION_KEYS[Math.max(0, Math.min(index, 3))] ?? 'option1'
}

function mapExamStatus(status: string): Exam['status'] {
  if (status === 'active') return 'published'
  if (status === 'inactive') return 'draft'
  return 'closed'
}

function toBackendExamStatus(status: Exam['status']): string {
  if (status === 'published') return 'active'
  return 'inactive'
}

function mapExam(exam: BackendExam): Exam {
  return {
    id: exam.id,
    title: exam.title,
    description: exam.description,
    category_id: exam.category_id,
    category_name: exam.category?.name,
    duration_minutes: exam.duration_minutes,
    pass_score: exam.pass_score_percent,
    status: mapExamStatus(exam.status),
    created_at: exam.created_at,
  }
}

function mapQuestion(q: BackendQuestion): Question {
  return {
    id: q.id,
    exam_id: q.exam_id,
    text: q.question_text,
    options: optionsToArray(q.options),
    correct_answer: optionIndex(q.correct_option),
    points: q.points,
  }
}

function mapSessionResult(session: BackendSession): ExamResult {
  return {
    id: session.id,
    exam_id: session.exam_id,
    exam_title: session.exam?.title,
    student_id: session.student_id,
    student_name: session.student?.name,
    score: session.score_percent ?? 0,
    total_questions: session.total_points ?? 0,
    correct_answers: session.earned_points ?? 0,
    pass_score: session.exam?.pass_score_percent ?? 0,
    passed: session.passed ?? false,
    submitted_at: session.submitted_at,
  }
}

function remainingSeconds(expiresAt: string): number {
  return Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export const api = {
  login(email: string, password: string) {
    return request<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } })
  },

  register(name: string, email: string, password: string, _role: UserRole = 'student') {
    return request<AuthResponse>('/auth/register', { method: 'POST', body: { name, email, password } })
  },

  me(token: string) {
    return request<{ user: User }>('/auth/me', { token })
  },

  async adminDashboard(token: string): Promise<DashboardStats> {
    const data = await request<{ users: number; exams: number; categories: number; completions: number }>(
      '/dashboard/admin',
      { token },
    )
    const recent = await request<{ results: BackendSession[] }>('/results', { token }).catch(() => ({ results: [] }))
    return {
      total_categories: data.categories,
      total_exams: data.exams,
      total_students: data.users,
      total_results: data.completions,
      recent_results: recent.results.slice(0, 5).map(mapSessionResult),
    }
  },

  async listCategories(token: string): Promise<Category[]> {
    const data = await request<{ categories: Category[] }>('/categories', { token })
    return data.categories
  },

  createCategory(token: string, body: Pick<Category, 'name' | 'description'>) {
    return request<Category>('/categories', { method: 'POST', body, token })
  },

  updateCategory(token: string, id: number, body: Pick<Category, 'name' | 'description'>) {
    return request<Category>(`/categories/${id}`, { method: 'PUT', body, token })
  },

  deleteCategory(token: string, id: number) {
    return request<{ message: string }>(`/categories/${id}`, { method: 'DELETE', token })
  },

  async listExams(token: string): Promise<Exam[]> {
    const data = await request<{ exams: BackendExam[] }>('/exams', { token })
    return data.exams.map(mapExam)
  },

  async createExam(
    token: string,
    body: Omit<Exam, 'id' | 'category_name' | 'question_count' | 'created_at'>,
  ): Promise<Exam> {
    const exam = await request<BackendExam>('/exams', {
      method: 'POST',
      token,
      body: {
        title: body.title,
        description: body.description ?? '',
        category_id: body.category_id,
        exam_date: todayISO(),
        duration_minutes: body.duration_minutes,
        pass_score_percent: body.pass_score,
        status: toBackendExamStatus(body.status),
      },
    })
    return mapExam(exam)
  },

  async updateExam(
    token: string,
    id: number,
    body: Partial<Omit<Exam, 'id' | 'category_name' | 'question_count' | 'created_at'>>,
  ): Promise<Exam> {
    const payload: Record<string, unknown> = {}
    if (body.title !== undefined) payload.title = body.title
    if (body.description !== undefined) payload.description = body.description
    if (body.category_id !== undefined) payload.category_id = body.category_id
    if (body.duration_minutes !== undefined) payload.duration_minutes = body.duration_minutes
    if (body.pass_score !== undefined) payload.pass_score_percent = body.pass_score
    if (body.status !== undefined) payload.status = toBackendExamStatus(body.status)
    payload.exam_date = todayISO()

    const exam = await request<BackendExam>(`/exams/${id}`, { method: 'PUT', body: payload, token })
    return mapExam(exam)
  },

  deleteExam(token: string, id: number) {
    return request<{ message: string }>(`/exams/${id}`, { method: 'DELETE', token })
  },

  async listQuestions(token: string, examId: number): Promise<Question[]> {
    const data = await request<{ questions: BackendQuestion[] }>(`/exams/${examId}/questions`, { token })
    return data.questions.map(mapQuestion)
  },

  async createQuestion(token: string, examId: number, body: Omit<Question, 'id' | 'exam_id'>): Promise<Question> {
    const q = await request<BackendQuestion>(`/exams/${examId}/questions`, {
      method: 'POST',
      token,
      body: {
        question_text: body.text,
        options: arrayToOptions(body.options),
        correct_option: indexToOption(body.correct_answer ?? 0),
        points: body.points ?? 1,
        status: 'active',
      },
    })
    return mapQuestion(q)
  },

  async updateQuestion(
    token: string,
    examId: number,
    questionId: number,
    body: Partial<Omit<Question, 'id' | 'exam_id'>>,
  ): Promise<Question> {
    const payload: Record<string, unknown> = {}
    if (body.text !== undefined) payload.question_text = body.text
    if (body.options !== undefined) payload.options = arrayToOptions(body.options)
    if (body.correct_answer !== undefined) payload.correct_option = indexToOption(body.correct_answer)
    if (body.points !== undefined) payload.points = body.points

    const q = await request<BackendQuestion>(`/exams/${examId}/questions/${questionId}`, {
      method: 'PUT',
      body: payload,
      token,
    })
    return mapQuestion(q)
  },

  deleteQuestion(token: string, examId: number, questionId: number) {
    return request<{ message: string }>(`/exams/${examId}/questions/${questionId}`, { method: 'DELETE', token })
  },

  async listStudents(token: string): Promise<Student[]> {
    const data = await request<{ students: Student[] }>('/students', { token })
    return data.students
  },

  createStudent(token: string, body: { name: string; email: string; password: string }) {
    return request<Student>('/students', { method: 'POST', body, token })
  },

  async listResults(token: string): Promise<ExamResult[]> {
    const data = await request<{ results: BackendSession[] }>('/results', { token })
    return data.results.map(mapSessionResult)
  },

  async examResults(token: string, examId: number): Promise<ExamResult[]> {
    const data = await request<{ results: BackendSession[] }>(`/exams/${examId}/results`, { token })
    return data.results.map(mapSessionResult)
  },

  async studentDashboard(token: string): Promise<StudentDashboard> {
    const data = await request<{ enrolled: number; completed: number; avg_score: number }>(
      '/dashboard/student',
      { token },
    )
    const results = await request<{ results: BackendSession[] }>('/results/mine', { token })
    return {
      enrolled_exams: data.enrolled,
      completed_exams: data.completed,
      average_score: Math.round(data.avg_score),
      recent_results: results.results.slice(0, 5).map(mapSessionResult),
    }
  },

  async studentExams(token: string): Promise<StudentExam[]> {
    const [available, mine, myResults] = await Promise.all([
      request<{ exams: Array<BackendExam & { enrollment_status?: string }> }>('/exams/available', { token }),
      request<{ enrollments: Array<{ id: number; exam_id: number; status: string; exam?: BackendExam }> }>(
        '/exams/my',
        { token },
      ),
      request<{ results: BackendSession[] }>('/results/mine', { token }),
    ])

    const completedByExam = new Map<number, BackendSession>()
    for (const r of myResults.results) completedByExam.set(r.exam_id, r)

    const enrollmentByExam = new Map<number, { status: string; exam?: BackendExam }>()
    for (const e of mine.enrollments) enrollmentByExam.set(e.exam_id, e)

    const seen = new Set<number>()
    const out: StudentExam[] = []

    for (const item of available.exams) {
      seen.add(item.id)
      const completed = completedByExam.get(item.id)
      const enrollment = enrollmentByExam.get(item.id)
      const exam = mapExam(item)

      if (completed) {
        out.push({ ...exam, exam_id: item.id, status: 'completed', result_id: completed.id })
        continue
      }

      const enrollStatus = enrollment?.status ?? item.enrollment_status
      if (!enrollStatus) {
        out.push({ ...exam, exam_id: item.id, status: 'available' })
      } else if (enrollStatus === 'approved') {
        out.push({ ...exam, exam_id: item.id, status: 'enrolled' })
      } else if (enrollStatus === 'pending') {
        out.push({ ...exam, exam_id: item.id, status: 'enrolled' })
      } else {
        out.push({ ...exam, exam_id: item.id, status: 'available' })
      }
    }

    for (const e of mine.enrollments) {
      if (seen.has(e.exam_id) || !e.exam) continue
      const completed = completedByExam.get(e.exam_id)
      const exam = mapExam(e.exam)
      if (completed) {
        out.push({ ...exam, exam_id: e.exam_id, status: 'completed', result_id: completed.id })
      } else if (e.status === 'approved') {
        out.push({ ...exam, exam_id: e.exam_id, status: 'enrolled' })
      }
    }

    return out
  },

  enrollExam(token: string, examId: number) {
    return request<{ id: number }>(`/exams/${examId}/enroll`, { method: 'POST', token })
  },

  async startExam(token: string, examId: number): Promise<ExamSession> {
    const data = await request<{
      session: { id: number; exam_id: number; started_at: string; expires_at: string }
      exam: BackendExam
      questions: Array<{ id: number; question_text: string; options: BackendQuestionOptions }>
    }>(`/exams/${examId}/start`, { method: 'POST', token })

    return {
      session_id: data.session.id,
      exam: mapExam(data.exam),
      questions: data.questions.map((q) => ({
        id: q.id,
        text: q.question_text,
        options: optionsToArray(q.options),
      })),
      started_at: data.session.started_at,
      expires_at: data.session.expires_at,
      remaining_seconds: remainingSeconds(data.session.expires_at),
    }
  },

  async submitExam(token: string, examId: number, answers: SubmitAnswer[], sessionId: number): Promise<ExamResult> {
    const data = await request<{
      result: {
        session_id: number
        exam_id: number
        earned_points: number
        total_points: number
        score_percent: number
        passed: boolean
        submitted_at: string
      }
    }>(`/exams/${examId}/submit`, {
      method: 'POST',
      token,
      body: {
        session_id: sessionId,
        answers: answers.map((a) => ({
          question_id: a.question_id,
          selected_option: a.selected_option >= 0 ? indexToOption(a.selected_option) : 'option1',
        })),
      },
    })

    return {
      id: data.result.session_id,
      exam_id: data.result.exam_id,
      score: data.result.score_percent,
      total_questions: data.result.total_points,
      correct_answers: data.result.earned_points,
      pass_score: 0,
      passed: data.result.passed,
      student_id: 0,
      submitted_at: data.result.submitted_at,
    }
  },

  async studentResults(token: string): Promise<ExamResult[]> {
    const data = await request<{ results: BackendSession[] }>('/results/mine', { token })
    return data.results.map(mapSessionResult)
  },

  async resultDetail(token: string, resultId: number): Promise<ExamResult> {
    const session = await request<BackendSession>(`/results/${resultId}`, { token })
    return mapSessionResult(session)
  },

  async reviewAnswers(token: string, resultId: number): Promise<ReviewAnswer[]> {
    const data = await request<{
      review: Array<{
        question_id: number
        question_text: string
        options: BackendQuestionOptions
        correct_option: string
        selected_option: string
        is_correct: boolean
      }>
    }>(`/results/${resultId}/review`, { token })

    return data.review.map((item) => ({
      question_id: item.question_id,
      text: item.question_text,
      options: optionsToArray(item.options),
      selected_option: item.selected_option ? optionIndex(item.selected_option) : null,
      correct_answer: optionIndex(item.correct_option),
      is_correct: item.is_correct,
    }))
  },

  async leaderboard(token: string, examId: number): Promise<LeaderboardEntry[]> {
    const data = await request<{
      leaderboard: Array<{
        rank: number
        student_id: number
        student_name: string
        score_percent: number
        submitted_at?: string
      }>
    }>(`/exams/${examId}/leaderboard`, { token })

    return data.leaderboard.map((row) => ({
      rank: row.rank,
      student_id: row.student_id,
      student_name: row.student_name,
      score: row.score_percent,
      submitted_at: row.submitted_at,
    }))
  },
}

export { API_URL }
