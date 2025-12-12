<script setup lang="ts">
import { computed } from 'vue'
import { type Component } from 'vue'

const props = defineProps<{
  label: string
  icon: Component
  modelValue: number
  colorClass: string // e.g., "text-emerald-500"
  min?: number
  max?: number
}>()

const emit = defineEmits(['update:modelValue'])

// Extract color name (emerald, amber, cyan) to determine gradient
const colorName = computed(() => props.colorClass.split('-')[1] || 'indigo')

// Calculate percentage for the gradient background fill
const percentage = computed(() => {
  const min = props.min || 0
  const max = props.max || 100
  return ((props.modelValue - min) / (max - min)) * 100
})

// Dynamic style for the slider track fill
const trackStyle = computed(() => {
  return {
    backgroundSize: `${percentage.value}% 100%`
  }
})
</script>

<template>
  <div class="mb-6 group">
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
        <component :is="icon" :size="16" :class="colorClass" />
        {{ label }}
      </div>
      <span class="text-slate-500 dark:text-slate-400 text-sm font-mono bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
        {{ modelValue }}%
      </span>
    </div>
    
    <div class="relative w-full h-6 flex items-center">
      <input
        type="range"
        :min="min || 0"
        :max="max || 100"
        :value="modelValue"
        @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
        :style="trackStyle"
        :class="[
          'w-full h-2 rounded-lg appearance-none cursor-pointer transition-all',
          'bg-slate-200 dark:bg-slate-700', // Unfilled track color
          'bg-gradient-to-r bg-no-repeat', // Gradient base
          // Set the text color to the prop color so the thumb border matches (via currentColor in CSS)
          colorClass,
          // Dynamic gradient colors for the filled part
          colorName === 'emerald' ? 'from-emerald-300 to-emerald-500' : '',
          colorName === 'amber' ? 'from-amber-300 to-amber-500' : '',
          colorName === 'cyan' ? 'from-cyan-300 to-cyan-500' : '',
          // Fallback
          !['emerald', 'amber', 'cyan'].includes(colorName) ? 'from-indigo-300 to-indigo-500' : ''
        ]"
      />
    </div>

    <div class="flex justify-between text-xs text-slate-400 dark:text-slate-500 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <span>Low Impact</span>
      <span>High Impact</span>
    </div>
  </div>
</template>
