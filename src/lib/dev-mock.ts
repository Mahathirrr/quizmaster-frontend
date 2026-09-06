import type {
  Category,
  DashboardStats,
  Exam,
  ExamResult,
  LeaderboardEntry,
  Question,
  Student,
  StudentDashboard,
  StudentExam,
  User,
} from '@/lib/api'

export const mockCategories: Category[] = [
  { id: 1, name: 'Matematika', description: 'Soal hitung & logika', created_at: '2026-01-10T08:00:00Z' },
  { id: 2, name: 'IPA', description: 'Fisika, biologi, kimia', created_at: '2026-01-12T08:00:00Z' },
  { id: 3, name: 'Bahasa', description: 'Indonesia & Inggris', created_at: '2026-01-15T08:00:00Z' },
]

export const mockExams: Exam[] = [
  { id: 1, title: 'Matematika Dasar', category_id: 1, category_name: 'Matematika', duration_minutes: 30, pass_score: 60, status: 'published', question_count: 10 },
  { id: 2, title: 'IPA Terpadu', category_id: 2, category_name: 'IPA', duration_minutes: 45, pass_score: 70, status: 'published', question_count: 15 },
  { id: 3, title: 'Bahasa Indonesia', category_id: 3, category_name: 'Bahasa', duration_minutes: 20, pass_score: 65, status: 'published', question_count: 8 },
]

export const mockQuestions: Question[] = [
  { id: 1, exam_id: 1, text: '2 + 2 = ?', options: ['3', '4', '5', '6'], correct_answer: 1, points: 10 },
  { id: 2, exam_id: 1, text: 'Akar kuadrat dari 16 adalah?', options: ['2', '4', '8', '16'], correct_answer: 1, points: 10 },
]

export const mockStudents: Student[] = [
  { id: 2, name: 'Budi Santoso', email: 'student@quizmaster.com', created_at: '2026-01-05T08:00:00Z' },
  { id: 3, name: 'Aisha Rahma', email: 'aisha@mail.com', created_at: '2026-01-08T08:00:00Z' },
  { id: 4, name: 'Citra Melati', email: 'citra@mail.com', created_at: '2026-01-09T08:00:00Z' },
]

export const mockResults: ExamResult[] = [
  { id: 1, exam_id: 1, exam_title: 'Matematika Dasar', student_id: 2, student_name: 'Budi Santoso', score: 85, total_questions: 10, correct_answers: 8, pass_score: 60, passed: true, submitted_at: '2026-09-06T10:30:00Z' },
  { id: 2, exam_id: 2, exam_title: 'IPA Terpadu', student_id: 3, student_name: 'Aisha Rahma', score: 92, total_questions: 15, correct_answers: 14, pass_score: 70, passed: true, submitted_at: '2026-09-05T14:00:00Z' },
  { id: 3, exam_id: 1, exam_title: 'Matematika Dasar', student_id: 4, student_name: 'Citra Melati', score: 55, total_questions: 10, correct_answers: 5, pass_score: 60, passed: false, submitted_at: '2026-09-04T09:15:00Z' },
]

export const mockAdminDashboard: DashboardStats = {
  total_categories: 3,
  total_exams: 3,
  total_students: 12,
  total_results: 28,
  recent_results: mockResults,
}

export const mockStudentDashboard: StudentDashboard = {
  enrolled_exams: 3,
  completed_exams: 2,
  average_score: 78,
  recent_results: mockResults.slice(0, 2),
}

export const mockStudentExams: StudentExam[] = mockExams.map((exam, i) => ({
  ...exam,
  status: (['available', 'enrolled', 'completed'] as const)[i] ?? 'available',
  result_id: i === 2 ? 1 : undefined,
}))

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, student_id: 3, student_name: 'Aisha Rahma', score: 92, submitted_at: '2026-09-05T14:00:00Z' },
  { rank: 2, student_id: 2, student_name: 'Budi Santoso', score: 85, submitted_at: '2026-09-06T10:30:00Z' },
  { rank: 3, student_id: 4, student_name: 'Citra Melati', score: 55, submitted_at: '2026-09-04T09:15:00Z' },
]

export const mockUser: User = {
  id: 1,
  name: 'Dev Admin',
  email: 'admin@quizmaster.com',
  role: 'admin',
}

/** Returns mock response for a given API path, or null if no mock exists. */
export function devMockResponse<T>(path: string, method: string): T | null {
  const p = path.replace(/\/$/, '')

  if (method === 'GET' && p === '/auth/me') return { user: mockUser } as T
  if (method === 'GET' && p === '/admin/dashboard') return { data: mockAdminDashboard } as T
  if (method === 'GET' && p === '/student/dashboard') return { data: mockStudentDashboard } as T
  if (method === 'GET' && p === '/admin/categories') return { data: mockCategories } as T
  if (method === 'GET' && p === '/admin/exams') return { data: mockExams } as T
  if (method === 'GET' && p === '/admin/students') return { data: mockStudents } as T
  if (method === 'GET' && p === '/admin/results') return { data: mockResults } as T
  if (method === 'GET' && p === '/student/exams') return { data: mockStudentExams } as T
  if (method === 'GET' && p === '/student/results') return { data: mockResults.slice(0, 2) } as T
  if (method === 'GET' && /^\/admin\/exams\/\d+\/questions$/.test(p)) return { data: mockQuestions } as T
  if (method === 'GET' && /^\/admin\/exams\/\d+\/results$/.test(p)) return { data: mockResults } as T
  if (method === 'GET' && /^\/student\/exams\/\d+\/leaderboard$/.test(p)) return { data: mockLeaderboard } as T
  if (method === 'GET' && /^\/student\/results\/\d+$/.test(p)) return { data: mockResults[0] } as T
  if (method === 'GET' && /^\/student\/results\/\d+\/review$/.test(p)) return { data: [] } as T

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) return {} as T

  return null
}
