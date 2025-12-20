<script setup lang="ts">
import { computed } from 'vue'
import { Leaf, Zap, Droplet } from 'lucide-vue-next'

const props = defineProps<{
  data: {
    food: number
    energy: number
    water: number
  }
  type?: 'bar' | 'radar' // Support switching visualization types
}>()

const metrics = computed(() => [
  { label: 'Food Security', value: props.data.food, color: '#10b981', icon: Leaf },
  { label: 'Energy Security', value: props.data.energy, color: '#f59e0b', icon: Zap },
  { label: 'Water Stress', value: props.data.water, color: '#06b6d4', icon: Droplet },
])

// --- Radar Chart Logic ---
const radarConfig = {
  center: 100,
  radius: 80,
  sides: 3
}

// Calculate the points for the 3 axes (Food, Energy, Water)
const radarPoints = computed(() => {
  return metrics.value.map((m, i) => {
    const angle = (Math.PI * 2 * i) / 3 - (Math.PI / 2) // Start at -90deg (Top)
    const normalizedVal = Math.max(0, Math.min(100, m.value))
    const dist = (normalizedVal / 100) * radarConfig.radius
    return {
      x: radarConfig.center + dist * Math.cos(angle),
      y: radarConfig.center + dist * Math.sin(angle),
      val: normalizedVal
    }
  })
})

// Generate SVG path for the data polygon
const polygonPath = computed(() => {
  return radarPoints.value.map(p => `${p.x},${p.y}`).join(' ')
})

// Generate axes lines
const axesLines = computed(() => {
  return metrics.value.map((_, i) => {
    const angle = (Math.PI * 2 * i) / 3 - (Math.PI / 2)
    return {
      x2: radarConfig.center + radarConfig.radius * Math.cos(angle),
      y2: radarConfig.center + radarConfig.radius * Math.sin(angle)
    }
  })
})
</script>

<template>
  <div class="flex flex-col w-full h-full min-h-[240px]">
    
    <!-- BAR CHART VIEW -->
    <template v-if="type !== 'radar'">
      <!-- Plot Area -->
      <div class="relative flex items-end justify-around h-40 md:h-48 gap-2 md:gap-4 px-2 md:px-4 border-b border-slate-100 dark:border-slate-700">
        <!-- Grid Lines -->
        <div class="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none z-0">
          <div v-for="i in 5" :key="i" class="w-full h-px bg-slate-50 dark:bg-slate-800/50 border-t border-dashed border-slate-200 dark:border-slate-700"></div>
        </div>

        <!-- Bars -->
        <div v-for="(metric, idx) in metrics" :key="idx" class="relative z-10 w-full h-full flex items-end justify-center group">
          <!-- Uncertainty Band -->
          <div 
            class="absolute w-10 md:w-12 rounded-t-lg opacity-20 transition-all duration-500 ease-out"
            :style="{ height: `${Math.min(100, metric.value + 15)}%`, backgroundColor: metric.color }"
          ></div>
          
          <!-- Main Bar -->
          <div 
            class="w-6 md:w-8 rounded-t-md shadow-lg transition-all duration-500 ease-out relative hover:brightness-110 cursor-pointer"
            :style="{ height: `${metric.value}%`, backgroundColor: metric.color }"
          >
            <!-- Tooltip -->
            <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
              {{ metric.value.toFixed(1) }}
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 dark:bg-slate-700 rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Labels -->
      <div class="flex justify-around px-2 md:px-4 pt-4">
        <div v-for="(metric, idx) in metrics" :key="idx" class="flex flex-col items-center w-full">
          <div class="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-400">
            <component :is="metric.icon" :size="14" :style="{ color: metric.color }" />
            <span class="hidden sm:inline">{{ metric.label }}</span>
            <span class="sm:hidden">{{ metric.label.split(' ')[0] }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- RADAR CHART VIEW -->
    <template v-else>
      <div class="flex-1 flex items-center justify-center py-4">
        <svg viewBox="0 0 200 200" class="w-full h-48 md:h-56 overflow-visible">
          <!-- Grid Circles (Concentric) -->
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-opacity="0.1" class="text-slate-400" />
          <circle cx="100" cy="100" r="53" fill="none" stroke="currentColor" stroke-opacity="0.1" class="text-slate-400" stroke-dasharray="4 2" />
          <circle cx="100" cy="100" r="26" fill="none" stroke="currentColor" stroke-opacity="0.1" class="text-slate-400" stroke-dasharray="4 2" />

          <!-- Axes -->
          <line v-for="(axis, i) in axesLines" :key="`axis-${i}`" 
                x1="100" y1="100" :x2="axis.x2" :y2="axis.y2" 
                stroke="currentColor" stroke-opacity="0.2" class="text-slate-400" />

          <!-- Data Polygon -->
          <polygon :points="polygonPath" 
                   class="fill-indigo-500/20 stroke-indigo-500 dark:stroke-indigo-400 dark:fill-indigo-400/20 transition-all duration-500 ease-out" 
                   stroke-width="2" />

          <!-- Data Points & Labels -->
          <g v-for="(p, i) in radarPoints" :key="`pt-${i}`" class="group">
            <!-- Point -->
            <circle :cx="p.x" :cy="p.y" r="4" :fill="metrics[i].color" class="shadow-sm transition-all duration-500 ease-out" />
            
            <!-- Value Label (Shows on Hover) -->
            <text :x="p.x" :y="p.y - 10" 
                  text-anchor="middle" 
                  class="text-[10px] fill-slate-700 dark:fill-slate-200 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
              {{ p.val.toFixed(0) }}
            </text>

            <!-- Axis Label -->
            <foreignObject :x="p.x < 100 ? p.x - 60 : p.x + 10" 
                           :y="p.y < 100 ? p.y - 25 : p.y" 
                           width="60" height="30">
               <div :class="['flex items-center gap-1 text-[10px] font-bold', p.x < 100 ? 'justify-end' : 'justify-start']" :style="{ color: metrics[i].color }">
                 <component :is="metrics[i].icon" :size="10" />
                 <span>{{ metrics[i].label.split(' ')[0] }}</span>
               </div>
            </foreignObject>
          </g>
        </svg>
      </div>
    </template>

  </div>
</template>