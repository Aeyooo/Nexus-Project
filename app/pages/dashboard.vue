<script setup lang="ts">
import { TrendingUp, LayoutDashboard, GitCompare, Leaf, Zap, Droplet, AlertTriangle, Sun, Moon, ArrowRight } from 'lucide-vue-next'

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

// --- Dynamic Analysis Logic ---

const analysisMessages = computed(() => {
  const msgs = []
  const inp = inputsA.value
  const out = outputsA.value

  // 1. Water Stress Logic (High = Bad)
  if (out.water > 75) {
    msgs.push({
      type: 'danger',
      icon: AlertTriangle,
      text: "CRITICAL: Water stress is dangerously high."
    })
    if (inp.waterEff < 40) {
      msgs.push({
        type: 'warning',
        icon: Droplet,
        text: "Low water efficiency is a major contributor. Consider raising efficiency above 50%."
      })
    }
  } else if (out.water > 50) {
    msgs.push({
      type: 'info',
      icon: Droplet,
      text: "Water stress is moderate. Monitor closely if crop intensity increases."
    })
  }

  // 2. Food Security Logic (Low = Bad)
  if (out.food < 45) {
    msgs.push({
      type: 'warning',
      icon: Leaf,
      text: "Food security is insufficient. Increase crop intensity to meet demand."
    })
  } else if (out.food > 80) {
    msgs.push({
      type: 'success',
      icon: Leaf,
      text: "Food security targets are comfortably met."
    })
  }

  // 3. Energy Logic
  if (inp.renewables > 70 && out.energy < 60) {
    msgs.push({
      type: 'info',
      icon: Zap,
      text: "High renewables usually improve security, but grid stability might be affecting the score."
    })
  }

  return msgs
})

const comparisonSummary = computed(() => {
  const foodDiff = outputsB.value.food - outputsA.value.food
  const energyDiff = outputsB.value.energy - outputsA.value.energy
  const waterDiff = outputsB.value.water - outputsA.value.water // Positive = More Stress (Bad)

  let summary = `Scenario B results in a `
  
  if (foodDiff > 5) summary += `significant boost to food security (+${foodDiff.toFixed(0)}) `
  else if (foodDiff < -5) summary += `drop in food security (${foodDiff.toFixed(0)}) `
  else summary += `similar food security profile `

  summary += `while `

  if (waterDiff > 5) summary += `increasing water stress levels (+${waterDiff.toFixed(0)}). `
  else if (waterDiff < -5) summary += `alleviating water stress (${waterDiff.toFixed(0)}). `
  else summary += `maintaining stable water levels. `

  return summary
})

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
            <span class="font-bold text-slate-900 dark:text-white">NexusModeler</span>
        </NuxtLink>
        <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <!-- Tab Switcher -->
        <nav class="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
           <button @click="activeTab = 'single'" :class="['px-3 py-1.5 text-xs font-semibold rounded-md flex gap-2 transition-all', activeTab === 'single' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200']">
             <LayoutDashboard :size="14" /> Single
           </button>
           <button @click="activeTab = 'compare'" :class="['px-3 py-1.5 text-xs font-semibold rounded-md flex gap-2 transition-all', activeTab === 'compare' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200']">
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
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar Controls -->
      <aside class="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 overflow-y-auto">
        <h2 class="text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
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
                <StatCard label="Water Stress" :value="outputsA.water" color="cyan" />
            </div>

            <!-- Dynamic Trade-off Analysis -->
            <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <AlertTriangle :size="14" class="text-slate-400"/> Trade-off Analysis
                </h4>
                
                <div class="space-y-2 text-sm">
                  <div v-for="(msg, idx) in analysisMessages" :key="idx" 
                    :class="[
                      'flex gap-2 items-start p-2 rounded',
                      msg.type === 'danger' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                      msg.type === 'warning' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' :
                      msg.type === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' :
                      'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    ]"
                  >
                      <component :is="msg.icon" :size="14" class="mt-0.5 shrink-0" />
                      {{ msg.text }}
                  </div>
                  
                  <p v-if="analysisMessages.length === 0" class="text-slate-500 dark:text-slate-400">
                    System is balanced. Adjust policy levers to see potential impacts.
                  </p>
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
                  {{ comparisonSummary }}
                </p>
             </div>
          </Card>

        </div>
      </main>
    </div>
  </div>
</template>