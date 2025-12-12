<script setup lang="ts">
import { Sliders, BarChart3, GitCompare } from 'lucide-vue-next'
</script>

<template>
  <div id="features" class="py-24 scroll-mt-20 border-t border-slate-200 dark:border-slate-800">
    <div class="text-center max-w-2xl mx-auto mb-16 px-4">
      <Badge color="purple">Features</Badge>
      <h2 class="text-3xl md:text-4xl font-bold mt-4 mb-4 text-slate-900 dark:text-white">Built for Complex Decision Making</h2>
      <p class="text-slate-600 dark:text-slate-400 text-lg">
        Our platform simplifies the complex interactions between critical sectors, allowing stakeholders to visualize impacts instantly.
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-8">
      <Card class="p-8 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
        <div class="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
          <Sliders :size="28" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Scenario Composer</h3>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          Interactive sliders allow you to adjust policy levers like crop intensity, renewable adoption, and water efficiency in real-time.
        </p>
      </Card>

      <Card class="p-8 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
        <div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
          <BarChart3 :size="28" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Visual Impact Projections</h3>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          Dynamic SVG charts with uncertainty bands visualize the trade-offs across the Food-Energy-Water nexus instantly.
        </p>
      </Card>

      <Card class="p-8 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
        <div class="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
          <GitCompare :size="28" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Scenario Comparator</h3>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
          Split-screen view to compare baseline vs. proposed scenarios side-by-side with automated "What Changed?" summaries.
        </p>
      </Card>
    </div>
  </div>
</template>