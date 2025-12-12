<script setup lang="ts">
import { TrendingUp, ArrowRight, Play, Sun, Moon } from 'lucide-vue-next'

// Use Cookie for persistence across reloads. Default to true (Dark Mode)
const isDark = useCookie<boolean>('theme', { default: () => true })
const toggleTheme = () => isDark.value = !isDark.value

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div :class="{ dark: isDark }">
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      
      <!-- Navbar -->
      <nav class="sticky top-0 z-50 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div class="flex items-center gap-2 cursor-pointer" @click="scrollToSection('hero')">
            <div class="bg-indigo-600 text-white p-2 rounded-lg">
              <TrendingUp :size="24" />
            </div>
            <span class="text-xl font-bold">NexusModeler</span>
          </div>
          
          <div class="hidden md:flex gap-8">
            <button @click="scrollToSection('features')" class="hover:text-indigo-600">Features</button>
            <button @click="scrollToSection('methodology')" class="hover:text-indigo-600">Methodology</button>
            <button @click="scrollToSection('team')" class="hover:text-indigo-600">Team GRP 4</button>
          </div>

          <div class="flex items-center gap-4">
            <button @click="toggleTheme" class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
              <Sun v-if="isDark" :size="20" />
              <Moon v-else :size="20" />
            </button>
            <NuxtLink to="/dashboard" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all hover:scale-105">
              Start Modeling
            </NuxtLink>
          </div>
        </div>
      </nav>

      <main>
        <!-- Hero Section -->
        <div id="hero" class="max-w-7xl mx-auto px-8 py-24 min-h-[90vh] flex items-center">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="space-y-8 animate-fade-up">
              <Badge color="blue">Interactive Scenario Modeling</Badge>
              <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Visualize the <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-amber-500 to-cyan-500">
                  Food-Energy-Water
                </span> <br />
                Nexus Effect.
              </h1>
              <div class="flex gap-4">
                <NuxtLink to="/dashboard" class="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-xl transition-all hover:-translate-y-1">
                  Start Modeling <ArrowRight :size="18" />
                </NuxtLink>
              </div>
            </div>
            
            <!-- Abstract Visualization -->
             <div class="hidden md:block relative animate-fade-up animate-delay-200">
                <div class="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 dark:opacity-30 blur-3xl animate-pulse"></div>
                <div class="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/50 dark:border-slate-600/50 p-8 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <!-- Mock Dashboard Preview -->
                  <div class="space-y-6">
                    <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
                      <div class="flex gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-400"></div>
                        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div class="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div class="text-xs font-mono text-slate-400">NEXUS-V1.0</div>
                    </div>
                    <!-- ... Visualization bars ... -->
                    <div class="grid grid-cols-3 gap-6 h-64">
                      <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-end justify-center pb-2 relative overflow-hidden group cursor-pointer">
                        <div class="w-12 bg-emerald-500 h-[60%] rounded-t-md group-hover:h-[70%] transition-all duration-500"></div>
                      </div>
                      <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-end justify-center pb-2 relative overflow-hidden group cursor-pointer">
                        <div class="w-12 bg-amber-500 h-[80%] rounded-t-md group-hover:h-[60%] transition-all duration-500"></div>
                      </div>
                      <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl flex items-end justify-center pb-2 relative overflow-hidden group cursor-pointer">
                        <div class="w-12 bg-cyan-500 h-[40%] rounded-t-md group-hover:h-[55%] transition-all duration-500"></div>
                      </div>
                    </div>
                    <div class="flex gap-3 mt-4">
                      <div class="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-500 w-2/3 animate-[pulse_3s_infinite]"></div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <FeaturesSection />
        <MethodologySection />
        <TeamMarquee />
        
        <!-- Footer -->
        <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <!-- ... Footer Content ... -->
             <div class="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-8">
                <div class="col-span-2">
                    <div class="flex items-center gap-2 mb-4 text-white">
                        <TrendingUp :size="24" />
                        <span class="text-xl font-bold">NexusModeler</span>
                    </div>
                    <p class="max-w-sm">Empowering policy makers with data-driven insights for a sustainable future across the Food-Energy-Water nexus.</p>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Platform</h4>
                    <ul class="space-y-2">
                        <li><button @click="scrollToSection('features')" class="hover:text-white transition-colors">Features</button></li>
                        <li><button @click="scrollToSection('methodology')" class="hover:text-white transition-colors">Methodology</button></li>
                        <li><NuxtLink to="/dashboard" class="hover:text-white transition-colors">Launch App</NuxtLink></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-4">Team</h4>
                    <ul class="space-y-2">
                        <li><button @click="scrollToSection('team')" class="hover:text-white transition-colors">About GRP 4</button></li>
                        <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">GitHub Repo</a></li>
                    </ul>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
                &copy; 2024 Group 4 Nexus Project. All rights reserved.
            </div>
        </footer>
      </main>
    </div>
  </div>
</template>
