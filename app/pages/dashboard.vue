<script setup lang="ts">
import { TrendingUp, LayoutDashboard, GitCompare, Leaf, Zap, Droplet, AlertTriangle, Sun, Moon } from 'lucide-vue-next'

// State: Use Cookie for persistence. Default to true (Dark Mode)
const activeTab = ref('single')
const isDark = useCookie<boolean>('theme', { default: () => true }) 

const toggleTheme = () => isDark.value = !isDark.value

// Scenario A Inputs
const inputsA = ref({ crops: 50, renewables: 30, waterEff: 40 })
// Scenario B Inputs
const inputsB = ref({ crops: 75, renewables: 60, waterEff: 20 })

// Fetch Data (Reactive)
// We now pass a unique ID ('scenario-a', 'scenario-b') to ensure they don't overwrite each other
const { fetchProjections } = useNexusModel()
const { data: outputsA } = await fetchProjections('scenario-a', inputsA)
const { data: outputsB } = await fetchProjections('scenario-b', inputsB)

</script>

<template>
  <div :class="{ dark: isDark }" class="h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    
    <!-- App Header -->
    <header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
      <!-- ... Header content ... -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="flex items-center gap-2 group">
           <div class="bg-indigo-600 text-white p-1.5 rounded shadow-sm">
              <TrendingUp :size="18" />
            </div>
            <span class="font-bold">NexusModeler</span>
        </NuxtLink>
        <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <!-- Tab Switcher -->
        <nav class="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
           <button @click="activeTab = 'single'" :class="['px-3 py-1.5 text-xs font-semibold rounded-md flex gap-2 transition-all', activeTab === 'single' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500']">
             <LayoutDashboard :size="14" /> Single
           </button>
           <button @click="activeTab = 'compare'" :class="['px-3 py-1.5 text-xs font-semibold rounded-md flex gap-2 transition-all', activeTab === 'compare' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500']">
             <GitCompare :size="14" /> Compare
           </button>
        </nav>
      </div>

      <!-- Add Toggle Button -->
      <div class="flex items-center gap-3">
          <button @click="toggleTheme" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Sun v-if="isDark" :size="20" class="text-slate-500 dark:text-slate-400" />
            <Moon v-else :size="20" class="text-slate-500 dark:text-slate-400" />
          </button>
          <!-- ... existing buttons ... -->
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar Controls -->
      <aside class="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 overflow-y-auto">
        <h2 class="text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
          <span class="w-1.5 h-4 bg-indigo-500 rounded-full"></span> Policy Levers
        </h2>
        
        <!-- Inputs A -->
        <div class="space-y-2">
           <div class="bg-indigo-50 dark:bg-slate-800 p-2 rounded-lg text-center text-xs font-bold text-indigo-700 dark:text-indigo-400">SCENARIO A</div>
           <SliderControl label="Crop Intensity" :icon="Leaf" v-model="inputsA.crops" colorClass="text-emerald-500" />
           <SliderControl label="Renewables %" :icon="Zap" v-model="inputsA.renewables" colorClass="text-amber-500" />
           <SliderControl label="Water Eff." :icon="Droplet" v-model="inputsA.waterEff" colorClass="text-cyan-500" />
        </div>

        <!-- Inputs B (Conditional) -->
        <div v-if="activeTab === 'compare'" class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-2 animate-fade-up">
           <div class="bg-purple-50 dark:bg-slate-800 p-2 rounded-lg text-center text-xs font-bold text-purple-700 dark:text-purple-400">SCENARIO B</div>
           <SliderControl label="Crop Intensity" :icon="Leaf" v-model="inputsB.crops" colorClass="text-emerald-500" />
           <SliderControl label="Renewables %" :icon="Zap" v-model="inputsB.renewables" colorClass="text-amber-500" />
           <SliderControl label="Water Eff." :icon="Droplet" v-model="inputsB.waterEff" colorClass="text-cyan-500" />
        </div>
      </aside>

      <!-- Main Viz Area -->
      <main class="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <div :class="['grid gap-6', activeTab === 'compare' ? 'grid-cols-2' : 'grid-cols-1']">
          
          <!-- Card A -->
          <Card class="p-6 animate-fade-up">
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-semibold text-slate-800 dark:text-slate-100">Scenario A Outcomes</h3>
                <Badge color="blue">Primary</Badge>
            </div>
            
            <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 mb-6">
               <NexusChart v-if="outputsA" :data="outputsA" />
            </div>
            
            <!-- Stat Cards A -->
            <div class="grid grid-cols-3 gap-4">
                <StatCard label="Food Index" :value="outputsA.food" color="emerald" />
                <StatCard label="Energy Index" :value="outputsA.energy" color="amber" />
                <StatCard label="Water Index" :value="outputsA.water" color="cyan" />
            </div>

            <!-- Trade-off Analysis -->
            <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <AlertTriangle :size="14" class="text-slate-400"/> Trade-off Analysis
                </h4>
                <div class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <div v-if="outputsA.water < 40" class="flex gap-2 items-start text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                      <AlertTriangle :size="14" class="mt-0.5 shrink-0" /> 
                      Warning: Water stress is critically high due to low efficiency.
                  </div>
                  <div v-if="outputsA.food > 80" class="flex gap-2 items-start text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded">
                      <Leaf :size="14" class="mt-0.5 shrink-0" /> 
                      Food security goals met.
                  </div>
                  <p class="text-slate-500 dark:text-slate-500">Increasing crop intensity by 10% will degrade water levels by roughly 5% unless efficiency is improved.</p>
                </div>
            </div>
          </Card>

          <!-- Card B -->
          <Card v-if="activeTab === 'compare'" class="p-6 border-indigo-200 dark:border-indigo-800 relative overflow-hidden animate-fade-up animate-delay-100">
             <div class="absolute top-0 right-0 w-24 h-24 bg-purple-100 dark:bg-purple-900/20 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
             
             <div class="flex justify-between items-center mb-6">
                <h3 class="font-semibold text-slate-800 dark:text-slate-100">Scenario B Outcomes</h3>
                <Badge color="amber">Experimental</Badge>
             </div>

             <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 mb-6">
               <NexusChart v-if="outputsB" :data="outputsB" />
            </div>
             
             <!-- Stat Cards B (Comparison Logic) -->
             <div class="grid grid-cols-3 gap-4">
                <!-- Food Comparison -->
                <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div class="flex justify-between items-end">
                        <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Food</div>
                        <div :class="['text-xs font-bold', outputsB.food > outputsA.food ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400']">
                           {{ outputsB.food > outputsA.food ? '+' : '' }}{{ (outputsB.food - outputsA.food).toFixed(0) }}
                        </div>
                    </div>
                    <div class="text-xl font-bold text-slate-800 dark:text-slate-100">{{ outputsB.food.toFixed(0) }}</div>
                </div>
                <!-- Energy Comparison -->
                <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div class="flex justify-between items-end">
                        <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Energy</div>
                        <div :class="['text-xs font-bold', outputsB.energy > outputsA.energy ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400']">
                           {{ outputsB.energy > outputsA.energy ? '+' : '' }}{{ (outputsB.energy - outputsA.energy).toFixed(0) }}
                        </div>
                    </div>
                    <div class="text-xl font-bold text-slate-800 dark:text-slate-100">{{ outputsB.energy.toFixed(0) }}</div>
                </div>
                <!-- Water Comparison -->
                <div class="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div class="flex justify-between items-end">
                        <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Water</div>
                        <div :class="['text-xs font-bold', outputsB.water > outputsA.water ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400']">
                           {{ outputsB.water > outputsA.water ? '+' : '' }}{{ (outputsB.water - outputsA.water).toFixed(0) }}
                        </div>
                    </div>
                    <div class="text-xl font-bold text-slate-800 dark:text-slate-100">{{ outputsB.water.toFixed(0) }}</div>
                </div>
             </div>

             <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 bg-indigo-50/50 dark:bg-indigo-900/10 -mx-6 -mb-6 p-6">
                <h4 class="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">"What Changed?"</h4>
                <p class="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  Scenario B offers <strong>{{ (outputsB.food - outputsA.food).toFixed(1) }}% better food security</strong> but consumes <strong>{{ Math.abs(outputsB.energy - outputsA.energy).toFixed(1) }}% more energy</strong>. 
                  Water stress {{ outputsB.water < outputsA.water ? 'worsened' : 'improved' }} by {{ Math.abs(outputsB.water - outputsA.water).toFixed(1) }} points.
                </p>
             </div>
          </Card>

        </div>
      </main>
    </div>
  </div>
</template>