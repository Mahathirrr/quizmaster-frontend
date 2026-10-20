import type { Category, Exam, Question, Student, User } from '@/lib/api'
import { DEV_MOCK_USER, DEV_ROLE } from '@/lib/dev'

const mockCategories: Category[] = [
  { id: 1, name: 'Matematika', description: 'Soal hitung & logika', created_at: '2026-01-10T08:00:00Z' },
  { id: 2, name: 'IPA', description: 'Fisika, biologi, kimia', created_at: '2026-01-12T08:00:00Z' },
  { id: 3, name: 'Bahasa', description: 'Indonesia & Inggris', created_at: '2026-01-15T08:00:00Z' },
]

const mockExams: Exam[] = [
  {
    id: 1,
    title: 'Matematika Dasar',
    category_id: 1,
    category_name: 'Matematika',
    duration_minutes: 30,
    pass_score: 60,
    status: 'published',
    question_count: 10,
  },
  {
    id: 2,
    title: 'IPA Terpadu',
    category_id: 2,
    category_name: 'IPA',
    duration_minutes: 45,
    pass_score: 70,
    status: 'published',
    question_count: 15,
  },
  {
    id: 3,
    title: 'Bahasa Indonesia',
    category_id: 3,
    category_name: 'Bahasa',
    duration_minutes: 20,
    pass_score: 65,
    status: 'published',
    question_count: 8,
  },
]

const mockQuestions: Question[] = [
  { id: 1, exam_id: 1, text: '2 + 2 = ?', options: ['3', '4', '5', '6'], correct_answer: 1, points: 10 },
  { id: 2, exam_id: 1, text: 'Akar kuadrat dari 16 adalah?', options: ['2', '4', '8', '16'], correct_answer: 1, points: 10 },
]

const mockStudents: Student[] = [
  { id: 2, name: 'Ahmad Rizki', email: 'ahmad.rizki@student.usk.ac.id', created_at: '2026-01-05T08:00:00Z' },
  { id: 3, name: 'Siti Nurhaliza', email: 'siti.nurhaliza@student.usk.ac.id', created_at: '2026-01-08T08:00:00Z' },
  { id: 4, name: 'Budi Santoso', email: 'budi.santoso@student.usk.ac.id', created_at: '2026-01-09T08:00:00Z' },
]

const mockResults = [
  {
    id: 1,
    exam_id: 1,
    student_id: 2,
    submitted_at: '2026-09-06T10:30:00Z',
    score_percent: 85,
    total_points: 10,
    earned_points: 8,
    passed: true,
    exam: { id: 1, title: 'Matematika Dasar', pass_score_percent: 60 },
    student: { id: 2, name: 'Budi Santoso' },
  },
  {
    id: 2,
    exam_id: 2,
    student_id: 3,
    submitted_at: '2026-09-05T14:00:00Z',
    score_percent: 92,
    total_points: 15,
    earned_points: 14,
    passed: true,
    exam: { id: 2, title: 'IPA Terpadu', pass_score_percent: 70 },
    student: { id: 3, name: 'Aisha Rahma' },
  },
  {
    id: 3,
    exam_id: 1,
    student_id: 4,
    submitted_at: '2026-09-04T09:15:00Z',
    score_percent: 45,
    total_points: 10,
    earned_points: 4,
    passed: false,
    exam: { id: 1, title: 'Matematika Dasar', pass_score_percent: 60 },
    student: { id: 4, name: 'Citra Melati' },
  },
]

/** Returns mock response for a given API path, or null if no mock exists. */
export function devMockResponse<T>(path: string, method: string): T | null {
  const p = path.replace(/\/$/, '')

  if (method === 'GET' && p === '/auth/me') {
    return { user: { ...DEV_MOCK_USER, role: DEV_ROLE } as User } as T
  }

  if (method === 'GET' && p === '/dashboard/admin') {
    return {
      users: 12,
      exams: 3,
      categories: 3,
      completions: 28,
    } as T
  }

  if (method === 'GET' && p === '/results') {
    return { results: mockResults } as T
  }

  if (method === 'GET' && p === '/categories') {
    return { categories: mockCategories } as T
  }

  if (method === 'GET' && p === '/exams') {
    return { exams: mockExams } as T
  }

  if (method === 'GET' && p === '/students') {
    return { students: mockStudents } as T
  }

  if (method === 'GET' && p === '/dashboard/student') {
    return { enrolled: 3, completed: 2, avg_score: 78 } as T
  }

  if (method === 'GET' && p === '/results/mine') {
    return { results: mockResults.slice(0, 2) } as T
  }

  if (method === 'GET' && p === '/exams/available') {
    return { exams: mockExams.map((exam, i) => ({ ...exam, enrollment_status: ['available', 'enrolled', 'completed'][i] })) } as T
  }

  if (method === 'GET' && p === '/enrollments/mine') {
    return { enrollments: [{ id: 1, exam_id: 1, status: 'completed', exam: mockExams[0] }] } as T
  }

  if (method === 'GET' && /^\/exams\/\d+\/questions$/.test(p)) {
    return { questions: mockQuestions } as T
  }

  if (method === 'GET' && /^\/exams\/\d+\/results$/.test(p)) {
    return { results: mockResults } as T
  }

  if (method === 'GET' && /^\/results\/\d+$/.test(p)) {
    return { ...mockResults[0] } as T
  }

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return {} as T

  return null
}
