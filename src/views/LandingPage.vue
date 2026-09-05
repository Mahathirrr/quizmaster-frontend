<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Bell, ChevronRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

import GlassIcon from '@/components/brand/GlassIcon.vue'
import HexBadge from '@/components/brand/HexBadge.vue'
import Logo from '@/components/brand/Logo.vue'
import ProgressBar from '@/components/brand/ProgressBar.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const activeCategory = ref('Semua')

const categories = ['Semua', 'Matematika', 'IPA', 'Bahasa', 'Sejarah', 'Umum']

const stats = [
  { label: 'Siswa aktif', value: '1.200+', icon: 'users' as const, tone: 'mint' as const },
  { label: 'Ujian dibuat', value: '350+', icon: 'book' as const, tone: 'violet' as const },
  { label: 'Soal di bank', value: '8.000+', icon: 'brain' as const, tone: 'sun' as const },
  { label: 'Rata-rata skor', value: '78%', icon: 'chart' as const, tone: 'coral' as const },
]

const features = [
  { icon: 'book' as const, tone: 'violet' as const, title: 'Kelola kategori & ujian', description: 'Admin buat kategori, atur durasi, pass score, dan publish — semua dari satu dashboard yang rapi.' },
  { icon: 'timer' as const, tone: 'sun' as const, title: 'Timer & auto-submit', description: 'Countdown live di layar siswa. Waktu habis? Jawaban otomatis terkirim. Fair play guaranteed.' },
  { icon: 'trophy' as const, tone: 'coral' as const, title: 'Skor, review & leaderboard', description: 'Hasil langsung keluar, bisa review jawaban benar/salah, plus ranking antar siswa biar kompetitif.' },
  { icon: 'shield' as const, tone: 'mint' as const, title: 'Portal terpisah & aman', description: 'Admin dan siswa punya portal sendiri. JWT auth, role-based access — aman & terkontrol.' },
  { icon: 'chart' as const, tone: 'sky' as const, title: 'Dashboard statistik', description: 'Lihat total kategori, ujian, siswa, dan aktivitas terbaru dalam satu tampilan.' },
  { icon: 'rocket' as const, tone: 'pink' as const, title: 'Onboarding cepat', description: 'Daftar, login, langsung bisa ikut ujian. Nggak perlu setup ribet.' },
]

const sampleQuizzes = [
  { title: 'Matematika Dasar', cat: 'Matematika', questions: 20, duration: 30, enrolled: 142, icon: 'target' as const, tone: 'violet' as const },
  { title: 'IPA Terpadu', cat: 'IPA', questions: 25, duration: 45, enrolled: 98, icon: 'brain' as const, tone: 'mint' as const },
  { title: 'Sejarah Indonesia', cat: 'Sejarah', questions: 15, duration: 20, enrolled: 76, icon: 'book' as const, tone: 'sun' as const },
  { title: 'Bahasa Inggris', cat: 'Bahasa', questions: 30, duration: 40, enrolled: 115, icon: 'sparkles' as const, tone: 'coral' as const },
]

const leaderboard = [
  { rank: 1, name: 'Aisha R.', score: 98, xp: 1240 },
  { rank: 2, name: 'Budi S.', score: 95, xp: 1180 },
  { rank: 3, name: 'Citra M.', score: 92, xp: 1050 },
  { rank: 4, name: 'Doni K.', score: 89, xp: 980 },
  { rank: 5, name: 'Eva P.', score: 87, xp: 920 },
]

const badges = [
  { name: 'Super Star', icon: 'sparkles' as const, tone: 'sun' as const },
  { name: 'Quiz Champion', icon: 'trophy' as const, tone: 'coral' as const },
  { name: 'Speed Runner', icon: 'timer' as const, tone: 'mint' as const },
  { name: 'Brain Master', icon: 'brain' as const, tone: 'violet' as const },
]

const lockedBadges = [
  { name: 'Perfect Score', icon: 'target' as const },
  { name: '7 Day Streak', icon: 'rocket' as const },
  { name: 'Top 10', icon: 'chart' as const },
]

const faqs = [
  { q: 'Gratis nggak?', a: 'Gratis untuk daftar dan ikut ujian. Admin bisa buat akun sendiri tanpa biaya.' },
  { q: 'Bisa dipake di HP?', a: 'Bisa! Tampilan responsive, enak diakses dari browser HP atau laptop.' },
  { q: 'Admin vs Siswa beda apa?', a: 'Admin kelola kategori, ujian, soal, dan lihat hasil semua siswa. Siswa cuma ikut ujian & lihat hasil sendiri.' },
  { q: 'Timer-nya beneran jalan?', a: 'Iya, countdown server-side. Waktu habis = auto submit. Nggak bisa curang pause.' },
]

const navScrolled = ref(false)
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => { navScrolled.value = window.scrollY > 12 })
}
</script>

