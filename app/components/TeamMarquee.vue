<script setup lang="ts">
import { Card } from '#components' // auto-imported in Nuxt

const teamMembers = [
  { name: "Oladipupo Olatunji", role: "Backend Developer", desc: "Model orchestration & caching (Flask/FastAPI).", color: "from-emerald-400 to-cyan-500", text: "text-emerald-600" },
  { name: "Dosunmu Ayomide", role: "Frontend Developer", desc: "Scenario composer & explorable explanations.", color: "from-indigo-400 to-purple-500", text: "text-indigo-600" },
  { name: "Eze Joseph Uzochukwu", role: "UI/UX", desc: "Scenario Model Designer", color: "from-emerald-400 to-cyan-500", text: "text-emerald-600" },
  { name: "Ayeni Adeola Opeyemi", role: "Data Scientist", desc: "System-dynamics & regression models.", color: "from-amber-400 to-orange-500", text: "text-amber-600" },
  { name: "Olawole Daniel Solomon", role: "Backend Developer", desc: "Model orchestration & caching (Flask/FastAPI).", color: "from-emerald-400 to-cyan-500", text: "text-emerald-600" },
  { name: "Ojo Daniel Ayotomiwa", role: "Project Manager", desc: "Model assumptions & integration tests.", color: "from-pink-400 to-rose-500", text: "text-pink-600" },
]
</script>

<template>
  <div id="team" class="py-24 scroll-mt-20 overflow-hidden">
    <div class="text-center mb-16 px-4">
      <Badge color="green">Team GRP 4</Badge>
      <h2 class="text-3xl md:text-4xl font-bold mt-4 mb-4 text-slate-900 dark:text-white">Meet the Builders</h2>
    </div>

    <div class="relative w-full">
      <!-- Gradient Masks -->
      <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

      <!-- Marquee Container -->
      <div class="animate-marquee pl-4 flex w-max">
        <!-- Duplicate list for seamless loop -->
        <div v-for="(member, idx) in [...teamMembers, ...teamMembers]" :key="idx" class="px-4 w-[320px]">
          <Card class="p-8 text-center h-full hover:scale-105 transition-transform duration-300 border-2 hover:border-indigo-100 dark:hover:border-indigo-900 cursor-pointer">
            <div :class="['w-24 h-24 bg-gradient-to-br rounded-full mx-auto mb-6 border-4 border-white dark:border-slate-700 shadow-md', member.color]"></div>
            <h3 class="font-bold text-xl text-slate-800 dark:text-white mb-1">{{ member.name }}</h3>
            <div :class="['text-xs font-bold uppercase tracking-widest mb-4', member.text]">{{ member.role }}</div>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{{ member.desc }}</p>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: scroll 40s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
