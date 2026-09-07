<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Timer,
  Trophy,
  Flame,
  Target,
  Brain,
  HelpCircle,
  Clock,
  Award,
  CircleDot,
  Check,
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import Logo from '@/components/brand/Logo.vue'
import ProgressBar from '@/components/brand/ProgressBar.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const activeCategory = ref('Semua')

const categories = ['Semua', 'Matematika', 'Sains', 'Bahasa', 'Sejarah', 'Teknologi']

// 4 Cohesive Stats using 100% 3D generated assets
const stats = [
  {
    label: 'Siswa aktif terdaftar',
    value: '1.200+',
    trend: '+18% bulan ini',
    asset: '/assets/stat-students.png',
  },
  {
    label: 'Ujian siap dikerjakan',
    value: '350+',
    trend: 'Terus bertambah',
    asset: '/assets/stat-exams.png',
  },
  {
    label: 'Bank soal interaktif',
    value: '8.000+',
    trend: '5 Kategori inti',
    asset: '/assets/badge-brain.png',
  },
  {
    label: 'Rata-rata skor lulus',
    value: '78%',
    trend: 'Akurasi terverifikasi',
    asset: '/assets/stat-score.png',
  },
]

const sampleQuizzes = [
  {
    title: 'Matematika Logika & Aljabar',
    cat: 'Matematika',
    questions: 20,
    duration: 30,
    enrolled: 245,
    difficulty: 'Sedang',
    asset: '/assets/badge-target.png',
  },
  {
    title: 'Fisika & Sains Lingkungan',
    cat: 'Sains',
    questions: 25,
    duration: 35,
    enrolled: 189,
    difficulty: 'Menantang',
    asset: '/assets/badge-brain.png',
  },
  {
    title: 'Sejarah Kemerdekaan RI',
    cat: 'Sejarah',
    questions: 15,
    duration: 20,
    enrolled: 142,
    difficulty: 'Mudah',
    asset: '/assets/badge-trophy.png',
  },
  {
    title: 'English Grammar & Vocabulary',
    cat: 'Bahasa',
    questions: 30,
    duration: 40,
    enrolled: 310,
    difficulty: 'Sedang',
    asset: '/assets/badge-timer.png',
  },
  {
    title: 'Algoritma & Logika Pemrograman',
    cat: 'Teknologi',
    questions: 20,
    duration: 25,
    enrolled: 280,
    difficulty: 'Menantang',
    asset: '/assets/badge-brain.png',
  },
  {
    title: 'Biologi Sel & Genetika Dasar',
    cat: 'Sains',
    questions: 18,
    duration: 25,
    enrolled: 120,
    difficulty: 'Mudah',
    asset: '/assets/badge-streak.png',
  },
]

const filteredQuizzes = computed(() => {
  if (activeCategory.value === 'Semua') return sampleQuizzes
  return sampleQuizzes.filter((q) => q.cat === activeCategory.value)
})

const features = [
  {
    asset: '/assets/badge-timer.png',
    title: 'Live Countdown & Auto-Submit',
    description: 'Timer real-time presisi per detik dengan sinkronisasi server. Waktu habis otomatis mengunci dan mengirim jawaban.',
  },
  {
    asset: '/assets/badge-brain.png',
    title: 'Skor Instan & Pembahasan',
    description: 'Siswa langsung menerima hasil beserta review komprehensif jawaban benar dan salah untuk evaluasi belajar cepat.',
  },
  {
    asset: '/assets/badge-trophy.png',
    title: 'Leaderboard & Kompetisi Sehat',
    description: 'Klasemen dinamis siswa teratas memacu motivasi berprestasi dengan podium juara emas, perak, dan perunggu.',
  },
  {
    asset: '/assets/badge-streak.png',
    title: 'Daily Streak & Motivasi Belajar',
    description: 'Bangun kebiasaan belajar konsisten tiap hari. Jaga api streak tetap menyala untuk klaim bonus multiplier XP.',
  },
  {
    asset: '/assets/badge-target.png',
    title: 'Target Skor & Passing Grade',
    description: 'Atur passing score per kategori ujian, acak urutan soal, dan pantau metrik kelulusan siswa secara akurat.',
  },
  {
    asset: '/assets/mascot.png',
    title: 'Portal Guru & Siswa Terpisah',
    description: 'Dashboard khusus admin untuk mengelola bank ujian & hasil, serta antarmuka fokus bebas distraksi untuk siswa.',
  },
]