<template>
  <div class="min-h-screen qm-mesh-bg">
    <!-- Navbar -->
    <header :class="['sticky top-0 z-50 transition-all', navScrolled ? 'border-b border-border bg-background/90 backdrop-blur-lg shadow-sm' : '']">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo size="md" />
        <nav class="hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#fitur" class="hover:text-primary transition-colors">Fitur</a>
          <a href="#kuis" class="hover:text-primary transition-colors">Contoh Kuis</a>
          <a href="#badge" class="hover:text-primary transition-colors">Badge</a>
          <a href="#faq" class="hover:text-primary transition-colors">FAQ</a>
        </nav>
        <div class="flex items-center gap-2">
          <RouterLink to="/login"><Button variant="ghost" size="sm" class="rounded-full font-semibold">Masuk</Button></RouterLink>
          <RouterLink to="/register"><Button variant="fun" size="sm" class="rounded-full">Daftar <ArrowRight class="size-3.5" /></Button></RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
      <div class="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge variant="secondary" class="mb-4 rounded-full px-3 py-1 font-bold">🎮 Platform kuis yang fun & lengkap</Badge>
          <h1 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Yuk lanjutin kuisnya,<br />
            <span class="text-primary">jangan males!</span> 😄
          </h1>
          <p class="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            QuizMaster bantu guru & admin ngelola ujian online dengan timer, skor instan, leaderboard, dan badge. Siswa belajar sambil fun — bukan cuma kertas & pensil.
          </p>
          <div class="mt-7 flex flex-wrap gap-3">
            <RouterLink to="/register"><Button variant="fun" size="lg" class="rounded-2xl">Let's Go! <ArrowRight class="size-4" /></Button></RouterLink>
            <RouterLink to="/login"><Button variant="outline" size="lg" class="rounded-2xl font-semibold">Sudah punya akun</Button></RouterLink>
          </div>
          <!-- mini stats -->
          <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div v-for="s in stats" :key="s.label" class="qm-card p-3 text-center">
              <GlassIcon :name="s.icon" :tone="s.tone" :size="32" class="mx-auto mb-1" />
              <p class="text-lg font-extrabold text-primary">{{ s.value }}</p>
              <p class="text-[10px] font-semibold text-muted-foreground">{{ s.label }}</p>
            </div>
          </div>
        </div>

        <!-- Hero card — purple quiz preview -->
        <div class="relative">
          <div class="qm-card-plum p-6 sm:p-8 qm-float">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="qm-avatar size-10 text-sm">{{ 'QM' }}</div>
                <div>
                  <p class="text-xs font-semibold text-white/70">Level Progress</p>
                  <p class="text-sm font-bold">Gold · 323 XP</p>
                </div>
              </div>
              <Bell class="size-5 text-white/70" />
            </div>
            <ProgressBar :value="65" label="Progress ke Platinum" variant="purple" class="mb-5" />
            <p class="text-sm font-semibold text-white/80 mb-1">03 Question</p>
            <p class="text-lg font-bold mb-4">Rani punya 10 apel, dikasih 5. Total apel Rani?</p>
            <div class="space-y-2">
              <div v-for="(opt, i) in ['A. 15 apel', 'B. 10 apel', 'C. 5 apel', 'D. 20 apel']" :key="opt"
                :class="['qm-option flex items-center gap-3 px-4 py-3 text-sm font-semibold', i === 0 ? 'qm-option-selected' : 'text-foreground']">
                {{ opt }}
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="qm-timer rounded-full px-3 py-1 text-xs">⏱ 12:45</span>
              <GlassIcon name="brain" tone="sun" :size="36" />
            </div>
          </div>
          <!-- streak card -->
          <div class="absolute -bottom-5 -left-3 qm-card-yellow px-4 py-3 sm:-left-6">
            <p class="text-xs font-bold uppercase tracking-wide opacity-70">Streak</p>
            <p class="text-2xl font-extrabold">6 hari 🔥</p>
          </div>
          <!-- rank card -->
          <div class="absolute -right-3 -top-4 qm-card px-3 py-2 shadow-lg sm:-right-5">
            <div class="flex items-center gap-2">
              <GlassIcon name="trophy" tone="sun" :size="32" />
              <div><p class="text-[10px] text-muted-foreground">Ranking</p><p class="text-sm font-extrabold">#3 🏆</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category pills + sample quizzes -->
    <section id="kuis" class="px-4 py-14 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-2xl font-extrabold sm:text-3xl">Contoh kuis populer</h2>
        <p class="mt-2 text-muted-foreground">Filter kategori kayak di app — admin bisa buat sebanyak apapun.</p>
        <div class="mt-5 flex flex-wrap gap-2">
          <button v-for="cat in categories" :key="cat" type="button"
            :class="['qm-pill', activeCategory === cat && 'qm-pill-active']"
            @click="activeCategory = cat">{{ cat }}</button>
        </div>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div v-for="quiz in sampleQuizzes" :key="quiz.title" class="qm-card flex items-center gap-4 p-4">
            <GlassIcon :name="quiz.icon" :tone="quiz.tone" :size="52" />
            <div class="flex-1 min-w-0">
              <p class="font-bold truncate">{{ quiz.title }}</p>
              <p class="text-xs text-muted-foreground">{{ quiz.cat }} · {{ quiz.questions }} soal · {{ quiz.duration }} menit</p>
              <p class="text-xs font-semibold text-primary mt-0.5">{{ quiz.enrolled }} siswa ikut</p>
            </div>
            <ChevronRight class="size-5 text-muted-foreground shrink-0" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features grid -->
    <section id="fitur" class="px-4 py-14 sm:px-6 bg-secondary/40">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-2xl font-extrabold sm:text-3xl">Semua fitur yang kamu butuhin</h2>
        <p class="text-center mt-2 text-muted-foreground max-w-xl mx-auto">Dari admin panel sampai leaderboard — lengkap, tapi tetap fun.</p>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="f in features" :key="f.title" class="qm-card p-5">
            <GlassIcon :name="f.icon" :tone="f.tone" :size="48" class="mb-3" />
            <h3 class="font-bold">{{ f.title }}</h3>
            <p class="mt-1.5 text-sm text-muted-foreground leading-relaxed">{{ f.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Badges + Leaderboard side by side -->
    <section id="badge" class="px-4 py-14 sm:px-6">
      <div class="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
        <!-- Badges -->
        <div class="qm-card p-6">
          <h2 class="text-xl font-extrabold mb-1">My Badges 🏅</h2>
          <p class="text-sm text-muted-foreground mb-5">Kumpulin badge dengan ikut ujian & raih skor tinggi.</p>
          <div class="flex flex-wrap gap-4 justify-center sm:justify-start">
            <HexBadge v-for="b in badges" :key="b.name" :name="b.name" :icon="b.icon" :tone="b.tone" />
          </div>
          <p class="mt-6 text-xs font-bold uppercase tracking-wide text-muted-foreground">Locked Badges</p>
          <div class="mt-3 flex flex-wrap gap-4 justify-center sm:justify-start">
            <HexBadge v-for="b in lockedBadges" :key="b.name" :name="b.name" :icon="b.icon" tone="violet" locked />
          </div>
        </div>
        <!-- Leaderboard -->
        <div class="qm-card p-6">
          <h2 class="text-xl font-extrabold mb-1">Ranking 🌍</h2>
          <p class="text-sm text-muted-foreground mb-5">Lihat siapa yang paling jago di leaderboard.</p>
          <div class="flex gap-2 mb-4">
            <span class="qm-pill qm-pill-active">World</span>
            <span class="qm-pill">Weekly</span>
            <span class="qm-pill">Friends</span>
          </div>
          <div class="space-y-2">
            <div v-for="entry in leaderboard" :key="entry.rank"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary/60"
              :class="entry.rank <= 3 ? 'bg-accent/60' : ''">
              <span class="w-8 text-center font-extrabold text-primary">{{ entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank-1] : `#${entry.rank}` }}</span>
              <div class="qm-avatar size-9 text-xs">{{ entry.name.charAt(0) }}</div>
              <div class="flex-1"><p class="font-bold text-sm">{{ entry.name }}</p><p class="text-xs text-muted-foreground">{{ entry.xp }} XP</p></div>
              <span class="font-extrabold text-primary">{{ entry.score }}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="px-4 py-14 sm:px-6 bg-secondary/40">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center text-2xl font-extrabold">Pertanyaan sering ditanya</h2>
        <div class="mt-8 space-y-3">
          <details v-for="faq in faqs" :key="faq.q" class="qm-card group p-5 cursor-pointer">
            <summary class="font-bold list-none flex items-center justify-between">
              {{ faq.q }}
              <ChevronRight class="size-4 transition-transform group-open:rotate-90" />
            </summary>
            <p class="mt-3 text-sm text-muted-foreground leading-relaxed">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 py-14 sm:px-6">
      <div class="qm-card-plum mx-auto max-w-3xl p-8 sm:p-12 text-center">
        <GlassIcon name="rocket" tone="sun" :size="64" class="mx-auto mb-4" />
        <h2 class="text-2xl font-extrabold sm:text-3xl">Siap jadi Quiz Master?</h2>
        <p class="mx-auto mt-3 max-w-md text-white/80">Daftar gratis, buat ujian pertamamu, dan lihat siswa berlomba di leaderboard!</p>
        <RouterLink to="/register"><Button variant="fun" size="lg" class="mt-8 rounded-2xl">Gas Daftar! <ArrowRight class="size-4" /></Button></RouterLink>
      </div>
    </section>

    <footer class="border-t border-border px-4 py-10 text-center">
      <Logo size="sm" class="mx-auto mb-4 justify-center" />
      <div class="flex flex-wrap justify-center gap-4 text-sm font-semibold text-muted-foreground mb-4">
        <RouterLink to="/login" class="hover:text-primary">Masuk</RouterLink>
        <RouterLink to="/register" class="hover:text-primary">Daftar</RouterLink>
        <a href="#fitur" class="hover:text-primary">Fitur</a>
        <a href="#faq" class="hover:text-primary">FAQ</a>
      </div>
      <p class="text-xs text-muted-foreground">QuizMaster &copy; {{ new Date().getFullYear() }} — Kuis online, tapi seru.</p>
    </footer>
  </div>
</template>
