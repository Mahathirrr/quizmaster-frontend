<script setup lang="ts">
import Logo from '@/components/brand/Logo.vue'
</script>

<template>
  <div class="relative min-h-screen qm-mesh-bg flex flex-col justify-between selection:bg-primary/20">
    <!-- Header -->
    <header class="px-4 pt-8 pb-4 text-center">
      <Logo size="lg" class="justify-center" />
      <p class="mt-2 text-sm font-bold text-muted-foreground">Platform Kuis & Ujian Digital Indonesia 🎯</p>
    </header>

    <!-- Main Container -->
    <main class="flex-1 mx-auto flex w-full max-w-md items-center px-4 py-6">
      <div class="w-full space-y-4">
        <!-- Cute Mascot Greeting Badge -->
        <div class="flex items-center justify-center gap-3">
          <img
            src="/assets/mascot.png"
            alt="QuizMaster Mascot"
            class="size-16 object-contain drop-shadow-md qm-bounce"
          />
          <div class="relative rounded-2xl border border-primary/20 bg-card px-3.5 py-2 text-xs font-bold text-foreground shadow-xs">
            <span class="text-primary font-black">Hootie:</span> "Yuk masuk, kuis seru menanti!"
            <div class="absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rotate-45 border-b border-l border-primary/20 bg-card" />
          </div>
        </div>

        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="px-4 py-6 text-center text-xs font-semibold text-muted-foreground">
      QuizMaster &copy; {{ new Date().getFullYear() }} · Belajar Jadi Menyenangkan
    </footer>
  </div>
</template>
