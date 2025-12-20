<script setup lang="ts">
const props = defineProps<{
  color?: 'blue' | 'green' | 'amber' | 'slate' | 'purple'
}>()

const colors = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
}
</script>

<template>
  <span :class="['px-2 py-1 rounded-full text-xs font-semibold', colors[color || 'blue']]">
    <slot />
  </span>
</template>
