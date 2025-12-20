<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: number
  color?: 'emerald' | 'amber' | 'cyan'
}>()

const colors = {
  emerald: { 
    bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
    border: 'border-emerald-100 dark:border-emerald-800/30', 
    text: 'text-emerald-600 dark:text-emerald-400', 
    value: 'text-emerald-800 dark:text-emerald-300' 
  },
  amber: { 
    bg: 'bg-amber-50 dark:bg-amber-900/20', 
    border: 'border-amber-100 dark:border-amber-800/30', 
    text: 'text-amber-600 dark:text-amber-400', 
    value: 'text-amber-800 dark:text-amber-300' 
  },
  cyan: { 
    bg: 'bg-cyan-50 dark:bg-cyan-900/20', 
    border: 'border-cyan-100 dark:border-cyan-800/30', 
    text: 'text-cyan-600 dark:text-cyan-400', 
    value: 'text-cyan-800 dark:text-cyan-300' 
  }
}

const theme = computed(() => colors[props.color || 'emerald'])
</script>

<template>
  <div :class="[theme.bg, theme.border, 'p-3 rounded-lg border']">
    <div :class="[theme.text, 'text-xs font-semibold mb-1']">{{ label }}</div>
    <div :class="[theme.value, 'text-xl font-bold']">{{ value.toFixed(0) }}</div>
  </div>
</template>