const badgeShowcase = [
  {
    name: 'Quiz Champion',
    title: 'Juara Kelas',
    asset: '/assets/badge-trophy.png',
    criteria: 'Raih peringkat 1 di kuis mingguan',
    xp: '+250 XP',
  },
  {
    name: '7-Day Streak',
    title: 'Disiplin Tangguh',
    asset: '/assets/badge-streak.png',
    criteria: 'Ikut ujian berturut-turut 7 hari',
    xp: '+150 XP',
  },
  {
    name: 'Speed Runner',
    title: 'Kilat Tangkas',
    asset: '/assets/badge-timer.png',
    criteria: 'Selesaikan kuis di bawah 10 menit',
    xp: '+120 XP',
  },
  {
    name: 'Brain Master',
    title: 'Cerdas Bersinar',
    asset: '/assets/badge-brain.png',
    criteria: 'Skor 100% tanpa salah pada 20 soal',
    xp: '+300 XP',
  },
  {
    name: 'Bullseye Sniper',
    title: 'Bidik Akurat',
    asset: '/assets/badge-target.png',
    criteria: 'Akurasi di atas 90% dalam 5 ujian',
    xp: '+200 XP',
  },
]

// Realistic Interactive Quiz Preview inside App Window Mockup
const selectedHeroOption = ref<number>(0)
const heroAnswerSubmitted = ref(false)

function pickHeroOption(idx: number) {
  selectedHeroOption.value = idx
  heroAnswerSubmitted.value = true
}

const faqs = [
  {
    q: 'Apakah QuizMaster gratis digunakan?',
    a: 'Ya, 100% gratis! Siapapun bisa mendaftar sebagai Siswa maupun Guru/Admin untuk membuat dan mengikuti ujian tanpa dipungut biaya.',
  },
  {
    q: 'Bagaimana sistem penghitungan skor dan leaderboard bekerja?',
    a: 'Sistem langsung mengevaluasi jawaban saat ujian diserahkan. Poin XP dihitung berdasarkan rasio jawaban benar serta kecepatan pengerjaan, yang langsung memperbarui klasemen leaderboard.',
  },
  {
    q: 'Apakah aman dari kecurangan saat ujian berlangsung?',
    a: 'Sangat aman! Timer ujian dikontrol ketat oleh server dengan fitur auto-submit seketika saat durasi habis, sehingga siswa tidak bisa memanipulasi waktu pengerjaan.',
  },
  {
    q: 'Apakah QuizMaster nyaman digunakan di smartphone?',
    a: 'Tentu saja! Desain QuizMaster dirancang responsif dan fleksibel dengan tombol sentuh yang nyaman diakses lewat browser ponsel, tablet, maupun laptop.',
  },
]

const navScrolled = ref(false)
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    navScrolled.value = window.scrollY > 16
  })
}
</script>

