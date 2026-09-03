<script setup lang="ts">
import GlassIcon from '@/components/brand/GlassIcon.vue'
import Logo from '@/components/brand/Logo.vue'
</script>

<template>
  <div class="relative min-h-screen qm-mesh-bg flex flex-col">
    <header class="px-4 py-8 text-center">
      <Logo size="lg" class="justify-center" />
      <p class="mt-3 text-sm font-semibold text-muted-foreground">Masuk & mulai petualangan kuis kamu 🎯</p>
    </header>

    <main class="flex-1 mx-auto flex w-full max-w-md items-start px-4 pb-10">
      <div class="w-full space-y-5">
        <div class="flex justify-center gap-4">
          <GlassIcon name="brain" tone="violet" :size="48" />
          <GlassIcon name="sparkles" tone="sun" :size="48" />
          <GlassIcon name="trophy" tone="coral" :size="48" />
        </div>
        <slot />
        <div class="qm-card p-4 text-center">
          <p class="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Demo Account</p>
          <p class="text-xs text-muted-foreground"><span class="font-bold text-foreground">Admin:</span> admin@quizmaster.com / admin123</p>
          <p class="text-xs text-muted-foreground mt-1"><span class="font-bold text-foreground">Siswa:</span> student@quizmaster.com / student123</p>
        </div>
      </div>
    </main>
  </div>
</template>
