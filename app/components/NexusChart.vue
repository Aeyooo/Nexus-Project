<script setup lang="ts">
import { computed } from 'vue'
import { Leaf, Zap, Droplet } from 'lucide-vue-next'

const props = defineProps<{
  data: {
    food: number
    energy: number
    water: number
  }
}>()

const metrics = computed(() => [
  { label: 'Food Security', value: props.data.food, color: '#10b981', icon: Leaf },
  { label: 'Energy Security', value: props.data.energy, color: '#f59e0b', icon: Zap },
  { label: 'Water Stress', value: props.data.water, color: '#06b6d4', icon: Droplet },
])
</script>

<template>
  <div class="flex flex-col w-full">
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
  </div>
</template>