<template>
  <div class="min-h-screen qm-mesh-bg text-foreground selection:bg-primary/20">
    <!-- Floating Frosted Glass Header / Navbar -->
    <header class="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <div
        :class="[
          'mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl px-5 transition-all duration-300',
          navScrolled
            ? 'border border-border/90 bg-background/90 shadow-md backdrop-blur-xl'
            : 'border border-border/50 bg-background/75 shadow-xs backdrop-blur-md',
        ]"
      >
        <div class="flex items-center gap-3">
          <Logo size="md" />
          <span class="hidden rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary sm:inline-block border border-primary/20">
            v2.0
          </span>
        </div>

        <nav class="hidden items-center gap-7 text-sm font-bold text-muted-foreground md:flex">
          <a href="#fitur" class="transition-colors hover:text-primary">Fitur</a>
          <a href="#kuis" class="transition-colors hover:text-primary">Kuis Populer</a>
          <a href="#badge" class="transition-colors hover:text-primary">Badge Prestasi</a>
          <a href="#leaderboard" class="transition-colors hover:text-primary">Leaderboard</a>
          <a href="#faq" class="transition-colors hover:text-primary">FAQ</a>
        </nav>

        <div class="flex items-center gap-3">
          <RouterLink to="/login">
            <Button variant="ghost" size="sm" class="rounded-xl font-bold text-foreground hover:text-primary">
              Masuk
            </Button>
          </RouterLink>
          <RouterLink to="/register">
            <button
              class="qm-btn-fun inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider"
            >
              Mulai Gratis <ArrowRight class="size-3.5" />
            </button>
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative px-4 pb-16 pt-10 sm:px-6 sm:pt-14 md:pb-24">
      <div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        <!-- Hero Left Column -->
        <div class="lg:col-span-6">
          <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-5 shadow-2xs">
            <span class="flex size-2 rounded-full bg-primary" />
            <span>Platform Kuis & Ujian Digital Indonesia</span>
          </div>

          <h1 class="text-4xl font-black tracking-tight sm:text-5xl lg:text-5xl leading-[1.15]">
            Belajar & Ujian Jadi <br />
            <span class="text-primary underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8">
              Lebih Seru
            </span>, Bukan Membosankan! 🎯
          </h1>

          <p class="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            QuizMaster menghadirkan pengalaman evaluasi belajar modern dengan live countdown timer, skor otomatis, leaderboard kompetitif, dan koleksi 3D badge prestasi yang bikin siswa makin termotivasi.
          </p>

          <!-- CTAs -->
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <RouterLink to="/register">
              <button class="qm-btn-fun inline-flex items-center gap-2 px-6 py-3.5 text-base">
                Mulai Ujian Gratis <ArrowRight class="size-4" />
              </button>
            </RouterLink>
            <a href="#kuis">
              <Button variant="outline" size="lg" class="rounded-2xl border-2 font-bold px-5">
                Jelajahi Bank Soal
              </Button>
            </a>
          </div>

          <!-- Calm Mascot Speech Bubble Card (No wobble) -->
          <div class="mt-8 flex items-center gap-4 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm backdrop-blur-xs max-w-lg">
            <div class="relative shrink-0">
              <img
                src="/assets/mascot.png"
                alt="QuizMaster Mascot Hootie"
                class="size-15 object-contain drop-shadow-xs"
              />
              <span class="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-2xs">
                ✓
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="font-black text-xs uppercase tracking-wide text-primary">Hootie the Scholar</span>
                <span class="rounded-full bg-amber-100 dark:bg-amber-950 px-2 py-0.5 text-[10px] font-black text-amber-700 dark:text-amber-300">Maskot Resmi</span>
              </div>
              <p class="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                "Halo! Aku Hootie. Selesaikan 1 kuis tiap hari buat naikin ranking dan pertahankan streak belajarmu!"
              </p>
            </div>
          </div>
        </div>

        <!-- Hero Right Column: High-Fidelity App Mockup Window (Zero AI Slop) -->
        <div class="lg:col-span-6">
          <div class="qm-mockup-frame overflow-hidden">
            <!-- macOS Window Titlebar -->
            <div class="flex items-center justify-between border-b border-border/80 bg-muted/40 px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="size-3 rounded-full bg-rose-400" />
                <span class="size-3 rounded-full bg-amber-400" />
                <span class="size-3 rounded-full bg-emerald-400" />
              </div>
              <div class="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/80 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                <span class="size-1.5 rounded-full bg-emerald-500" />
                <span>app.quizmaster.id/live/sesi-matematika</span>
              </div>
              <div class="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 text-[11px] font-black text-amber-700 dark:text-amber-300">
                <Clock class="size-3 mr-0.5" /> 14:25
              </div>
            </div>

            <!-- Window Body: Real Exam Session UI -->
            <div class="p-6 bg-card">
              <!-- Student Profile & Exam Info Strip -->
              <div class="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
                <div class="flex items-center gap-3">
                  <div class="qm-avatar size-10 text-xs font-black">AR</div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <p class="text-sm font-black">Aisha Rahma</p>
                      <span class="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-black text-primary">Gold Tier</span>
                    </div>
                    <p class="text-xs text-muted-foreground font-semibold">1.240 XP · Matematika Dasar</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs font-black text-primary">Soal 03 / 10</p>
                  <p class="text-[11px] font-bold text-muted-foreground">30% Selesai</p>
                </div>
              </div>

              <!-- Question Progress -->
              <div class="mb-5">
                <ProgressBar :value="3" :max="10" />
              </div>

              <!-- Question Content -->
              <div class="mb-5">
                <p class="text-xs font-black uppercase tracking-wider text-muted-foreground mb-1">Pertanyaan 3</p>
                <h3 class="text-base sm:text-lg font-bold leading-snug">
                  Rani memiliki 12 apel. Ia membagikan 4 apel ke temannya dan membeli lagi 8 apel di pasar. Berapa total sisa apel Rani sekarang?
                </h3>
              </div>

              <!-- Interactive Option Buttons -->
              <div class="space-y-2.5">
                <button
                  v-for="(opt, idx) in [
                    { label: 'A', text: '16 apel', correct: true },
                    { label: 'B', text: '12 apel', correct: false },
                    { label: 'C', text: '8 apel', correct: false },
                    { label: 'D', text: '20 apel', correct: false }
                  ]"
                  :key="opt.label"
                  type="button"
                  @click="pickHeroOption(idx)"
                  :class="[
                    'w-full flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold border transition-all duration-150',
                    selectedHeroOption === idx
                      ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20 shadow-xs'
                      : 'border-border/80 bg-card hover:bg-secondary/60 text-foreground'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <span
                      :class="[
                        'flex size-6 items-center justify-center rounded-lg text-xs font-black',
                        selectedHeroOption === idx ? 'bg-primary text-white' : 'bg-muted text-foreground'
                      ]"
                    >
                      {{ opt.label }}
                    </span>
                    <span>{{ opt.text }}</span>
                  </div>
                  <Check v-if="selectedHeroOption === idx" class="size-4 text-primary stroke-[3]" />
                </button>
              </div>

              <!-- Mockup Footer Notice -->
              <div class="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                <span class="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <CircleDot class="size-3 text-emerald-500" />
                  {{ heroAnswerSubmitted ? 'Jawaban tersimpan otomatis di server' : 'Klik opsi untuk mencoba simulasi' }}
                </span>
                <span class="font-black text-amber-600 dark:text-amber-400">+50 XP Tersedia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4 Cohesive Stat Cards (Fixes the Mismatched Squircles) -->
      <div class="mx-auto mt-14 max-w-6xl">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="s in stats"
            :key="s.label"
            class="qm-card flex items-center gap-4 p-5 transition-all duration-200 hover:border-primary/40"
          >
            <!-- 3D Generated Asset Icon (Clear, no ugly brown boxes) -->
            <img
              :src="s.asset"
              :alt="s.label"
              class="size-14 shrink-0 object-contain drop-shadow-sm"
            />
            <div class="min-w-0">
              <p class="text-2xl font-black tracking-tight text-foreground">{{ s.value }}</p>
              <p class="text-xs font-bold text-muted-foreground mt-0.5">{{ s.label }}</p>
              <span class="inline-block mt-1 text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {{ s.trend }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Quizzes Section -->
    <section id="kuis" class="border-t border-border/60 bg-muted/20 px-4 py-16 sm:px-6 md:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 px-3 py-0.5 text-xs font-extrabold text-amber-700 dark:text-amber-300 mb-2">
              <BookOpen class="size-3.5" /> Eksplorasi Materi
            </div>
            <h2 class="text-2xl font-extrabold sm:text-3xl tracking-tight">Kuis Populer Pilihan</h2>
            <p class="mt-1 text-sm text-muted-foreground max-w-xl">
              Pilih kategori favoritmu atau buat ujian custom di portal admin. Soal terstruktur lengkap dengan timer otomatis.
            </p>
          </div>

          <!-- Category Filter Pills -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              :class="['qm-pill', activeCategory === cat && 'qm-pill-active']"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Quizzes Grid -->
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="quiz in filteredQuizzes"
            :key="quiz.title"
            class="qm-card group relative flex flex-col justify-between p-5 overflow-hidden"
          >
            <div>
              <!-- Top tags -->
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-extrabold text-primary">
                  {{ quiz.cat }}
                </span>
                <span
                  :class="[
                    'rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase',
                    quiz.difficulty === 'Mudah' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                    quiz.difficulty === 'Sedang' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  ]"
                >
                  {{ quiz.difficulty }}
                </span>
              </div>

              <!-- Content with 3D Badge -->
              <div class="flex items-start gap-3.5">
                <img
                  :src="quiz.asset"
                  :alt="quiz.title"
                  class="size-12 shrink-0 object-contain drop-shadow-xs"
                />
                <div>
                  <h3 class="font-extrabold text-base leading-snug group-hover:text-primary transition-colors">
                    {{ quiz.title }}
                  </h3>
                  <div class="mt-2 flex items-center gap-3 text-xs text-muted-foreground font-semibold">
                    <span class="flex items-center gap-1"><BookOpen class="size-3.5" /> {{ quiz.questions }} soal</span>
                    <span class="flex items-center gap-1"><Timer class="size-3.5" /> {{ quiz.duration }} mnt</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Card -->
            <div class="mt-5 flex items-center justify-between border-t border-border/80 pt-3 text-xs">
              <span class="font-bold text-muted-foreground flex items-center gap-1">
                <Users class="size-3.5 text-primary" /> {{ quiz.enrolled }} siswa ikut
              </span>
              <RouterLink to="/login" class="inline-flex items-center gap-1 font-extrabold text-primary hover:underline">
                Ikut Kuis <ChevronRight class="size-4" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="fitur" class="px-4 py-16 sm:px-6 md:py-24">
      <div class="mx-auto max-w-6xl">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <div class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary mb-3">
            <Sparkles class="size-3.5 text-primary" /> Fitur Unggulan
          </div>
          <h2 class="text-3xl font-extrabold sm:text-4xl tracking-tight">
            Dirancang untuk Guru Profesional, Dicintai oleh Siswa
          </h2>
          <p class="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Semua kebutuhan evaluasi belajar digital ada di sini. Cepat, adil, transparan, dan pastinya seru untuk dimainkan.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="f in features"
            :key="f.title"
            class="qm-card flex flex-col justify-between p-6 transition-all"
          >
            <div>
              <div class="mb-4 flex size-14 items-center justify-center rounded-2xl bg-secondary/80">
                <img :src="f.asset" :alt="f.title" class="size-11 object-contain drop-shadow-xs" />
              </div>
              <h3 class="text-lg font-extrabold mb-2">{{ f.title }}</h3>
              <p class="text-sm leading-relaxed text-muted-foreground font-medium">
                {{ f.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Badges & Achievements Showcase -->
    <section id="badge" class="border-t border-border/60 bg-muted/20 px-4 py-16 sm:px-6 md:py-24">
      <div class="mx-auto max-w-6xl">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <div class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 px-3 py-1 text-xs font-extrabold text-amber-700 dark:text-amber-300 mb-3">
            <Trophy class="size-3.5" /> Gamifikasi & Prestasi
          </div>
          <h2 class="text-3xl font-extrabold sm:text-4xl tracking-tight">
            Koleksi 3D Badge Prestasi Kamu
          </h2>
          <p class="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Setiap jawaban tepat dan konsistensi belajarmu diganjar lencana prestasi eksklusif untuk dipamerkan di profil siswa.
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="b in badgeShowcase"
            :key="b.name"
            class="qm-card flex flex-col items-center p-5 text-center transition-all group"
          >
            <div class="relative mb-3 flex size-20 items-center justify-center rounded-2xl bg-secondary/70">
              <img :src="b.asset" :alt="b.name" class="size-16 object-contain drop-shadow-md" />
            </div>
            <span class="rounded-full bg-amber-100 dark:bg-amber-950 px-2 py-0.5 text-[10px] font-black text-amber-700 dark:text-amber-300">
              {{ b.xp }}
            </span>
            <h4 class="mt-2 font-extrabold text-sm">{{ b.name }}</h4>
            <p class="text-xs font-semibold text-primary">{{ b.title }}</p>
            <p class="mt-2 text-[11px] leading-snug text-muted-foreground">{{ b.criteria }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Leaderboard Podium Section -->
    <section id="leaderboard" class="px-4 py-16 sm:px-6 md:py-24">
      <div class="mx-auto max-w-5xl">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <div class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary mb-3">
            <Flame class="size-3.5 text-amber-500 fill-amber-500" /> Papan Peringkat
          </div>
          <h2 class="text-3xl font-extrabold sm:text-4xl tracking-tight">
            Podium Juara QuizMaster
          </h2>
          <p class="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Kuis bukan cuma nilai, tapi ajang adu kecerdasan dan ketangkasan bersama teman-temanmu se-Indonesia!
          </p>
        </div>

        <!-- 3-Podium Visualization -->
        <div class="mb-10 grid grid-cols-3 items-end gap-3 sm:gap-6 pt-10">
          <!-- Rank 2 (Silver) -->
          <div class="flex flex-col items-center">
            <div class="relative mb-2">
              <div class="qm-avatar size-14 sm:size-16 text-sm font-black border-slate-300 bg-slate-100 text-slate-700">
                BS
              </div>
              <span class="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-slate-300 text-xs font-black text-slate-800 shadow-xs">
                2
              </span>
            </div>
            <p class="font-extrabold text-xs sm:text-sm text-center truncate w-full">Budi Santoso</p>
            <p class="text-[11px] font-bold text-muted-foreground">1.180 XP</p>
            <div class="mt-3 w-full rounded-t-2xl border border-slate-300/80 bg-slate-100 dark:bg-slate-800/80 p-3 sm:p-4 text-center h-28 sm:h-32 flex flex-col justify-center items-center shadow-xs">
              <span class="text-2xl sm:text-3xl">🥈</span>
              <span class="text-xs font-extrabold text-slate-700 dark:text-slate-200 mt-1">95% Skor</span>
            </div>
          </div>

          <!-- Rank 1 (Gold - Taller & Highlighted) -->
          <div class="flex flex-col items-center -translate-y-4">
            <div class="relative mb-2">
              <div class="qm-avatar size-18 sm:size-20 text-base font-black border-amber-400 bg-amber-100 text-amber-800 shadow-md">
                AR
              </div>
              <span class="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-slate-950 shadow-md">
                👑
              </span>
            </div>
            <p class="font-extrabold text-sm sm:text-base text-center truncate w-full text-primary">Aisha Rahma</p>
            <p class="text-xs font-black text-amber-600 dark:text-amber-400">1.240 XP</p>
            <div class="mt-3 w-full rounded-t-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-200/50 to-amber-100/30 dark:from-amber-950/60 dark:to-amber-900/30 p-4 text-center h-36 sm:h-40 flex flex-col justify-center items-center shadow-md">
              <span class="text-3xl sm:text-4xl">🥇</span>
              <span class="text-xs sm:text-sm font-black text-amber-800 dark:text-amber-200 mt-1">98% Skor Rata-rata</span>
            </div>
          </div>

          <!-- Rank 3 (Bronze) -->
          <div class="flex flex-col items-center">
            <div class="relative mb-2">
              <div class="qm-avatar size-14 sm:size-16 text-sm font-black border-amber-700 bg-amber-50 text-amber-900">
                CM
              </div>
              <span class="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-amber-700 text-xs font-black text-white shadow-xs">
                3
              </span>
            </div>
            <p class="font-extrabold text-xs sm:text-sm text-center truncate w-full">Citra Melati</p>
            <p class="text-[11px] font-bold text-muted-foreground">1.050 XP</p>
            <div class="mt-3 w-full rounded-t-2xl border border-amber-700/40 bg-amber-50 dark:bg-amber-950/40 p-3 sm:p-4 text-center h-24 sm:h-28 flex flex-col justify-center items-center shadow-xs">
              <span class="text-2xl sm:text-3xl">🥉</span>
              <span class="text-xs font-extrabold text-amber-800 dark:text-amber-300 mt-1">92% Skor</span>
            </div>
          </div>
        </div>

        <!-- Rank 4-5 Rows -->
        <div class="qm-card divide-y divide-border/80 overflow-hidden">
          <div class="flex items-center justify-between p-4 px-6 hover:bg-secondary/40 transition-colors">
            <div class="flex items-center gap-3">
              <span class="font-black text-muted-foreground text-sm w-6">#4</span>
              <div class="qm-avatar size-9 text-xs font-bold">DK</div>
              <div>
                <p class="font-extrabold text-sm">Doni Kusuma</p>
                <p class="text-xs text-muted-foreground font-semibold">980 XP · 4 Ujian Selesai</p>
              </div>
            </div>
            <span class="font-black text-primary text-sm">89%</span>
          </div>

          <div class="flex items-center justify-between p-4 px-6 hover:bg-secondary/40 transition-colors">
            <div class="flex items-center gap-3">
              <span class="font-black text-muted-foreground text-sm w-6">#5</span>
              <div class="qm-avatar size-9 text-xs font-bold">EP</div>
              <div>
                <p class="font-extrabold text-sm">Eva Permata</p>
                <p class="text-xs text-muted-foreground font-semibold">920 XP · 3 Ujian Selesai</p>
              </div>
            </div>
            <span class="font-black text-primary text-sm">87%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="border-t border-border/60 bg-muted/20 px-4 py-16 sm:px-6 md:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary mb-2">
            <HelpCircle class="size-3.5" /> Ada Pertanyaan?
          </div>
          <h2 class="text-2xl font-extrabold sm:text-3xl tracking-tight">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div class="space-y-3">
          <details
            v-for="faq in faqs"
            :key="faq.q"
            class="qm-card group cursor-pointer p-5 transition-all"
          >
            <summary class="flex list-none items-center justify-between font-bold text-sm sm:text-base">
              <span>{{ faq.q }}</span>
              <ChevronRight class="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground font-medium pt-2 border-t border-border/50">
              {{ faq.a }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <!-- Final Call To Action -->
    <section class="px-4 py-16 sm:px-6 md:py-20">
      <div class="qm-card-plum relative mx-auto max-w-4xl overflow-hidden p-8 sm:p-12 text-center shadow-xl">
        <div class="mx-auto mb-4 flex justify-center">
          <img
            src="/assets/mascot.png"
            alt="Mascot Hootie"
            class="size-20 object-contain drop-shadow-md"
          />
        </div>

        <h2 class="text-2xl font-black sm:text-4xl tracking-tight text-white leading-tight">
          Siap Jadi Quiz Master Sejati?
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-sm sm:text-base text-white/85 font-medium leading-relaxed">
          Gabung bersama ribuan siswa dan pengajar lainnya. Daftarkan akun gratis sekarang dan nikmati pengalaman kuis online paling seru!
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <RouterLink to="/register">
            <button class="qm-btn-fun inline-flex items-center gap-2 px-8 py-3.5 text-base">
              Daftar Gratis Sekarang <ArrowRight class="size-4" />
            </button>
          </RouterLink>
          <RouterLink to="/login">
            <Button variant="outline" size="lg" class="rounded-2xl border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold px-6">
              Masuk Akun
            </Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Professional Multi-Column SaaS EdTech Footer -->
    <footer class="border-t border-border/80 bg-background/60 px-4 pt-16 pb-12 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-10 pb-12 border-b border-border/60">
          <!-- Col 1: Brand & Tagline -->
          <div class="col-span-2 space-y-3">
            <Logo size="md" />
            <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm font-medium">
              Platform kuis dan evaluasi belajar interaktif dengan timer server-side, skor instan, leaderboard kompetitif, dan koleksi 3D badge prestasi.
            </p>
            <div class="pt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span class="size-2 rounded-full bg-emerald-500" />
              <span>Semua Sistem Operasional (Uptime 99.8%)</span>
            </div>
          </div>

          <!-- Col 2: Platform -->
          <div class="space-y-3 text-xs sm:text-sm">
            <p class="font-black text-foreground uppercase tracking-wider text-[11px]">Platform</p>
            <ul class="space-y-2 text-muted-foreground font-semibold">
              <li><a href="#fitur" class="hover:text-primary transition-colors">Fitur Ujian Online</a></li>
              <li><a href="#fitur" class="hover:text-primary transition-colors">Timer & Auto-Submit</a></li>
              <li><a href="#leaderboard" class="hover:text-primary transition-colors">Papan Peringkat</a></li>
              <li><a href="#badge" class="hover:text-primary transition-colors">Sistem 3D Badge</a></li>
            </ul>
          </div>

          <!-- Col 3: Kategori Kuis -->
          <div class="space-y-3 text-xs sm:text-sm">
            <p class="font-black text-foreground uppercase tracking-wider text-[11px]">Kategori Soal</p>
            <ul class="space-y-2 text-muted-foreground font-semibold">
              <li><a href="#kuis" class="hover:text-primary transition-colors">Matematika & Aljabar</a></li>
              <li><a href="#kuis" class="hover:text-primary transition-colors">Sains & Fisika</a></li>
              <li><a href="#kuis" class="hover:text-primary transition-colors">Bahasa & Literasi</a></li>
              <li><a href="#kuis" class="hover:text-primary transition-colors">Teknologi & Koding</a></li>
            </ul>
          </div>

          <!-- Col 4: Akses & Akun -->
          <div class="space-y-3 text-xs sm:text-sm">
            <p class="font-black text-foreground uppercase tracking-wider text-[11px]">Akses & Akun</p>
            <ul class="space-y-2 text-muted-foreground font-semibold">
              <li><RouterLink to="/login" class="hover:text-primary transition-colors">Masuk Portal Guru</RouterLink></li>
              <li><RouterLink to="/login" class="hover:text-primary transition-colors">Masuk Portal Siswa</RouterLink></li>
              <li><RouterLink to="/login" class="hover:text-primary transition-colors">Coba Akun Demo</RouterLink></li>
              <li><RouterLink to="/register" class="hover:text-primary transition-colors">Registrasi Akun Baru</RouterLink></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Copyright Row -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted-foreground">
          <p>
            QuizMaster &copy; {{ new Date().getFullYear() }} · Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div class="flex items-center gap-6">
            <a href="#faq" class="hover:text-primary transition-colors">Bantuan FAQ</a>
            <span class="text-border">·</span>
            <span class="hover:text-primary transition-colors cursor-pointer">Privasi</span>
            <span class="text-border">·</span>
            <span class="hover:text-primary transition-colors cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
